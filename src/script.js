function openSidebar() {
  document.getElementById("mySidebar").style.width = "25%";
}

function closeSidebar() {
  document.getElementById("mySidebar").style.width = "0px";
}

function adjustExpectations() {
  document.getElementById("column-content").style.display = "none";
  document.getElementById("chart-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "flex";
  showQuestion();
  updateNavigationButtons();
  updateProgressBar();
}

function returnToDashboard() {
  document.getElementById("column-content").style.display = "block";
  document.getElementById("chart-container").style.display = "block";
  document.getElementById("quiz-container").style.display = "none";
}

const questions = [
  {
      question: "When do you think the average price of electric and gas vehicles will be the same?",
      options: ["2025", "2030", "2035", "2040"],
      correct: "2035",
      frequency: [.07, .19, .32, .42],
      feedback: "The plurality of consumers surveyed think the prices will converge in 2040. This perception is based on donec urna est, semper quis, auctor eget, ultrices in, purus. Etiam rutrum. Aliquam blandit dui a libero. Praesent tortor tortor, bibendum vehicula, accumsan sed, adipiscing a, pede. <br>Our indicators point to 2035 as the likelier intersection. Nullam et tortor. Suspendisse tempor leo quis nunc fringilla volutpat. Donec rutrum ullamcorper lorem. Nunc tincidunt sagittis augue. Quisque lacinia. Phasellus sollicitudin."
  },
  {
      question: "What do you expect the range of a typical EV will do?",
      options: ["Remain around 300 miles", "Increase to 600 miles by 2030", "Increase to 1000 miles by 2030"],
      correct: "Increase to 600 miles by 2030",
      frequency: [.28, .32, .42],
      feedback: "The plurality of consumers surveyed think the prices will converge in 2040."
  },
  {
      question: "When do you think electric vehicle charging networks will be abundant across the country?",
      options: ["As is (Limited)", "By 2035", "By 2050"],
      correct: "As is (Limited)",
      frequency: [.28, .32, .42],
      feedback: "The plurality of consumers surveyed think the prices will converge in 2040."
  },
  {
      question: "Do you think gas prices will double in the future?",
      options: ["No", "Yes, between 2025 and 2030", "Yes, between 2030 and 2035", "Yes, between 2035 and 2040"],
      correct: "No",
      frequency: [.07, .19, .32, .42],
      feedback: "The plurality of consumers surveyed think the prices will converge in 2040."
  },
  {
      question: "Do you think selling new gas vehicles will be banned:",
      options: ["Never", "In 2045", "In 2040", "In 2035"],
      correct: "Never",
      frequency: [.07, .19, .32, .42],
      feedback: "The plurality of consumers surveyed think the prices will converge in 2040."
  }
];

let currentQuestionIndex = 0;
const userAnswers = [];

function showQuestion() {
  const questionContainer = document.getElementById("question-container");
  const feedbackContainer = document.getElementById("feedback-container");

  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <h2>${currentQuestion.question}</h2>
    <div class="answer-buttons">
        ${currentQuestion.options.map((option, index) => `
            <button class="answer-button" onclick="selectAnswer('${option}')">${option}</button>
        `).join('')}
    </div>
  `;

  feedbackContainer.innerHTML = '[You\'ll get some more information once you select an answer.]';
}

function selectAnswer(answer) {
  userAnswers[currentQuestionIndex] = answer;
  showFeedback();
  updateNavigationButtons();
  updateProgressBar();
  updateSelectedAnswer();
  applyGradients();
  addDashedLines();
}

function updateSelectedAnswer() {
  const buttons = document.querySelectorAll('.answer-button');
  const currentQuestion = questions[currentQuestionIndex];

  buttons.forEach(button => {
      button.classList.remove('selected', 'predicted');
      if (userAnswers[currentQuestionIndex] === button.textContent) {
          button.classList.add('selected');
      }
      if (currentQuestion.correct === button.textContent) {
          button.classList.add('predicted');
      }
  });
}

function showFeedback() {
  const feedbackContainer = document.getElementById("feedback-container");
  const currentQuestion = questions[currentQuestionIndex];
  feedbackContainer.innerHTML = currentQuestion.feedback;
}

function updateNavigationButtons() {
  document.getElementById("back-button").disabled = currentQuestionIndex === 0;
  document.getElementById("next-button").disabled = currentQuestionIndex === questions.length - 1 || !userAnswers[currentQuestionIndex];
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
      updateNavigationButtons();
      updateProgressBar();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
      updateNavigationButtons();
      updateProgressBar();
  }
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progressSteps = document.querySelectorAll(".step .circle");
  const progressFill = document.querySelectorAll(".step .inner-circle");
  const filledSteps = userAnswers.length;

  progressBar.style.width = `${(currentQuestionIndex / (questions.length - 1)) * 97}%`;

  progressSteps.forEach((step, index) => {
      if (currentQuestionIndex == index || index <= filledSteps - 1) {
        step.classList.add("current");
      }
      else {
          step.classList.remove("current");
      }
  });
  
  progressFill.forEach((step, index) => {
      if (index <= filledSteps - 1) {
          step.classList.add("filled");
      } else {
          step.classList.remove("filled");
      }
  });
}

function applyGradients() {
  const buttons = document.querySelectorAll('.answer-button');
  buttons.forEach((button, index) => {
    button.style.backgroundImage = calculateGradient(index);
  });
}

function calculateGradient(index) {
  return (
    "linear-gradient(0deg,#b0e9c8,#b0e9c8 " +
    (questions[currentQuestionIndex].frequency[index] * 200 - 0.01).toFixed(2) +
    "%,white " +
    (questions[currentQuestionIndex].frequency[index] * 200).toFixed(0) +
    "%,white)"
  );
}

function addDashedLines() {
  const questionContainer = document.getElementById("question-container");
  let dashedLines = document.querySelector('.dashed-lines');

  if (!dashedLines) {
      dashedLines = document.createElement('div');
      dashedLines.className = 'dashed-lines';
      dashedLines.innerHTML = `
          <div class="dashed-line">
              <span class="dashed-line-label">40%</span>
          </div>
          <div class="dashed-line">
              <span class="dashed-line-label">20%</span>
          </div>
      `;
      questionContainer.insertBefore(dashedLines, questionContainer.querySelector('.answer-buttons'));
  }
}

// Set dimensions and margins for the chart
const margin = { top: 170, right: 80, bottom: 40, left: 160 };
const width = 1200 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const colors = {
  red: "#a43333",
  red_ci: "#dec4bf",
  green: "#559247",
  green_ci: "#c9e0ce",
  accent1: "#603dbd",
  accent1_ci: "#d3d1e9",
  accent2: "#aa3d8b",
  accent2_ci: "#e0c9e2",
  accent3: "#4b779c",
  accent3_ci: "#c6dbe1",
  accent4: "#5d68bb",
  accent4_ci: "#c9d1e5"
};

let single_model = true;

// Set up the x and y scales
const x = d3.scaleTime()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 0]);

// Create the SVG element and append it to the chart container
const svg = d3.select("#chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create tooltip div
const tooltip = d3.select("#chart-container")
  .append("div")
  .attr("class", "tooltip");

// Load and process the data
d3.csv("src/vehicle registration.csv").then(data => {
  // Parse the date and convert the registrations to a number
  const parseDate = d3.timeParse("%Y");
  data.forEach(d => {
    d.date = parseDate(d.date);
    d.registrations = +d.registrations;
    d.low = +d.low;
    d.high = +d.high;
    d.ev_registrations = +d.ev_registrations;
    d.ev_low = +d.ev_low;
    d.ev_high = +d.ev_high;
    d.most_likely = +d.most_likely;
    d.ml_low = +d.ml_low;
    d.ml_high = +d.ml_high;
    d.best_case = +d.best_case;
    d.bc_low = +d.bc_low;
    d.bc_high = +d.bc_high;
    d.worst_case = +d.worst_case;
    d.wc_low = +d.wc_low;
    d.wc_high = +d.wc_high;
    d.model_1 = +d.model_1;
    d.m1_low = +d.m1_low;
    d.m1_high = +d.m1_high;
    d.model_2 = +d.model_2;
    d.m2_low = +d.m2_low;
    d.m2_high = +d.m2_high;
  });

  // Set the domains for the x and y scales
  x.domain(d3.extent(data, d => d.date));
  y.domain([0, 20000000]);

  // Add the x-axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .style("font-size", "14px")
    .call(d3.axisBottom(x)
      .tickValues(x.ticks(d3.timeYear.every(5))) // Display ticks every 5 years
      .tickFormat(d3.timeFormat("%Y"))) // Format the tick labels to show Year
    .call(g => g.select(".domain").remove()) // Remove the x-axis line
    .selectAll(".tick line") // Select all tick lines
    .style("stroke-opacity", 0)
  svg.selectAll(".tick text")
    .attr("fill", "#777");

  // Add vertical gridlines
  svg.selectAll("xGrid")
    .data(x.ticks())
    .join("line")
    .attr("x1", d => x(d))
    .attr("x2", d => x(d))
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "#e0e0e0")
    .attr("stroke-width", .5);

  // Add the y-axis
  svg.append("g")
    .style("font-size", "14px")
    .call(d3.axisLeft(y)
      .ticks(20000000 / 5000000)
      .tickFormat(d => {
        if (isNaN(d)) return "";
        return `${(d / 1000000).toFixed(0)}M`;
      })
      .tickSize(0)
      .tickPadding(10))
    .call(g => g.select(".domain").remove()) // Remove the y-axis line
    .selectAll(".tick text")
    .style("fill", "#777") // Make the font color grayer
    .style("visibility", (d, i, nodes) => {
      if (i === 0) {
        return "hidden"; // Hide the first tick label
      } else {
        return "visible"; // Show the remaining tick labels
      }
    });

  // Add y-axis label
  svg.append("text")
    .attr("y", -50)
    .attr("x", -90)
    .attr("dy", "1em")
    .style("font-size", "14px")
    .style("fill", "#777")
    .style("font-family", "sans-serif")
    .text("Vehicle");
  svg.append("text")
    .attr("y", -50)
    .attr("x", -90)
    .attr("dy", "2.5em")
    .style("font-size", "14px")
    .style("fill", "#777")
    .style("font-family", "sans-serif")
    .text("registrations");

  // Add horizontal gridlines
  svg.selectAll("yGrid")
    .data(y.ticks(20000000 / 5000000))
    .join("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", d => y(d))
    .attr("y2", d => y(d))
    .attr("stroke", "#e0e0e0")
    .attr("stroke-dasharray", "5,5")

  // Function to update the chart based on the value of single_model
  function updateChart() {
    // Clear previous elements
    svg.selectAll(".line").remove();
    svg.selectAll(".ci").remove();

    if (single_model) {
      // Add lines and confidence intervals for single model
      addLineWithConfidenceInterval(svg, data, "registrations", "high", "low", colors.red, colors.red_ci);
      addLineWithConfidenceInterval(svg, data, "ev_registrations", "ev_high", "ev_low", colors.green, colors.green_ci);
      d3.select('.add-comparison').style("display", "block")
      d3.select('.more').style("display", "block")

      // Config for circles and tooltip fields
      const circleConfigs = [
        { radius: 7, color: "#c34339", cy: -45, cxOffset: 52 },
        { radius: 7, color: "#559247", cy: -6, cxOffset: 52 },
      ];

      const tooltipFields = [
        { label: "&emsp;Gas vehicles", value: "registrations" },
        { label: "🡐 &emsp; 🡒 &emsp;&emsp;Electric vehicles", value: "ev_registrations" },
      ];

      // Add draggable elements
      addDraggableElements(data, circleConfigs, tooltipFields);
    } else {
      // Add lines and confidence intervals for multiple models
      addLineWithConfidenceInterval(svg, data, "best_case", "bc_high", "bc_low", colors.green, colors.green_ci);
      addLineWithConfidenceInterval(svg, data, "most_likely", "ml_high", "ml_low", colors.accent3, colors.accent3_ci);
      addLineWithConfidenceInterval(svg, data, "worst_case", "wc_high", "wc_low", colors.accent4, colors.accent4_ci);
      addLineWithConfidenceInterval(svg, data, "model_1", "m1_high", "m1_low", colors.accent1, colors.accent1_ci);
      addLineWithConfidenceInterval(svg, data, "model_2", "m2_high", "m2_low", colors.accent2, colors.accent2_ci);
      d3.select('.add-comparison').style("display", "none")
      d3.select('.more').style("display", "none")

      // Config for circles and tooltip fields
      const circleConfigs = [
        { radius: 7, color: colors.green, cy: -45, cxOffset: 52 },
        { radius: 7, color: colors.accent3, cy: -6, cxOffset: 52 },
        { radius: 7, color: colors.accent4, cy: 33, cxOffset: 52 },
        { radius: 7, color: colors.accent1, cy: 72, cxOffset: 52 },
        { radius: 7, color: colors.accent2, cy: 111, cxOffset: 52 },
      ];

      const tooltipFields = [
        { label: "&emsp;Best Case", value: "best_case" },
        { label: "🡐 &emsp; 🡒 &emsp;&emsp;Most likely", value: "most_likely" },
        { label: "&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Worst case", value: "worst_case" },
        { label: "&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Your model 1", value: "model_1" },
        { label: "&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Your model 2", value: "model_2" },
      ];

      // Add draggable elements
      addDraggableElements(data, circleConfigs, tooltipFields);
    }
    d3.select('.change-model').text(single_model ? '🡘 COMPARE MODELS' : '🡘 SINGLE MODEL')
  }
  
  // Function to add lines and confidence intervals to the chart
  function addLineWithConfidenceInterval(svg, data, yField, yHighField, yLowField, lineColor, ciColor) {
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d[yField]));

    const ci = d3.area()
      .x(d => x(d.date))
      .y0(d => y(d[yHighField]))
      .y1(d => y(d[yLowField]));

    // Show confidence interval
    svg.append("path")
      .datum(data)
      .attr("class", "ci")
      .attr("fill", ciColor)
      .attr("stroke", "none")
      .attr("d", ci);

    // Add the line path in two parts: solid & dashed
    svg.append("path")
      .datum(data.slice(0, 15))
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.append("path")
      .datum(data.slice(14))
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", ("5,5"))
      .attr("d", line);
  }

  d3.select("#chart-container").append('button')
          .text('🛈 MORE PROJECTIONS')
          .attr("class", "more")
          .style("display", "none")
          .style("background", "none")
          .style("border", "none")
          .style("position", "absolute")
          .style("top", "200px")
          .style("left", "790px")
          .style("z-index", "1")
          .on('click', () => { openSidebar() });
    
  // Initial chart update
  updateChart();

  // // Add a circle element
  // const circle1 = svg.append("circle")
  //   .attr("r", 7)
  //   .attr("fill", "#c34339")
  //   .attr("cy", -45)
  //   .attr("cx", 580.7672826830938 + 52)
  //   .style("stroke", "white")
  //   .attr("opacity", .70)
  //   .style("pointer-events", "none");
  
  // // Add a circle element
  // const circle2 = svg.append("circle")
  //   .attr("r", 7)
  //   .attr("fill", "#559247")
  //   .attr("cy", -6)
  //   .attr("cx", 580.7672826830938 + 52)
  //   .style("stroke", "white")
  //   .attr("opacity", .70)
  //   .style("pointer-events", "none");

  // const verticalLine = svg.append("line")
  //   .attr("y1", -50)    // y position of the start of the line
  //   .attr("y2", 390)      // y position of the end of the line
  //   .attr("x1", 580.7672826830938) // x position of the start of the line
  //   .attr("x2", 580.7672826830938) // x position of the end of the line (same as x1 for vertical line)
  //   .attr("stroke", "black") // stroke color
  //   .style("stroke-width", 2) // stroke width
  //   .style("pointer-events", "none");

  // // Button for more info sidebar
  // d3.select('#chart-container').append('button')
  // .text('🛈 MORE PROJECTIONS')
  // .attr("class", "more")
  // .style("background", "none")
  // .style("border", "none")
  // .style("position", "absolute")
  // .style("top", "200px")
  // .style("left", "790px")
  // .style("z-index", "1")
  // .on('click', () => {openSidebar()});

    
  // // create a listening rectangle
  // const listeningRect = svg.append("rect")
  // .attr("width", width)
  // .attr("height", height);
    
  // // Define the drag behavior
  // var drag = d3.drag()
  // .on("drag", function(event) {
  //   const [xCoord] = d3.pointer(event, this);
  //   const bisectDate = d3.bisector(d => d.date).left;
  //   const x0 = x.invert(xCoord);
  //   const i = bisectDate(data, x0, 1);
  //   const d0 = data[i - 1];
  //   const d1 = data[i];
  //   const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  //   const xPos = x(d.date);
  //   console.log(xPos)
    
  //   // Update the line position
  //   verticalLine.attr("x1", xPos) // x position of the start of the line
  //   .attr("x2", xPos); // x position of the end of the line (same as x1 for vertical line)

  //   // Update the circles position
  //   circle1.attr("cx", xPos + 52)
  //   circle2.attr("cx", xPos + 52)

  //   d3.select(".more").style("left", xPos+210+"px")
    
  //   tooltip
  //     .style("left", `${xPos + 130}px`)
  //     .style("top", `${114}px`)
  //     .html(`&emsp;&emsp;&nbsp;${d.date.getFullYear()}
  //     &emsp;Gas vehicles<br>
  //     &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${d.registrations !== undefined ? (d.registrations ).toLocaleString(0) : 'N/A'}<br>
  //     🡐 &emsp; 🡒 &emsp;&emsp;Electric vehicles<br>
  //     &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${d.registrations !== undefined ? (d.ev_registrations ).toLocaleString(0) : 'N/A'}<br>`
  //   )
  // });

  // // Apply the drag behavior to the listeningRect
  // listeningRect.call(drag);

  // Function to add draggable elements and tooltip
  function addDraggableElements(data, circleConfigs, tooltipFields) {
    // Remove existing elements
    svg.selectAll(".draggable").remove();
    tooltip.style("display", "none");

    const initial_xPos = 552.0164271047228

    const verticalLine = svg.append("line")
      .attr("class", "draggable")
      .attr("y1", -50)
      .attr("y2", height)
      .attr("x1", initial_xPos)
      .attr("x2", initial_xPos)
      .attr("stroke", "black")
      .style("stroke-width", 2)
      .style("pointer-events", "none");

    const circles = circleConfigs.map(config => svg.append("circle")
      .attr("class", "draggable")
      .attr("r", config.radius)
      .attr("fill", config.color)
      .attr("cy", config.cy)
      .attr("cx", initial_xPos + config.cxOffset)
      .style("stroke", "white")
      .attr("opacity", .70)
      .style("pointer-events", "none"));

    const listeningRect = svg.append("rect")
      .attr("class", "draggable")
      .attr("width", width)
      .attr("height", height);

    const drag = d3.drag()
      .on("drag", function(event) {
        console.log(event)
        const [xCoord] = d3.pointer(event, this);
        const bisectDate = d3.bisector(d => d.date).left;
        const x0 = x.invert(xCoord);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        const xPos = x(d.date);
        console.log(d)

        // Update the line position
        verticalLine.attr("x1", xPos).attr("x2", xPos);

        // Update the circles position
        circles.forEach((circle, index) => {
          circle.attr("cx", xPos + circleConfigs[index].cxOffset);
        });

        d3.select(".more").style("left", xPos + 210 + "px");

        tooltip.style("left", `${xPos + 130}px`)
          .style("top", "114px")
          .style("display", "block")
          .html(
            `&emsp;&emsp;&nbsp;${d.date.getFullYear()}` +
            tooltipFields.map(field => (
              `${field.label}: <br>
              &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${d[field.value] !== undefined ? d[field.value].toLocaleString(0) : 'N/A'}<br>`
            )).join('')
          );
      });

    listeningRect.call(drag);
  
    // Initialize tooltip values for year 2033
    d3.select(".more").style("left", initial_xPos + 210 + "px");

    initial_d = {
      "date": "2033-01-01T06:00:00.000Z",
      "registrations": 3450000,
      "low": 3312000,
      "high": 3588000,
      "ev_registrations": 32435,
      "ev_low": 31137,
      "ev_high": 33732,
      "most_likely": 32435,
      "ml_low": 31137,
      "ml_high": 33732,
      "best_case": 92788,
      "bc_low": 90282,
      "bc_high": 95293,
      "worst_case": 46624,
      "wc_low": 45365,
      "wc_high": 47882,
      "model_1": 75968,
      "m1_low": 73916,
      "m1_high": 78019,
      "model_2": 66044,
      "m2_low": 64260,
      "m2_high": 67827
    }

    tooltip.style("left", `${initial_xPos + 130}px`)
      .style("top", "114px")
      .style("display", "block")
      .html(
        `&emsp;&emsp;&nbsp;2033` +
        tooltipFields.map(field => (
          `${field.label}: <br>
          &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${initial_d[field.value] !== undefined ? initial_d[field.value].toLocaleString(0) : 'N/A'}<br>`
        )).join('')
      );
  }

  // Add the chart title
  svg.append("text")
    .attr("class", "chart-title")
    .attr("x", margin.left - 250)
    .attr("y",  - 100)
    .style("margin-bottom", "200px")
    .style("font-size", "24px")
    .style("font-family", "sans-serif")
    .text("ELECTRIC VEHICLE ADOPTION PREDICTION TOOL");

  // Button for downloading data
  d3.select('#chart-container').append('button')
    .text('↧ DOWNLOAD DATA')
    .style("background", "black")
    .style("color", "white")
    .style("border", "1px solid black")
    .style("margin-left", "70px")
    .style("height", "20px")
    .attr("x", 90)
    .on('click', function() {
      const dataStr = JSON.stringify(data); // Replace 'data' with your data array
      const blob = new Blob([dataStr], { type: 'text/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.json');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

  // Button for downloading the image
  d3.select('#chart-container').append('button')
    .text('↝ DOWNLOAD IMAGE')
    .style("background", "white")
    .style("border", "1px solid black")
    .style("margin-left", "30px")
    .style("height", "20px")
    .on('click', function() {
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(svg.node());
      const blob = new Blob([xmlString], { type: 'image/svg+xml;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'chart.svg');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

  // Button for downloading the image
  d3.select('#chart-container').append('button')
    .text(single_model ? '🡘 COMPARE MODELS' : '🡘 SINGLE MODEL')
    .attr("class", "change-model")
    .style("background", "white")
    .style("border", "1px solid black")
    .style("margin-right", "65px")
    .style("float", "right")
    .style("height", "20px")
    .on('click', () => {
      single_model = !single_model;
      updateChart();
    });
  

  // Button for downloading the image
  d3.select('#chart-container').append('button')
    .text('+ ADD TO COMPARISON')
    .attr("class", "add-comparison")
    .style("background", "white")
    .style("border", "1px solid black")
    .style("margin-right", "30px")
    .style("float", "right")
    .style("height", "20px")
    .on('click', () => {
      single_model = !single_model;
      updateChart();
    });
  

  // Event listener for the button
  d3.select("#toggle-button").on("click", () => {
    single_model = !single_model;
    updateChart();
  });
});

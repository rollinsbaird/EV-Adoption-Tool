document.addEventListener("DOMContentLoaded", () => {
  const yearPicker = document.getElementById("year-picker");
  const startYear = 2025;
  const endYear = 2050;
  
  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearPicker.appendChild(option);
  }
});

function openSidebar() {
  document.getElementById("mySidebar").style.width = "24%";
}

function closeSidebar() {
  document.getElementById("mySidebar").style.width = "0px";
}

var infoShowing = true;

function hideInfo() {
  document.getElementById("text-box").style.display = "none";
  document.getElementById("question-circle").style.display = "flex";
  infoShowing = false;
}

function showInfo(event) {
  event.stopPropagation()
  document.getElementById("text-box").style.display = "block";
  document.getElementById("question-circle").style.display = "none";
  infoShowing = true;
}

function adjustExpectations() {
  document.querySelector("main").style.gridColumn = "1 / 6";
  document.getElementById("text-box");
  document.querySelector(".open-expectations").style.display = "none";
  document.getElementById("chart-container").style.display = "none";
  document.getElementById("chart-buttons").style.display = "none";
  document.getElementById("quiz-container").style.display = "flex";
  document.getElementById("text-box").style.display = "none";
  document.getElementById("question-circle").style.display = "flex";
  showQuestion();
  updateNavigationButtons();
  updateProgressBar();
}

function returnToDashboard() {
  document.querySelector("main").style.gridColumn = "1";
  document.getElementById("text-box");
  document.querySelector(".open-expectations").style.display = "flex";
  document.getElementById("chart-container").style.display = "block";
  document.getElementById("chart-buttons").style.display = "flex";
  document.getElementById("quiz-container").style.display = "none";
  if (infoShowing) {
    document.getElementById("text-box").style.display = "block";
    document.getElementById("question-circle").style.display = "none";
  }
}

const questions = [
  {
      question: "When do you think the average price of electric vehicles will equal that of gas vehicles?",
      options: ["By 2025", "By 2030", "By 2035", "By 2040"],
      correct: "By 2035",
      frequency: [.07, .19, .32, .42],
      feedbackColumn1: "The plurality of consumers surveyed think the prices will converge in 2040. This perception is based on donec urna est, semper quis, auctor eget, ultrices in, purus. Etiam rutrum. Aliquam blandit dui a libero. Praesent tortor tortor, bibendum vehicula, accumsan sed, adipiscing a, pede. ",
      feedbackColumn2: "<br>Our indicators point to 2035 as the likelier intersection. Nullam et tortor. Suspendisse tempor leo quis nunc fringilla volutpat. Donec rutrum ullamcorper lorem. Nunc tincidunt sagittis augue. Quisque lacinia. Phasellus sollicitudin."
  },
  {
      question: "How do you think automakers will continue to develop new EV body styles/trims/segments?",
      options: ["They won't", "Slowly", "Rapidly"],
      correct: "Rapidly",
      frequency: [.28, .32, .42],
      feedbackColumn1: "The plurality of consumers surveyed think the prices will converge in 2040. This perception is based on donec urna est, semper quis, auctor eget, ultrices in, purus. Etiam rutrum. Aliquam blandit dui a libero. Praesent tortor tortor, bibendum vehicula, accumsan sed, adipiscing a, pede. ",
      feedbackColumn2: "<br>Our indicators point to 2035 as the likelier intersection. Nullam et tortor. Suspendisse tempor leo quis nunc fringilla volutpat. Donec rutrum ullamcorper lorem. Nunc tincidunt sagittis augue. Quisque lacinia. Phasellus sollicitudin."
  },
  {
      question: "What driving range do you think the average EV will achieve by 2030?",
      options: ["300 miles", "600 miles", "1000 miles"],
      correct: "600 miles",
      frequency: [.28, .32, .42],
      feedbackColumn1: "The plurality of consumers surveyed think the prices will converge in 2040. This perception is based on donec urna est, semper quis, auctor eget, ultrices in, purus. Etiam rutrum. Aliquam blandit dui a libero. Praesent tortor tortor, bibendum vehicula, accumsan sed, adipiscing a, pede. ",
      feedbackColumn2: "<br>Our indicators point to 2035 as the likelier intersection. Nullam et tortor. Suspendisse tempor leo quis nunc fringilla volutpat. Donec rutrum ullamcorper lorem. Nunc tincidunt sagittis augue. Quisque lacinia. Phasellus sollicitudin."
  },
  {
      question: "When do you think EV charging stations will be abundant and accessible as gas stations?",
      options: ["Never", "By 2035", "By 2050"],
      correct: "By 2035",
      frequency: [.28, .32, .42],
      feedbackColumn1: "The plurality of consumers surveyed think the prices will converge in 2040. This perception is based on donec urna est, semper quis, auctor eget, ultrices in, purus. Etiam rutrum. Aliquam blandit dui a libero. Praesent tortor tortor, bibendum vehicula, accumsan sed, adipiscing a, pede. ",
      feedbackColumn2: "<br>Our indicators point to 2035 as the likelier intersection. Nullam et tortor. Suspendisse tempor leo quis nunc fringilla volutpat. Donec rutrum ullamcorper lorem. Nunc tincidunt sagittis augue. Quisque lacinia. Phasellus sollicitudin."
  },
  {
      question: "When do you think the price of gas will reach double its 2023 price?",
      options: ["Never", "By 2030", "By 2035", "By 2040"],
      correct: "By 2035",
      frequency: [.07, .19, .32, .42],
      feedbackColumn1: "The plurality of consumers surveyed think the prices will converge in 2040. This perception is based on donec urna est, semper quis, auctor eget, ultrices in, purus. Etiam rutrum. Aliquam blandit dui a libero. Praesent tortor tortor, bibendum vehicula, accumsan sed, adipiscing a, pede. ",
      feedbackColumn2: "<br>Our indicators point to 2035 as the likelier intersection. Nullam et tortor. Suspendisse tempor leo quis nunc fringilla volutpat. Donec rutrum ullamcorper lorem. Nunc tincidunt sagittis augue. Quisque lacinia. Phasellus sollicitudin."
  },
  {
      question: "Do you think that the sale of new gas vehicles will ever be banned? If so, when?",
      options: ["Never", "By 2035", "By 2040", "By 2045"],
      correct: "By 2045",
      frequency: [.07, .19, .32, .42],
      feedbackColumn1: "The plurality of consumers surveyed think the prices will converge in 2040. This perception is based on donec urna est, semper quis, auctor eget, ultrices in, purus. Etiam rutrum. Aliquam blandit dui a libero. Praesent tortor tortor, bibendum vehicula, accumsan sed, adipiscing a, pede. ",
      feedbackColumn2: "<br>Our indicators point to 2035 as the likelier intersection. Nullam et tortor. Suspendisse tempor leo quis nunc fringilla volutpat. Donec rutrum ullamcorper lorem. Nunc tincidunt sagittis augue. Quisque lacinia. Phasellus sollicitudin."
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
            <button class="answer-button before-answer" onclick="selectAnswer(&quot;${option}&quot;)">${option}</button>
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
      button.classList.remove('selected', 'predicted', 'before-answer');
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
  feedbackContainer.innerHTML = currentQuestion.feedbackColumn1 + currentQuestion.feedbackColumn2;
}

function updateNavigationButtons() {
  document.getElementById("back-button").disabled = currentQuestionIndex === 0;
  document.getElementById("next-button").disabled = !userAnswers[currentQuestionIndex];
  if (currentQuestionIndex === questions.length - 1) {
    document.getElementById("next-button").innerText = "FINISH ✓"
  } else {
    document.getElementById("next-button").innerText = "NEXT 🡒"
  }
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
  const progressLabels = document.querySelectorAll(".step .label");
  const progressFill = document.querySelectorAll(".step .inner-circle");
  const filledSteps = userAnswers.length;

  progressBar.style.width = `${(currentQuestionIndex / (questions.length - 1)) * 98}%`;

  progressSteps.forEach((step, index) => {
      if (currentQuestionIndex == index || index <= filledSteps - 1) {
        step.classList.add("current");
      }
      else {
          step.classList.remove("current");
      }
  });
  
  progressLabels.forEach((step, index) => {
      if (currentQuestionIndex == index && currentQuestionIndex > userAnswers.length - 1) {
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

var chart = document.getElementById("chart-container");
var aspect = chart.clientWidth / chart.clientHeight;
var container = chart.parentElement;

window.addEventListener("resize", function () {
  var targetWidth = container.clientWidth;
  chart.setAttribute("width", targetWidth);
  chart.setAttribute("height", Math.round(targetWidth / aspect));
});

// Set dimensions and margins for the chart
const margin = { top: 140, right: 80, bottom: 6, left: 160 };
const width = 1200 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;
const realWidth = chart.clientWidth - margin.left - margin.right;
const realHeight = chart.clientHeight - margin.top - margin.bottom;

// Trigger the resize event initially
window.dispatchEvent(new Event("resize"));

// Create the SVG element and append it to the chart container
var svg = d3.select("#chart-container")
.append("svg")
  // .attr("width", "1200")
  // .attr("height", "600")
  // .attr("width", width + margin.left + margin.right)
  // .attr("height", height + margin.top + margin.bottom)
  .attr("viewBox", "0 0 1200 650")
  .attr("class", "chart")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);
  
// Set up the x and y scales
const x = d3.scaleTime()
  .range([0, chart.clientWidth - margin.left - margin.right]);

const y = d3.scaleLinear()
  .range([chart.clientHeight - margin.top - margin.bottom - 70, 0]);

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
    .attr("x2", width+30)
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
      d3.select('.add-comparison').style("display", "flex")
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

  // Function to add draggable elements and tooltip
  function addDraggableElements(data, circleConfigs, tooltipFields) {
    // Remove existing elements
    svg.selectAll("#draggable").remove();
    tooltip.style("display", "none");
    
    const initial_xPos = x(new Date("2033-01-01T05:00:00.000Z"))

    const verticalLine = svg.append("line")
      .attr("id", "draggable")
      .attr("y1", -50)
      .attr("y2", height)
      .attr("x1", initial_xPos)
      .attr("x2", initial_xPos)
      .attr("stroke", "black")
      .style("stroke-width", 2)
      .style("pointer-events", "none");

    const circles = circleConfigs.map(config => svg.append("circle")
      .attr("id", "draggable")
      .attr("r", config.radius)
      .attr("fill", config.color)
      .attr("cy", config.cy)
      .attr("cx", initial_xPos + config.cxOffset)
      .style("stroke", "white")
      .attr("opacity", .70)
      .style("pointer-events", "none"));

    const listeningRect = svg.append("rect")
      .attr("id", "draggable")
      .attr("width", width)
      .attr("height", height);

    const drag = d3.drag()
      .on("drag", function(event) {
        const [xCoord] = d3.pointer(event, this);
        const bisectDate = d3.bisector(d => d.date).left;
        const x0 = x.invert(xCoord);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        const xPos = x(d.date);

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

  const svgDownload = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12.9762H4.35V14.8512H15.6V12.9762H16.95V16.3512H3V12.9762Z" fill="#EDECE3"/>
    <path d="M9.88 13L7.03 10.15V8.5H7.18L9.205 10.525H9.28V2.5H10.705V10.525H10.78L12.805 8.5H12.955V10.15L10.105 13H9.88Z" fill="#EDECE3"/>
  </svg>
  `;
  const svgGraph = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.32096 14.8333L8.27237 11.5417L10.0156 12.392L13.4025 8.76942L13.5041 8.87437V12.7768L13.6057 12.8824L15.1299 11.3002V5.71056L14.9267 5.5H9.54115L8.01699 7.18719L8.11856 7.2928H11.9799L12.0815 7.39842L9.65834 9.93929L7.95237 9.18921L4 13.4623L5.32096 14.8333Z" fill="#322B24"/>
  </svg>
  `;
  const svgAdd = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.28809 13.175V10.325H6.66309V8.975H9.28809V6.125H10.7131V8.975H13.3381V10.325H10.7131V13.175H9.28809Z" fill="#322B24"/>
  </svg>
  `;
  const svgCompare = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2737_942)">
    <path d="M6.26665 14.3192L1.42467 9.47727L6.26665 4.6353L7.22545 5.58345L4.0241 8.7848H15.9772L12.7759 5.58345L13.7347 4.6353L18.5767 9.47727L13.7347 14.3192L12.7759 13.3604L15.9772 10.1697H4.0241L7.22545 13.3604L6.26665 14.3192Z" fill="#322B24"/>
    </g>
    <defs>
    <clipPath id="clip0_2737_942">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
  </svg>
  `;
  // Button for downloading data
  d3.select('#left-buttons').append('button')
  .html(`${svgDownload} Download Data`)
  .attr("class", "styled-button dark")
  .style("margin-left", "70px")
  .attr("x", 90)
  .on('click', function() {
    // Convert data to CSV format
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Button for downloading the image
  d3.select('#left-buttons').append('button')
    .html(`${svgGraph} Download Graph`)
    .attr("class", "styled-button")
    .style("margin-left", "30px")
    .on('click', function() {
      // Temporarily remove the tooltip and listening rectangle
      // var tooltip = d3.select('#tooltip').style("display", "none");
      // document.getElementById("tooltip").style.display = "1";
      // document.getElementById("draggable").style.opacity = "1";

      // tooltip.attr("display", "none")
      // listeningRect.attr("display", "none")

      // Serialize the SVG and create a Blob
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(d3.select('.chart').node());
      const blob = new Blob([xmlString], { type: 'image/svg+xml;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'chart.svg');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // tooltip.style("display", "block")
      // listeningRect.style("display", "block")

      // // Re-add the tooltip and listening rectangle
      // d3.select('#chart-container').append(() => tooltip.node());
      // d3.select('#chart-container').append(() => listeningRect.node());
    });

    // Button for downloading the image
    d3.select('#right-buttons').append('button')
      .html(`${svgAdd} Add to Comparison`)
      .attr("class", "add-comparison styled-button")
      .style("margin-right", "30px")
      .on('click', () => {
        single_model = !single_model;
        updateChart();
      });

  // Button for downloading the image
  d3.select('#right-buttons').append('button')
    .html(single_model ? `${svgCompare} COMPARE MODELS` : `${svgCompare} SINGLE MODEL`)
    .attr("class", "change-model styled-button")
    .style("margin-right", "65px")
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

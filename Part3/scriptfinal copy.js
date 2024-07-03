function openSidebar() {
  document.getElementById("mySidebar").style.width = "25%";
}

function closeSidebar() {
  document.getElementById("mySidebar").style.width = "0px";
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
const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("left", `${580.7672826830938 + 130}px`)
  .style("top", "114px")
  .html(`&emsp;&emsp;&nbsp;2033
  &emsp;Gas vehicles<br>
  &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;3,450,000<br>
  🡐 &emsp; 🡒 &emsp;&emsp;Electric vehicles<br>
  &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;32,435<br>`);

// Load and process the data
d3.csv("vehicle registration.csv").then(data => {
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
    } else {
      // Add lines and confidence intervals for multiple models
      addLineWithConfidenceInterval(svg, data, "best_case", "bc_high", "bc_low", colors.green, colors.green_ci);
      addLineWithConfidenceInterval(svg, data, "most_likely", "ml_high", "ml_low", colors.accent3, colors.accent3_ci);
      addLineWithConfidenceInterval(svg, data, "worst_case", "wc_high", "wc_low", colors.accent4, colors.accent4_ci);
      addLineWithConfidenceInterval(svg, data, "model_1", "m1_high", "m1_low", colors.accent1, colors.accent1_ci);
      addLineWithConfidenceInterval(svg, data, "model_2", "m2_high", "m2_low", colors.accent2, colors.accent2_ci);
      d3.select('.add-comparison').style("display", "none")
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

  // Add a circle element
  const circle1 = svg.append("circle")
    .attr("r", 7)
    .attr("fill", "#c34339")
    .attr("cy", -44)
    .attr("cx", 580.7672826830938 + 52)
    .style("stroke", "white")
    .attr("opacity", .70)
    .style("pointer-events", "none");
  
  // Add a circle element
  const circle2 = svg.append("circle")
    .attr("r", 7)
    .attr("fill", "#559247")
    .attr("cy", -4)
    .attr("cx", 580.7672826830938 + 52)
    .style("stroke", "white")
    .attr("opacity", .70)
    .style("pointer-events", "none");

  const verticalLine = svg.append("line")
    .attr("y1", -50)    // y position of the start of the line
    .attr("y2", 390)      // y position of the end of the line
    .attr("x1", 580.7672826830938) // x position of the start of the line
    .attr("x2", 580.7672826830938) // x position of the end of the line (same as x1 for vertical line)
    .attr("stroke", "black") // stroke color
    .style("stroke-width", 2) // stroke width
    .style("pointer-events", "none");

  // Button for downloading the image
  d3.select('#chart-container').append('button')
  .text('🛈 MORE PROJECTIONS')
  .attr("class", "more")
  .style("background", "none")
  .style("border", "none")
  .style("position", "absolute")
  .style("top", "200px")
  .style("left", "790px")
  .style("z-index", "1")
  .on('click', () => {openSidebar()});

    
  // create a listening rectangle
  const listeningRect = svg.append("rect")
  .attr("width", width)
  .attr("height", height);
    
  // Define the drag behavior
  var drag = d3.drag()
  .on("drag", function(event) {
    const [xCoord] = d3.pointer(event, this);
    const bisectDate = d3.bisector(d => d.date).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    const xPos = x(d.date);
    console.log(xPos)
    
    // Update the line position
    verticalLine.attr("x1", xPos) // x position of the start of the line
    .attr("x2", xPos); // x position of the end of the line (same as x1 for vertical line)

    // Update the circles position
    circle1.attr("cx", xPos + 52)
    circle2.attr("cx", xPos + 52)

    d3.select(".more").style("left", xPos+210+"px")
    
    tooltip
      .style("left", `${xPos + 130}px`)
      .style("top", `${114}px`)
      .html(`&emsp;&emsp;&nbsp;${d.date.getFullYear()}
      &emsp;Gas vehicles<br>
      &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${d.registrations !== undefined ? (d.registrations ).toLocaleString(0) : 'N/A'}<br>
      🡐 &emsp; 🡒 &emsp;&emsp;Electric vehicles<br>
      &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${d.registrations !== undefined ? (d.ev_registrations ).toLocaleString(0) : 'N/A'}<br>`
    )
  });

  // Apply the drag behavior to the listeningRect
  listeningRect.call(drag);

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
  
  if (single_model) {
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
  }

  // Initial chart update
  updateChart();

  // Event listener for the button
  d3.select("#toggle-button").on("click", () => {
    single_model = !single_model;
    updateChart();
  });
});

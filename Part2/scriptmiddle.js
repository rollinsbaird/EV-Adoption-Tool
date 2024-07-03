// Set dimensions and margins for the chart
const margin = { top: 170, right: 80, bottom: 40, left: 160 };
const width = 1200 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

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
  &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;32,435<br>
  &emsp;&emsp;&emsp;&emsp;&ensp;🛈 MORE PROJECTIONS`);

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
  });

  // Set the domains for the x and y scales
  x.domain(d3.extent(data, d => d.date));
  y.domain([0, d3.max([d3.max(data, d => d.registrations), d3.max(data, d => d.ev_registrations)])]);

  // Draw the axes and gridlines
  drawAxes(svg, data);
  drawGridlines(svg, data);

  // Add lines and confidence intervals to the chart
  addLine(svg, data, "registrations", "high", "low", "#c34339", "#dec4bf");
  addLine(svg, data, "ev_registrations", "ev_high", "ev_low", "#559247", "#c9e0ce");

  // Add a draggable vertical line with circles and tooltip
  addVerticalLineWithTooltip(svg, data);
});

// Function to draw the axes
function drawAxes(svg, data) {
  // Add the x-axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .style("font-size", "14px")
    .call(d3.axisBottom(x)
      .tickValues(x.ticks(d3.timeYear.every(5)))
      .tickFormat(d3.timeFormat("%Y")))
    .call(g => g.select(".domain").remove())
    .selectAll(".tick line")
    .style("stroke-opacity", 0);
  svg.selectAll(".tick text")
    .attr("fill", "#777");

  // Add the y-axis
  svg.append("g")
    .style("font-size", "14px")
    .call(d3.axisLeft(y)
      .ticks(d3.max([d3.max(data, d => d.registrations), d3.max(data, d => d.ev_registrations)]) / 5000000)
      .tickFormat(d => isNaN(d) ? "" : `${(d / 1000000).toFixed(0)}M`)
      .tickSize(0)
      .tickPadding(10))
    .call(g => g.select(".domain").remove())
    .selectAll(".tick text")
    .style("fill", "#777")
    .style("visibility", (d, i, nodes) => (i === 0) ? "hidden" : "visible");

  // Add y-axis labels
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
}

// Function to draw the gridlines
function drawGridlines(svg, data) {
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

  // Add horizontal gridlines
  svg.selectAll("yGrid")
    .data(y.ticks(d3.max(data, d => d.registrations) / 5000000))
    .join("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", d => y(d))
    .attr("y2", d => y(d))
    .attr("stroke", "#e0e0e0")
    .attr("stroke-dasharray", "5,5");
}

// Function to add lines and confidence intervals to the chart
function addLine(svg, data, yField, yHighField, yLowField, lineColor, ciColor) {
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
    .attr("fill", ciColor)
    .attr("stroke", "none")
    .attr("d", ci);

  // Add the line path in two parts: solid & dashed
  svg.append("path")
    .datum(data.slice(0, 15))
    .attr("fill", "none")
    .attr("stroke", lineColor)
    .attr("stroke-width", 2)
    .attr("d", line);

  svg.append("path")
    .datum(data.slice(14))
    .attr("fill", "none")
    .attr("stroke", lineColor)
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", ("5,5"))
    .attr("d", line);
}

// Function to add a draggable vertical line with circles and tooltip
function addVerticalLineWithTooltip(svg, data) {
  const circle1 = svg.append("circle")
    .attr("r", 7)
    .attr("fill", "#c34339")
    .attr("cy", -44)
    .attr("cx", 580.7672826830938 + 52)
    .style("stroke", "white")
    .attr("opacity", .70)
    .style("pointer-events", "none");

  const circle2 = svg.append("circle")
    .attr("r", 7)
    .attr("fill", "#559247")
    .attr("cy", -4)
    .attr("cx", 580.7672826830938 + 52)
    .style("stroke", "white")
    .attr("opacity", .70)
    .style("pointer-events", "none");

  const verticalLine = svg.append("line")
    .attr("y1", -50)
    .attr("y2", 390)
    .attr("x1", 580.7672826830938)
    .attr("x2", 580.7672826830938)
    .attr("stroke", "black")
    .style("stroke-width", 2)
    .style("pointer-events", "none");

  // create a listening rectangle
  const listeningRect = svg.append("rect")
    .attr("width", width)
    .attr("height", height);

  // Define the drag behavior
  var drag = d3.drag().on("drag", function(event) {
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
    circle1.attr("cx", xPos + 52);
    circle2.attr("cx", xPos + 52);

    // Update tooltip
    tooltip
      .style("left", `${xPos + 130}px`)
      .style("top", `${114}px`)
      .html(`&emsp;&emsp;&nbsp;${d.date.getFullYear()}
      &emsp;Gas vehicles<br>
      &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${d.registrations !== undefined ? (d.registrations).toLocaleString(0) : 'N/A'}<br>
      🡐 &emsp; 🡒 &emsp;&emsp;Electric vehicles<br>
      &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${d.ev_registrations !== undefined ? (d.ev_registrations).toLocaleString(0) : 'N/A'}<br>
      &emsp;&emsp;&emsp;&emsp;&ensp;🛈 MORE PROJECTIONS`);
  });

  listeningRect.call(drag);
}

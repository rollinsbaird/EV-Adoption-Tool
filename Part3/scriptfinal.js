// Set dimensions and margins for the chart
const margin = { top: 170, right: 80, bottom: 40, left: 160 };
const width = 1200 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleTime()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 0]);

// Set up the line generator
const line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.registrations));

// Set up the EV line generator
const ev_line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.ev_registrations));

// Set up the confidence interval generator
const ci = d3.area()
  .x(d => x(d.date))
  .y0(d => y(d.high))
  .y1(d => y(d.low));

// Set up the EV confidence interval generator
const ev_ci = d3.area()
  .x(d => x(d.date))
  .y0(d => y(d.ev_high))
  .y1(d => y(d.ev_low));

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
    console.log(d.date)
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

  // Add the x-axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .style("font-size", "14px")
    .call(d3.axisBottom(x)
      .tickValues(x.ticks(d3.timeYear.every(5))) // Display ticks every 6 months
      .tickFormat(d3.timeFormat("%Y"))) // Format the tick labels to show Month and Year
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
      .ticks(d3.max([d3.max(data, d => d.registrations), d3.max(data, d => d.ev_registrations)]) / 5000000)
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
        return "hidden"; // Hide the first and last tick labels
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
    .data(y.ticks(d3.max(data, d => d.registrations)/ 5000000))
    .join("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", d => y(d))
    .attr("y2", d => y(d))
    .attr("stroke", "#e0e0e0")
    .attr("stroke-dasharray", "5,5")

  // Show confidence interval
  svg.append("path")
  .datum(data)
  .attr("fill", "#dec4bf")
  .attr("stroke", "none")
  .attr("d", ci);
  
  // Add the line path in two parts: solid & dashed
  const path1 = svg.append("path")
  .datum(data.slice(0,15))
    .attr("fill", "none")
    .attr("stroke", "#c34339")
    .attr("stroke-width", 2)
    .attr("d", line);
  const path2 = svg.append("path")
  .datum(data.slice(14))
  .attr("fill", "none")
  .attr("stroke", "#c34339")
  .attr("stroke-width", 2)
  .attr("stroke-dasharray", ("5,5"))
  .attr("d", line);

  // Show confidence interval
  svg.append("path")
  .datum(data)
  .attr("fill", "#c9e0ce")
  .attr("stroke", "none")
  .attr("d", ev_ci);
  
  // Add the line path in two parts: solid & dashed
  const ev_path1 = svg.append("path")
    .datum(data.slice(0,15))
    .attr("fill", "none")
    .attr("stroke", "#559247")
    .attr("stroke-width", 2)
    .attr("d", ev_line);
  const ev_path2 = svg.append("path")
    .datum(data.slice(14))
    .attr("fill", "none")
    .attr("stroke", "#559247")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", ("5,5"))
    .attr("d", ev_line);

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
    
    tooltip
      .style("left", `${xPos + 130}px`)
      .style("top", `${114}px`)
      .html(`&emsp;&emsp;&nbsp;${d.date.getFullYear()}
      &emsp;Gas vehicles<br>
      &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${d.registrations !== undefined ? (d.registrations ).toLocaleString(0) : 'N/A'}<br>
      🡐 &emsp; 🡒 &emsp;&emsp;Electric vehicles<br>
      &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;${d.registrations !== undefined ? (d.ev_registrations ).toLocaleString(0) : 'N/A'}<br>
      &emsp;&emsp;&emsp;&emsp;&ensp;🛈 MORE PROJECTIONS`
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
    .text('+ ADD TO COMPARISON')
    .style("background", "white")
    .style("border", "1px solid black")
    .style("margin-right", "65px")
    .style("float", "right")
    .style("height", "20px")
    .on('click', function() {});
  
    // Button for downloading the image
  d3.select('#chart-container').append('button')
    .text('🡘 COMPARE MODELS')
    .style("background", "white")
    .style("border", "1px solid black")
    .style("margin-right", "65px")
    .style("float", "right")
    .style("height", "20px")
    .on('click', function() {});

  // Add the source credit
  // svg.append("text")
  //   .attr("class", "source-credit")
  //   .attr("x", width - 1125)
  //   .attr("y", height + margin.bottom - 3)
  //   .style("font-size", "9px")
  //   .style("font-family", "sans-serif")
  //   .text("Source: jaildatainitiative.org");

});

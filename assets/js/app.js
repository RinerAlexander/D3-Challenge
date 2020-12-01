//Set up space for graph
var svgWidth = 1000;
var svgHeight = 600;
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;
  
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth).attr("height", svgHeight);
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//read data and make graph
d3.csv("assets/data/data.csv").then(function(data) {

    //change values from string to numbers
    data.forEach(function(entry) {
        entry.poverty = +entry.poverty;
        entry.obesity = +entry.obesity;
    });
    
    // set up x axis
    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, entry => entry.poverty))
        .range([0, chartWidth]);

    var bottomAxis = d3.axisBottom(xScale);
    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    
    // set up y axis
    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, entry => entry.obesity))
        .range([chartHeight, 0]);

    var leftAxis = d3.axisLeft(yScale);
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    //add Dots
    chartGroup.append('g')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", entry => xScale(entry.poverty))
        .attr("cy", entry => yScale(entry.obesity))
        .attr("r", 11)
        .style("fill", "#69b3a2");
    
    //add Text labels
    chartGroup.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(entry => entry.abbr)
        .attr("x", entry => xScale(entry.poverty)-8)
        .attr("y", entry => yScale(entry.obesity)+3)
        .style("font-size", "10px");
    
    //add axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left+10)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("State Obesity %");
  
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight+40})`)
        .attr("class", "axisText")
        .text("State Poverty %");

});
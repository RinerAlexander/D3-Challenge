//Set up space for graph
var svgWidth = 800;
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

    data.forEach(function(entry) {
        entry.poverty = +entry.poverty;
        entry.obesity = +entry.obesity;
    });
    console.log(data[0].poverty);

    var xScale = d3.scaleLinear()
    .domain(d3.extent(data, entry => entry.poverty))
    .range([0, chartWidth]);
    
    var yScale = d3.scaleLinear()
    .domain(d3.extent(data, entry => entry.obesity))
    .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    var leftAxis = d3.axisLeft(yScale);
    chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

});
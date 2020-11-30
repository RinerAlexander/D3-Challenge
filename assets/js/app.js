//Set up space for graph
var svgWidth = 960;
var svgHeight = 500;
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
  };
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;
  
  var svg = d3.select("scatter")
    .append("svg")
    .attr("width", svgWidth).attr("height", svgHeight);
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {

    data.forEach(function(entry) {
        entry.poverty = +entry.poverty;
        entry.obesity = +entry.obesity;
    });
    console.log(data[0].poverty);

});
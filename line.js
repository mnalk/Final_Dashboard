
var margin = {top: 30, right: 0, bottom: 30, left: 50},
    width = 210 - margin.left - margin.right,
    height = 210 - margin.top - margin.bottom;

d3.csv("https://gist.githubusercontent.com/mnalk/de3ec62d24de80c7b11232f1a4d1312d/raw/13fcdc85531212e095d30e977f9e24d9f497dd8c/final_nov.csv", function(data) {

 
  var sumstat = d3.nest() 
    .key(function(d) { return d.country;})
    .entries(data);


  allKeys = sumstat.map(function(d){return d.key})

 
  var svg = d3.select("#my_dataviz1")
    .selectAll("uniqueChart")
    .data(sumstat)
    .enter()
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, width ]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(3));


  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.suicides_no; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y).ticks(5));

 
  var color = d3.scaleOrdinal()
    .domain(allKeys)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])


  svg
    .append("path")
      .attr("fill", "none")
      .attr("stroke", function(d){ return color(d.key) })
      .attr("stroke-width", 1.9)
      .attr("d", function(d){
        return d3.line()
          .x(function(d) { return x(d.year); })
          .y(function(d) { return y(+d.suicides_no); })
          (d.values)
      })


  svg
    .append("text")
    .attr("text-anchor", "start")
    .attr("y", -5)
    .attr("x", 0)
    .text(function(d){ return(d.key)})
    .style("fill", function(d){ return color(d.key) })

})


var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 220 - margin.top - margin.bottom;


var svg = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("https://gist.githubusercontent.com/mnalk/de3ec62d24de80c7b11232f1a4d1312d/raw/13fcdc85531212e095d30e977f9e24d9f497dd8c/final_nov.csv", function(data) {


  var x = d3.scaleLinear()
      .domain([0,100])    
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  
  var histogram = d3.histogram()
      .value(function(d) { return +d.suicides_no; })   
      .domain(x.domain())  
      .thresholds(x.ticks(40)); 

  
  var bins1 = histogram(data.filter( function(d){return d.sex === "male"} ));
  var bins2 = histogram(data.filter( function(d){return d.sex === "female"} ));

  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins1, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
      .call(d3.axisLeft(y));


 svg.selectAll("rect")
 .data(bins1)
 .enter()
 .append("rect")
   .attr("x", 1)
   .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
   .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
   .attr("height", function(d) { return height - y(d.length); })
   .style("fill", "#0e3bf0")
   .style("opacity",  0.9)


svg.selectAll("rect2")
 .data(bins2)
 .enter()
 .append("rect")
   .attr("x", 1)
   .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
   .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
   .attr("height", function(d) { return height - y(d.length); })
   .style("fill", "#d20ef0")
   .style("opacity", 0.9)


svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#0e3bf0")
svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#d20ef0")
svg.append("text").attr("x", 320).attr("y", 30).text("Male").style("font-size", "18px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 320).attr("y", 60).text("Female").style("font-size", "18px").attr("alignment-baseline","middle")

});
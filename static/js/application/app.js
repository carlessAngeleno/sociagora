
// modified from http://bl.ocks.org/mbostock/4062045
function drawFDG(parentSel) {    
  var width = $(parentSel).width(),    
    height = width * 0.74;   

  var color = d3.scale.category20();

  var force = d3.layout.force()
    .charge(-200)
    .linkDistance(60)
    .size([width, height]);

  var svg = d3.select(parentSel).append("svg")
    .attr("width", width)
    .attr("height", height);

  d3.json("/sociagora/static/data/data_0100.json", function(error, graph) {

    force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

    var link = svg.selectAll(".link")
      .data(graph.links)
     .enter().append("line")
      .attr("class", "link")
      //.style("stroke-width", function(d) { return Math.sqrt(d.value); });
      .style("stroke-width", function(d) { return (d.value * 30); }); 

    var node = svg.selectAll(".node")
      .data(graph.nodes)
     .enter().append("g")
      .attr("class", "node") 
      .call(force.drag);           

    node.append("circle")
      .attr("r", function(d) {return Math.sqrt(d.num_followers / 500); })
      .style("opacity", "0.8")
      //.attr("r", function(d) {return 8; })
      .style("fill", function(d) { 
       if (d.group === 1)
        col = "1f77b4";
       if (d.group === 2)
        col = "d62728";
       if (d.group === 3)
        col = "2ca02c";        
       return col;
       //return color(d.group); 
      });

    node.append("text")
      //.attr("x", 12)
      .attr("dy", ".35em")
      .attr("font-family", "verdana")
      .attr("font-size", "10px")
      .attr("class", "shadow")
      .attr("stroke", "#D7D7D7")
      .attr("stroke-width", "0.8px")
      .attr("fill", "#D7D7D7")    
      .text(function(d) { return d.name; });    

    node.append("title")
      .text(function(d) { return d.name; });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        //.attr("cx", function(d) { return d.x; })
        //  .attr("cy", function(d) { return d.y; });
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }); 
  });

  window.onresize = resizeSVG;

  function resizeSVG(){
    var width = $(parentSel).width(),    
        height = width * 0.74;   
    svg.attr("width", width).attr("height", height);
  } 
}

$(document).ready(function(){
  drawFDG(parentSel = "#canvas");
})
var execute = function(){
    var svg = d3.select("svg");
    svg.selectAll("rect")
        .data([127, 61, 256])
        .enter().append("rect")
        .attr("x",0)
        .attr("y", function(d, i){
            return i * 60 + 50
        })
        .attr("width", function(d){
            return d;
        })
        .attr("height", 20)
        .style("fill", "steelblue");
   /* var selection = svg
        .selectAll("rect")
        .data([127,61,256,71]);
    selection    
        .attr("x", 0)
        .attr("y", function(d, i){
            return i * 60 + 50;

        })
        .attr("width", function(d){
            return d;
        })
        .attr("height", 20)
        .style("fill", "steelblue");
    selection.enter().append("rect")
        .attr("x", 0)
        .attr("y", function(d, i){
            return i * 60 + 50;

        })
        .attr("width", function(d){
            return d;
        })
        .attr("height", 20)
        .style("fill", "green");  */ 
}
var button = d3.select("body").append("button");
button.text("Run!");
button.on("click", execute);
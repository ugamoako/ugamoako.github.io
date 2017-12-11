var width = 960,
height = 500;

var svg = d3.select("#network").append("svg")
.attr("width", width)
.attr("height", height);

var force = d3.layout.force()
.size([width, height]);
d3.csv("labels.csv", function(error, labels) {
//console.log('labels: ', labels[0].label);

   
d3.json("graph.json", function(error, graph) {
if (error) throw error;
//console.log(graph[2]);
var nodes = d3.values(graph),
  links = d3.merge(nodes.map(function(source) {
    return source.map(function(target) {
      return {source: source, target: graph[target]};
    });
  }));
//console.log('nodes:', nodes)
//console.log('links: ', links)
force
  .nodes(nodes)
  .links(links)
  .start();
var colorScale = d3.scale.category10();
var link = svg.selectAll(".link")
  .data(links)
.enter().append("line");

var node = svg.selectAll(".node")
  .data(nodes)
.enter();
var circle = node.append("circle")
  .attr("r", 5)
  .style("fill", function(d, i) { return colorScale(i); })
  .call(force.drag);

force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    circle.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });

    label.attr("x", function(d){return d.x})
         .attr("y", function(d) { return d.y; });
         //.style("font-size","8px");
        //var nodeUpdate = node.merge(node);
    //console.log(label);  
    //node.append("text")
        //.attr("dx", 9)
        //.attr("dy", ".35em")
        //.text(function(d) { return d.index })
    });
    var lab = [];
    
    var label = node.append('text')
    .attr("dy", ".35em")
    // .attr("x", function(d) {
    //     return d.index
    // })
    .attr("dx", 6)
    .attr("text-anchor", function(d){
        return d.index
    })
    .text(function(d, i){
        return labels[i].label   
    })
    .style("font-size","8px");
    populatelist(labels);
    function populatelist(data){
        var ul = d3.select("ul");
        ul.selectAll('li')
            .data(data)
            .enter()
            .append('li')
            .attr('class', 'collection')
            .attr('data-toggle', 'modal')
            .attr('data-target', '#myModal')
            .text(function(d){return d.label;})
            .on("click", modifyText);
          //  .html(function(d){
             //   return '<a href="#">' + d.label+'</a>'   
           // });

    }

    var fisheye = d3.fisheye.circular()
    .radius(200)
    .distortion(2);

    svg.on("mousemove", function() {
        fisheye.focus(d3.mouse(this));
      
        circle.each(function(d) { d.fisheye = fisheye(d); })
            .attr("cx", function(d) { return d.fisheye.x; })
            .attr("cy", function(d) { return d.fisheye.y; })
            .attr("r", function(d) { return d.fisheye.z * 4.5; });
      
        link.attr("x1", function(d) { return d.source.fisheye.x; })
            .attr("y1", function(d) { return d.source.fisheye.y; })
            .attr("x2", function(d) { return d.target.fisheye.x; })
            .attr("y2", function(d) { return d.target.fisheye.y; });
        
        label.attr("x", function(d) { return d.fisheye.x; })
             .attr("y", function(d) { return d.fisheye.y; })
             .style("font-size", function(d){ return d.fisheye.z * 7 + 'px'}); 
             
      });  

    let filterInput = document.getElementById("filterInp");
    filterInput.addEventListener("keyup", filterwords)
    function filterwords(){
        let filterValue = document.getElementById("filterInp").value;
        
        let ul = document.getElementById("words");
        let li = ul.querySelectorAll('li.collection');
        
        for(let i = 0; i < li.length; i++){
            let a = li[i];
            //console.log(a.innerHTML);
            if(a.innerHTML.indexOf(filterValue) > -1){
                li[i].style.display = '';
            } else {
                li[i].style.display = 'none';
            }
        }
        //console.log(filterValue);
    };
    var el = d3.selectAll(".collection");
    //.each(function(e){
        //e.on("click", modifyText);
    //});
    //let wordpicker = document.getElementsByClassName("collection");
        //wordpicker.addEventListener("click", selectword());
    function modifyText(d){
        let modalhead = document.getElementById('title');
        modalhead.innerHTML = d.label;
        let children = graph[d.id];
        console.log('children', children);
        var phrases = [];
        children.forEach(function(e) {
            let grandchild = graph[e];
            grandchild.forEach(function(f){
                if( (d.label!==labels[f-1].label)&&(labels[e-1].label !== labels[f-1].label)){
                    phrases.push(d.label +' '+ labels[e-1].label +' '+ labels[f-1].label);
                }
                
            },this)
            //console.log('child: ', e);
            //console.log('grandchild: ', grandchild);
            
            //console.log(d.label, labels[e-1].label);
        }, this);
        //console.log(phrases);
        d3.selectAll('p').remove();
        var phrase = d3.select("#phrases");
        phrase.selectAll('p')
            .data(phrases)
            .enter()
            .append('p')
            .text(function(d){return d});
            //.on("click", modifyText);
        //$( "#dialog" ).dialog();
        //alert(d.label);
    };
    
});

    
});
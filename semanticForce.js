var width = 960,
    height = 800;

let sidelab = [];
let optArray = [];     
var toggle = 0;



createJson(rawdata);
function createJson(data){
    let nodes = {};
    let newLinks = [];
    new Promise((resolve, reject) => {
        data.forEach(function(a){
            let xy = a.split(' ');
            for(i =0; i < xy.length -1; i++){
                var newLink = {};
                newLink["source"] = xy[i];
                newLink["target"] = xy[i+1];
               newLinks.push({"source": xy[i], "target":xy[i+1], "value": 1});

            }
        });
        
        resolve();
    })
    .then(
        () => 
            {
                newLinks.forEach(function(link) {
                    link.source = nodes[link.source] || 
                        (nodes[link.source] = {name: link.source});
                    link.target = nodes[link.target] || 
                        (nodes[link.target] = {name: link.target});
                    link.value = +link.value;
                });
                drawgraph(nodes, newLinks);
               
                
                //console.log('sidelab: ', sidelab);
                populateTranscriptView(sidelab);
            });  
}
function drawgraph(nodes, links){

    var colorScale = d3.scale.category10();
    var svg = d3.select('#network').append('svg')
        .attr('width', width)
        .attr('height', height);
    var force = d3.layout.force()
        .size([width, height])
        .charge(-60)
        .nodes(d3.values(nodes))
        .links(links)
        .on("tick", tick)
        .linkDistance(60)
        .start();

    var link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .style("stroke-width", "1px")
        .style("stroke", function(d) { return colorScale(1);}); 

    var node = svg.selectAll('.node')
        .data(force.nodes())
        .enter();  
    var circle = node.append('circle')
        .attr('class', 'node')
        .attr('r', width * 0.006);  
        
    var label = node.append("text")
        .attr("dy", ".35em")
        .attr("dx", 8)
        .text(function(d) { 
            optArray.push(d.name);
            sidelab.push(d.name +' (' + d.weight +')');
            return d.name; })
        .style("font-size","9px");

        function tick(e) {
            circle.attr('cx', function(d) {return d.x})
                .attr('cy', function(d) {return d.y})
                .call(force.drag)
                .on('dblclick', connectednodes);

            link.attr('x1', function(d){return d.source.x;})
                .attr('y1', function(d){return d.source.y;}) 
                .attr('x2', function(d){return d.target.x;})
                .attr('y2', function(d){return d.target.y;}); 

            label.attr("x", function(d){return d.x})
                 .attr("y", function(d) { return d.y; });      
         }    
}
        

    function populateTranscriptView(d){
        var phrase = d3.select("#words");
            phrase.selectAll('li')
                .data(d)
                .enter()
                .append('li')
                //.append('a')
                .attr('data-toggle', 'modal')
                .attr('data-target', '#myModal')
                .text(function(d){return d})
                .on('click', function(d) {
                    var d = d3.select(this).node().__data__;
                    //console.log('selected node: ', d);
                    modifyText(d)
                }); 
    }        


        function modifyText(d){
            let textid = d.split(" ");
            console.log('modify text is called.')
            function checkOneNode(rawdata) {
                //let term = document.getElementById('title').innerHTML;
                return (rawdata.indexOf(textid[0]) > -1);
            }
            let myrawdata = rawdata.filter(checkOneNode);
            let modalhead = document.getElementById('title');
                modalhead.innerHTML = textid[0];
            var filterlist = d3.select("#minornode");
            filterlist.selectAll('li').remove();
            filterlist.selectAll('li')
                .data(myrawdata)
                .enter()
                .append('li')
                .text(function(d){return d});
            d3.select('svg').remove();    
            createJson(myrawdata);    
            //document.getElementById("minornode").innerHTML = rawdata.filter(checkAdult);
            
        }
       
        function connectednodes(){
            if (toggle === 0) {
            let d = d3.select(this).node().__data__;
            let circle = d3.selectAll('circle')
                .attr('data-toggle', 'modal')
                .attr('data-target', '#myModal');
            //console.log(d.name);
            toggle = 1;
            modifyText(d.name)
            
            } else {
                d3.select('svg').remove(); 
                toggle = 0; 
                createJson(rawdata);
                   
            }
        }
    optArray = optArray.sort();
        $(function () {
            $("#filterInp").autocomplete({
                source: optArray,
                select: function(event, ui){ 
                    $("#filterInp").val(ui.item.label);
                    searchNode();
                }
            });
        });
        $("#filterInp").focus(function(){
            $(this).css("background-color", "#ffffff");
        });
        
        //console.log(optArray);
        
        function searchNode() {
            var selectedVal = document.getElementById('filterInp').value;
            var node = d3.selectAll(".node");
            if (selectedVal == "none") {
                node.style("stroke", "white").style("stroke-width", "1");
            } else {
                var selected = node.filter(function (d, i) {
                    return d.name != selectedVal;
                });
                selected.style("opacity", "0");
                var link = d3.selectAll(".link")
                    link.style("opacity", "0");
                d3.selectAll(".node, .link").transition()
                    .duration(5000)
                    .style("opacity", 1);
            }
        }
        let filterInput = document.getElementById("filterInp");
        filterInput.addEventListener("keyup", filterwords)
        function filterwords(){
            let filterValue = document.getElementById("filterInp").value;
            
            let ul = document.getElementById("words");
            let li = ul.querySelectorAll('li');
            
            for(let i = 0; i < li.length; i++){
                let a = li[i];
                //console.log(a.innerHTML);
                if(a.innerHTML.indexOf(filterValue) > -1){
                    li[i].style.display = '';
                } else {
                    li[i].style.display = 'none';
                }
            }
        };
            
            //console.log('rawdata: ', rawdata);
       

    
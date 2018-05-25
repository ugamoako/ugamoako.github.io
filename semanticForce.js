<<<<<<< HEAD
var width = window.innerWidth,
=======
var width = window.innerWidth;
>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
height = window.innerHeight;
let rawdata = [];
let sidelab = [];
<<<<<<< HEAD
let values = [];
let optArray = [];     
var toggle = 0;

d3.csv("moviezero.csv", function(d) {
    rawdata = [];
    d.forEach(e=>{
     let dd =  e.text.removeStopWords();
     if(dd.split(' ').length>1){
        rawdata.push({name:dd,group:e.name});
     }
    
    })
=======
let optArray = [];
let values = [];     
var toggle = 0;

d3.csv("rawlist.csv", function(d) {
>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
    //populateTranscriptView(d);
    //console.log(d);
    //rawdata = d;
    createJson(rawdata);
});

function createJson(data){
let nodes = {};
let newLinks = [];
new Promise((resolve, reject) => {
    data.forEach(function(a){
        //const regex = /(?:(the|a|an|in|go|is) +)/g;
        //let str = a.text; 
        //const subst = ``;
        //let result = str.removeStopWords();
        //console.log(result);
        let xy = a.name.split(' ');
        //console.log('length: ',xy.length)
        
            for(i =0; i < xy.length -1; i++){
                var newLink = {};
                newLink["source"] = xy[i];
                newLink["target"] = xy[i+1];
               newLinks.push({"source": xy[i], "target":xy[i+1],"value":i, "group": a.group});
    
            }

        
    });
    
    resolve();
})
.then(
    () => 
        {
        newLinks.forEach(function(link) {
            
            link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, group:link.group});
            link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, group:link.group});
                link.value = +link.value;
                
            });
            
            console.log('links>: ', newLinks);
            /*nodes.forEach((e)=>{
                console.log('e', e);
            })*/
            drawgraph(nodes, newLinks);
           
            
            //console.log('sidelab: ', sidelab);
            populateTranscriptView(sidelab);
        });  
}
function drawgraph(nodes, links){
<<<<<<< HEAD
var color = d3.scale.category20();
=======
    
    //console.log('nodes: ',nodes)
   

>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
var colorScale = d3.scale.category10();
var svg = d3.select('#network').append('svg')
    .attr('width', width)
    .attr('height', height);
var force = d3.layout.force()
    .size([width, height])
    .charge(charge)
<<<<<<< HEAD
    .gravity(0.5)
=======
    .gravity(2)
>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
    .nodes(d3.values(nodes))
    .links(links)
    .on("tick", tick)
    .linkDistance(linkdist)
    .start();
   
function charge(d){
<<<<<<< HEAD
var scalee = d3.scale.linear()
    .domain([1, (10*10)])
    .range([-400,100]); 
    //console.log('weight: ', d.weight,'charge: ', scalee(d.weight*d.weight));
    return scalee(d.weight*d.weight);
}
function linkdist(d){
    return Math.sqrt(d.source.weight);
=======
    console.log('charge',d);
    //console.log(d.weight* d.weight *-5);
    return d.weight * d.weight*-25;
}
function linkdist(d){
    //console.log(d.source.weight* d.target.weight);
    //console.log('link distance: ',d);
    return d.source.weight +20;
>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
}

var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link')
    .style("stroke-opacity", function(d) { 
        //console.log('good: ', Math.sqrt(d.source.weight*0.01));
        return Math.sqrt(d.source.weight * 0.01);
    });
    //.style("stroke", function(d) { return colorScale(1);}); 
   //console.log(links);
var node = svg.selectAll('.node')
    .data(force.nodes())
    .enter();  
<<<<<<< HEAD
 
=======
>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
    
var label = node.append("text")
    .attr("dy", ".35em")
    .attr("dx", 8)
    .text(function(d) { 
<<<<<<< HEAD
        //console.log('data: ', d)
        optArray.push(d.text);
=======
        console.log('label');  
        optArray.push(d.name);
>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
        values.push(d.weight);
        sidelab.push({"name" : d.name, "count" : d.weight});
        return d.name; })
    .style("font-size","9px");
var scaled = d3.scale.linear()
    .domain([1, d3.max(values)])
<<<<<<< HEAD
    .range([3,15]);  
=======
    .range([3,15]); 
>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
var circle = node.append('circle')
    .attr('class', 'node')
    .attr('r', function(d) {
        
<<<<<<< HEAD
        return scaled(d.weight);
=======
        //console.log('scaled',scaled(d.weight));
        return scaled(d.weight);        
        //return scaled
>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
        /*let r = width * 0.001 * d.weight;
        const i = width * 0.004;
        if(r > 10){r = 10};
        return r > i ? r: i;*/
<<<<<<< HEAD
    });
    /*.style("fill", function (d) {
        return color(d.group);
    });*/
=======
    });      
    console.log('weight: ',values)
    console.log('max', d3.max(values))
    console.log('min', d3.min(values))
    /*values.forEach(e =>{
        console.log(e);
    })*/
    
>>>>>>> fa2b3ea39c5b0c40701c6a5a7cd97b5894e2c082
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
let toggleTable = false;        
function tableView(){
var filterlist = d3.select("#ui-to-buttom");
if(!toggleTable){
    $('#ui-to-buttom').css({'height':'500px', 'opacity':1});
    filterlist.selectAll('li').remove();
    filterlist.selectAll('li')
        .data(rawdata)
        .enter()
        .append('li')
        .text(function(d){return d.name})
        .on('mouseover', highlighConnection);
    toggleTable = true;
} else {
    filterlist.selectAll('li').remove();
    d3.select('svg').remove();
    createJson(rawdata); 
    $('#ui-to-buttom').css({'height':'150px', 'opacity':0.7});
    toggleTable = false;
}

}
function populateTranscriptView(data){
    var sortAscending = true;
    var table = d3.select('#words').append('table');
    var titles = d3.keys(data[0]);
    var headers = table.append('thead').append('tr')
                     .selectAll('th')
                     .data(titles).enter()
                     .append('th')
                     .text(function (d) {
                          return d;
                      })
                     .on('click', function (d) {
                         //headers.attr('class', 'header');
                         var x = d3.select(this).node().__data__;
                         console.log('clicked value: ', x);
                         if (sortAscending) {
                           rows.sort(function(a, b) { 
                            if (a[x] < b[x]) { 
                                return -1; 
                              } else if (a[x] > b[x]) { 
                                return 1; 
                              } else {
                                return 0;
                              }
                            //console.log('a value: ', a.name, 'b value: ', b.name);
                             });
                           sortAscending = false;
                           this.className = 'aes';
                         } else {
                            rows.sort(function(a,b) { 
                                if (a[x] < b[x]) { 
                                  return 1; 
                                } else if (a[x] > b[x]) { 
                                  return -1; 
                                } else {
                                  return 0;
                                }
                              });
                           sortAscending = true;
                           this.className = 'des';
                         }
                         
                     });
    
    var rows = table.append('tbody').selectAll('tr')
                 .data(data).enter()
                 .append('tr');
    rows.selectAll('td')
      .data(function (d) {
          return titles.map(function (k) {
              return { 'value': d[k], 'name': k};
          });
      }).enter()
      .append('td')
      .attr('data-th', function (d) {
          return d.name;
      })
      .attr('class', 'words')
      .text(function (d) {
          return d.value;
      })
      .on('click', function (d) {
          modifyText(d.value);
          //console.log('you clicked me...', d.value);
      })
      .on('mousemove', function(d){
          //searchNode(d.value);
          selectNode(d.value);
        })
      .on('mouseout', deSelectNode);  

       
}        


    function modifyText(d){
        //if(d.length < 4){ d+= ' '}
        //let textid = d.split(" ");
        console.log('modify text is called.', d);
        function checkOneNode(rawdata) {
            //let term = document.getElementById('title').innerHTML;
            return (rawdata.indexOf(d) > -1);
        }
        let myrawdata = rawdata.filter(function(e){
            
            return e.name.match(d);
        });
        //console.log('modify text is called.', myrawdata);
        let modalhead = document.getElementById('title');
            modalhead.innerHTML = d;
        var filterlist = d3.select("#ui-to-buttom");
        filterlist.selectAll('li').remove();
        filterlist.selectAll('li')
            .data(myrawdata)
            .enter()
            .append('li')
            .text(function(d){return d.name})
            .on('mouseover', highlighConnection);
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
                var selectedVal = document.getElementById('filterInp').value;
                searchNode(selectedVal);
            }
        });
    });
    $("#filterInp").focus(function(){
        $(this).css("background-color", "#ffffff");
    });
    

    function highlighConnection(){
        var isExist = new Set();
        let d = d3.select(this).node().__data__;
        //let result = d.text.removeStopWords();
        //console.log(result);
        let textLinks = d.name.split(" ");
        let link = d3.selectAll('.link');
        let circle = d3.selectAll('.node');
        //console.log('circle passed: ', circle);
        circle.style("fill", function (o) { return textLinks.indexOf(o.name)> -1? '#DF1843': '#ccc'});
        for(i=0;i<textLinks.length -1; i++){
            link.style("stroke", function (o) {
                if(textLinks[i]==o.source.name & textLinks[i+1]==o.target.name){
                    isExist.add(o);
                    
                    //console.log('is exist>>>', isExist);
                    //return 1;
                    return '#DF1843';
                }
                else {
                    /*if(isExist.has(o)){
                        return 1;
                    } else {
                        return 0;
                    }*/
                    if(isExist.has(o)){
                        return '#DF1843';
                    } else {
                        return '#ccc';
                    }
                    
                }
                //console.log(i.index);
               //console.log('neighbours: ', getNeighboursByNodeId(i.index)); 
            }); //.style('stroke', '#DF1843');
        }
        
       } 
    //console.log(optArray);
    function selectNode(selectedVal){
        var node = d3.selectAll(".node");
        if (selectedVal == "none") {
            node.style("stroke", "white").style("stroke-width", "1");
        } else {
            var selected = node.filter(function (d, i) {
                return d.name != selectedVal;
            });
            selected.style("opacity", "0");
            node.style('fill', '#DF1843');
            var link = d3.selectAll(".link")
                link.style("opacity", "0");
            
        }
    }
    function deSelectNode(){
        d3.selectAll(".node, .link").transition()
                .duration(500)
                .style('fill', '#ccc')
                .style("opacity", 1);
    }
    
    function searchNode(selectedVal) {
        
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
                .duration(2000)
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

    $(document).ready(function(){
        $('[data-tooltip="tooltip"]').tooltip({'placement': 'left'});
    });
        
        //console.log('rawdata: ', rawdata);
   


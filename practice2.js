var mainDV = document.getElementById("manidv");

var newparagraph = document.createElement("p");

newparagraph.appendChild(document.createTextNode("The quick brown fox jump over the lazy dog"));

//mainDV.appendChild(newparagraph);

function divWithText(text){
    var div = document.createElement("div");
    var textele = document.createTextNode(text);
    div.appendChild(textele);
    return div;
}

function textPos(text, x, y){
    var node = divWithText(text);
    node.setAttribute("style","position:absolute; left: " + x + "px; top: "+ y % 50 +"px; " + 
                        "color: hsl(" + x % 255 +", 100%, 50%");
    return node;
}
function helloworld(){
    alert("hello, you have clicked me!!!");
}
document.getElementById("clock").onclick = function(){
    alert("hello you have clicked me twice");
}
function numberText(v){
    var node = divWithText(String(Math.floor(v)));

    node.update = function(amount){
        v += amount;
        node.textContent = function(amount){
            v += amount;
            node.textContent = String(Math.floor(v));
            var x = v % 800;
            var y = v % 50;
            node.setAttribute("style",
            "position:absolute; left: " + x + "px; " +
            "top: "+ y % 50 + "px; " +
            "color: hsl(" + x % 255 + ", 100%, 50%)");
        };
        node.update(0);
        return node;
    }
    function tick(){
        var i;
        for(i = 0; i < nodes.length; ++i){
            nodes[i].update(1);
        }
    }
}

for(i = 10; i < 200; i+=10){
    mainDV.appendChild(textPos(String(i*4), 3*i,3*i));
}
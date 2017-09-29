var urlquote = '';
var authors = '';
var count = 0;
var quote = ["All successful men and women are big dreamers. They imagine what their future could be, ideal in every respect, and then they work every day toward their distant vision, that goal or purpose.” – Brian Tracy",
            "What screws us up the most in life is the picture in our head of how it is supposed to be.",
            "Life is a shipwreck, but we must not forget to sing in the lifeboats.",
            "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
            "Life is ten percent what happens to you and ninety percent how you respond to it.",
            "It has been my philosophy of life that difficulties vanish when faced boldly.-Isaac Asimov"];
var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
             var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
                } else {
                reject(status);
                    }
                  };
                  xhr.send();
                });
              };     
            getJSON('https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json').then(function(data) {
                
                var seenNames = {};
                urlquote = data.filter(function(currentObject) {
                    if (currentObject.quoteText in seenNames) {
                        return false;
                    } else {
                        seenNames[currentObject.quoteText] = true;
                        return true;
                    }
                });
                var seenauthors = {};
                authors = urlquote.filter(function(currentObject) {
                    if (currentObject.quoteAuthor in seenauthors) {
                        return false;
                    } else {
                        seenauthors[currentObject.quoteAuthor] = true;
                        return true;
                    }
                    
                });
                function ath(){
                    var options = '';
                    slctbox = document.getElementById("author_slct");
                    for(var i=0 ; i<authors.length ; i++)
                    {
                        var authname = authors[i].quoteAuthor; //or whatever the value you want to show
                        var opt = document.createElement('option');
                        slctbox.options.add(new Option(authname));
                        //console.log(authname);
                    }
                }
                
            //urlquote = data;
                rea()
                ath();
                console.log('outside outside: ', urlquote[count].quoteText);
            }, function(status) { //error detection....
              alert('Something went wrong.');
            });
            
            
 function filterfunc(){
     var slt = document.getElementById("author_slct");
      urlquote = urlquote.filter(function (n){
        return n.quoteAuthor===slt.value;
    });
     console.log(urlquote);
 }

//alert(urlquote);
//quotebody.innerHTML = urlquote[count].quoteText + ' - ' + urlquote[count].quoteAuthor;
function rea() {
    var quotebody = document.getElementById("quotebody");
        quotebody.innerHTML = urlquote[count].quoteText + ' - ' + urlquote[count].quoteAuthor;
    count ++;
    if(count > urlquote.length)
        count = 0;
};
function sort(){
    
    urlquote.sort( function(a, b){
        var x = a.quoteText.toLowerCase();
        var y = b.quoteText.toLowerCase();
        if(x<y){return -1;}
        if(x>y){return 1;}
        console.log('sort done inside');
        return 0;
        
    });
    count = 0;
    var quotebody = document.getElementById("quotebody");
    quotebody.innerHTML = urlquote[count].quoteText + ' - ' + urlquote[count].quoteAuthor;
    console.log('sort done');
    console.log(urlquote);
};
//rea();

var p = d3.select("#quotebody");
    p.append("text");

//p.style("color","steelblue");
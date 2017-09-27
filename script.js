var quotes = {
    quote1 : 'All successful men and women are big dreamers. They imagine what their future could be, ideal in every respect, and then they work every day toward their distant vision, that goal or purpose.” – Brian Tracy',
    quote2 : 'What screws us up the most in life is the picture in our head of how it is supposed to be.',
    quote3 : 'Life is a shipwreck, but we must not forget to sing in the lifeboats.',
    quote4 : 'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.',
    quote5 : 'Life is ten percent what happens to you and ninety percent how you respond to it.',
    quote6 : 'It has been my philosophy of life that difficulties vanish when faced boldly.-Isaac Asimov'

}
var count = 0;
function rea() {
    var quotebody = document.getElementById("quotebody");
    
    count ++;
    if(count>6)
        count = 1;
    
    //alert(count);
    switch(count)
    {
        case 1:
            quotebody.innerHTML = quotes.quote2;
            break;
        case 2:
            quotebody.innerHTML = quotes.quote3;
            break;
        case 3:
            quotebody.innerHTML = quotes.quote4;
            break;
        case 4:
            quotebody.innerHTML = quotes.quote5;
            break;
        case 5:
            quotebody.innerHTML = quotes.quote6;
            break;
        default:
            quotebody.innerHTML = quotes.quote1;
            break;
    }
    //alert(quotes.four);
    // code here
};
//rea();
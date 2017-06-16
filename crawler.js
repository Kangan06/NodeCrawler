var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');



searchPage();

// function searchKeyword(){
// var stdin = process.openStdin();
// console.log("Enter a keyword to search");
// stdin.addListener("data", function(d) {
// var x= d.toString().trim();

// var pageToVisit = 

// console.log(pageToVisit);


// });

// }



function searchPage(){
	var pagein = process.openStdin();
	console.log("Enter space separated page number and a keyword to search");
    
	pagein.addListener("data", function(d) {
		var xl= d.toString().trim();
		var t=xl.split(' ');
		var pageToVisit="http://www.shopping.com/products~PG-"+t[0]+"?KW="+t[1];
		 console.log("Query 2 URL:  "+pageToVisit);
		request(pageToVisit, function(error, response, body) {

   if(error) {
     console.log("Error: " + error);
   }
   if(response.statusCode === 200) {
     var $ = cheerio.load(body);
     links = $('div'); 
     console.log("RESULT OF QUERY TWO >>>>>>>>>>");
     console.log(">>>>>>>>>>>>>>>>>>>>>");
     $(links).each(function(i, link){
       if(link.attribs.class== "gridItemBtm"){
        x=link.children[1].children;
        for(var i=0;i<x.length;i++){
          if(x[i].name=="a"){
            k=x[i].children;
            for(var j=0;j<k.length;j++){
              if(k[j].name=='span'){
                console.log(k[j].attribs.title);
              }
            }
          }
        }
       }   
    
    });
     
    }
});

  var pageToVisit2="http://www.shopping.com/products?KW=" + t[0];
  console.log("Query 1 URL:   "+pageToVisit2);
   request(pageToVisit2, function(error, response, body) {
   
   if(error) {
     console.log("Error: " + error);
   }
   if(response.statusCode === 200) {
     var $ = cheerio.load(body);
   links = $('span'); 
   console.log("RESULT OF QUERY ONE >>>>>>>>>>");
   console.log(">>>>>>>>>>>>>>>>>>>>>");
     $(links).each(function(i, link){
     if(link.attribs.class=="numTotalResults"){
     var data=link.children[0].data.split(' ').slice(-1)[0].replace('+','');
       console.log(data);
     }
     });
    }
}); 

	});
}

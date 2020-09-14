
window.onload = function(){

var url = 'https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=0e87d15ebad2463b803afd25220483a5';
var req = new Request(url, {headers: new Headers ({"X-Requested-With":"news"})});
fetch(req)

	.then(function(response){
		response.json().then(function(data){
			console.log(data); 
			console.log('data-inside'); 
			console.log(data.articles[0].title);
			var d = new Date(data.articles[1].publishedAt);
			document.getElementById("teste2").innerHTML = data.articles[1].title;
			document.getElementById("teste2").href = data.articles[1].url;
			document.getElementById("teste-img").src = data.articles[1].urlToImage;	
			document.getElementById("teste-fonte").innerHTML = data.articles[1].source.name;
			document.getElementById("teste-t").innerHTML = data.articles[1].description;
			document.getElementById("teste-time").innerHTML = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate();			

			for(i=0; i < data.articles[i].length; i++){
				console.log(i);
				console.log(data.articles[i].title);

			}
		});
	})

	.catch(function(err){ 
		console.error('Failed retrieving information', err);
	});
	
console.log("data"); 

};

window.onload = function(){

var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=jp&' +	  
          'apiKey=0e87d15ebad2463b803afd25220483a5';
var req = new Request(url);
fetch(req)

	.then(function(response){
		response.json().then(function(data){ 

			console.log("Total de artigos: " + data.articles.length);			
			var i;
			var j = 1;
			for (i = 0; i < 6; i++){
				
				var dt = new Date(data.articles[i].publishedAt);	
				
				console.log(data.articles[i].title);
				console.log(data.articles[i].url);
				console.log(data.articles[i].urlToImage);
				console.log(data.articles[i].source.name);
				console.log(data.articles[i].description);
				console.log(dt.getFullYear() + "/" + dt.getMonth() + "/" + dt.getDate());
							
				document.getElementById("news-a" + j).innerHTML = data.articles[i].title;
				document.getElementById("news-a" + j).href = data.articles[i].url;
				document.getElementById("news-img-a" + j).href = data.articles[i].url;				
				document.getElementById("news-img" + j).src = data.articles[i].urlToImage;	
				document.getElementById("news-source" + j).innerHTML = data.articles[i].source.name;
				document.getElementById("news-text" + j).innerHTML = data.articles[i].description;
				document.getElementById("news-time" + j).innerHTML = dt.getFullYear() + "/" + dt.getMonth() + "/" + dt.getDate();					
	
				j++;
				console.log("j é: " + j);
			}
			
		});
	})

	.catch(function(err){ 
		console.error('Failed retrieving information', err);
	});

};
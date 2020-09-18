var urlUs = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&' +
		    'pageSize=15&' +
		    'page=1&' +
            'apiKey=0e87d15ebad2463b803afd25220483a5';
			
var urlBr = 'https://newsapi.org/v2/top-headlines?' +
            'country=br&' +
		    'pageSize=15&' +
		    'page=1&' +
            'apiKey=0e87d15ebad2463b803afd25220483a5';			

var urlS = 'http://newsapi.org/v2/everything?' +
           'q=Apple&' +
           'from=2020-09-18&' +
           'sortBy=popularity&' +
		   'pageSize=15&' +
		   'page=1&' +		   
           'apiKey=0e87d15ebad2463b803afd25220483a5';


function showNews(url){
		  
var req = new Request(url);
fetch(req)

	.then(function(response){
		response.json().then(function(data){ 

			console.log("Total de artigos: " + data.articles.length);			
			var i;
			var j = 1;
			var newsContainer = $('#news-container');
			console.log(newsContainer);
			newsContainer.empty();
			var newsRow;	
			
			for (i = 0; i < data.articles.length; i++){
				
				var newsImg = $('<img class="img-responsive img-thumbnail" alt="Foto">');
				var newsURL = $('<a target="_blank">');
				var newsTitle = $('<h2 class="title-news">');
				var newsSource = $('<h3 class="src-news">');
				var newsDate = $('<h6 class="time-news">');
				var newsDesc = $('<p align="justify">');
				
				var dt = new Date(data.articles[i].publishedAt);
				
				newsImg.attr('src', "img/goImg.jpg");
				newsImg.attr('src', data.articles[i].urlToImage);
				newsImg.attr('href', data.articles[i].url);				
				
				newsImg.error(function(){
					$(this).unbind("error").attr("src", "img/goImg.jpg");
				});
				
				newsURL.append(data.articles[i].title);
				newsURL.attr('href', data.articles[i].url);
				newsTitle.append(newsURL);
				
				newsSource.append(data.articles[i].source.name);
				newsDate.append(dt.getFullYear() + "/" + dt.getMonth() + "/" + dt.getDate());
				newsDesc.append(data.articles[i].description);
				
				var infoNews = $('<div class="info-news">');
				infoNews.append(newsTitle);
				infoNews.append(newsSource);	
				infoNews.append(newsDate);
				infoNews.append(newsDesc);	

				var newsImgURL = $('<a target="_blank">');
				newsImgURL.append(newsImg);			
				
				var itemNews = $('<div class="item-news">');
				itemNews.append(newsImgURL);
				itemNews.append(infoNews);

				var newsLine = $('<hr class="bd-line">');	
				
				var newsColumn = $('<div class="col-lg-4 col-sm-6">');
				newsColumn.append(itemNews);
				newsColumn.append(newsLine);	
	
				if(i%3 == 0){
					newsRow = $('<div class="row">');					
				};
				
				newsRow.append(newsColumn);
				newsContainer.append(newsRow);
				
			}
			
		});
	})

	.catch(function(err){ 
		console.error('Failed retrieving information', err);
	});

};

window.onload = showNews(urlUs);


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
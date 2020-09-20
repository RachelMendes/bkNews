var baseUrl = 'https://newsapi.org/v2';
var apiKeyVal = '0e87d15ebad2463b803afd25220483a5';

var urlUs = baseUrl + '/top-headlines?' +
            'country=us&' +
		    'pageSize=15&' +
            'apiKey=' + apiKeyVal;
			
var urlBr = baseUrl + '/top-headlines?' +
            'country=br&' +
		    'pageSize=15&' +
            'apiKey=' + apiKeyVal;

var urlS = baseUrl + '/everything?' +
	'from=2020-09-18&' +
	'sortBy=popularity&' +
	'pageSize=15&' +		   
	'apiKey=' + apiKeyVal;
	
var urlApp = 'http://localhost/bk-news/index.html';	

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
 
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
 
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function showNews(url){
	var req = new Request(url);
	fetch(req).then(function(response){
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
				newsDate.append(dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear());
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
	}).catch(function(err){ 
		console.error('Failed retrieving information', err);
	});
};	

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function getPaginaAtual(){
	var paginaAtual = getUrlParameter('page');
	if(paginaAtual === undefined){
		paginaAtual = 1;
	} else {
		paginaAtual = parseInt(paginaAtual);
	}
	return paginaAtual;
}

function pagNews(){	
	var i;
	var pagUl = $('#ul-pages');
	var paginaAtual = getPaginaAtual();
	console.log(pagUl);
	var urlAtual = (' ' + window.location).slice(1);	
	console.log("urlAtual: " + urlAtual);	
	for (i = paginaAtual; i < paginaAtual+5; i++){
		console.log("i= " + i);
		var pagLi = $('<li class="page-item">');	
		var pagLiA = $('<a class="page-link">');
		pagLiA.attr('href', urlApp + '?page=' + i);
		pagLiA.append(i);
		pagLi.append(pagLiA);
		pagUl.append(pagLi);
	}
}

window.onload = function () {	
	$("#form-search").submit(function(e) {
		e.preventDefault();
		var inputSearch = $('#news-s');
		var tmpUrl = urlS + '&q=' + inputSearch.val();
		showNews(tmpUrl);
	});
	var paginaAtual = getPaginaAtual();
	urlUs += '&page=' + paginaAtual;	
	showNews(urlUs);
	pagNews();
};
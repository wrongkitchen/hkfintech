$(document).ready(function(){
	
	$("#compact-pagination").pagination({
	    items: 100,
	    itemsOnPage: 10,
	    cssStyle: 'light-theme',
	    prevText: '<',
	    nextText: '>'
	});
	
});

var onGoogleLoad = function() {
    gapi.client.setApiKey('AIzaSyA7Ef3qq3w7VWCjA1w64QQZmmqGziZdO5Q');
    gapi.client.load('youtube', 'v3', function() {

        var request = gapi.client.youtube.playlistItems.list({
            part: 'snippet',
            playlistId: 'PLLzELPLbK7GmPVkwxLcxM87q3U9u0KJxD',
            maxResults: 50
        });

        request.execute(function(response) {
            parseData(response, 3);
        });
    });
};

var parseData = function(pObj, pHighlight){
    var highlightNum = pHighlight;
    var html = '';
    var $target = $('.video-gallery-container');
    var highlightTemplate = Handlebars.compile($("#highlight-video").html());
    var normalTemplate = Handlebars.compile($("#normal-video").html());

    for (var i = 0; i < pObj.items.length; i++) {
        console.log(pObj.items[i]);
        var title = pObj.items[i].snippet.title;
        var thumbnail = pObj.items[i].snippet.thumbnails.medium.url;
        var date = pObj.items[i].snippet.publishedAt;
        var id = pObj.items[i].snippet.resourceId.videoId;
        var param = { title:title, thumbnail:thumbnail, date: date, id:id };
        if(highlightNum > 0){
            html += highlightTemplate(param)
            highlightNum -= 1;
        } else {
            html += normalTemplate(param);
        }
        // console.log(pObj.items[i].snippet.title + " published at " + pObj.items[i].snippet.publishedAt)
    }
    $target.html(html);
};
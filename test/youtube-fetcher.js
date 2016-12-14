var onGoogleLoad = function() {
    gapi.client.setApiKey('AIzaSyA7Ef3qq3w7VWCjA1w64QQZmmqGziZdO5Q');
    gapi.client.load('youtube', 'v3', function() {

        var request = gapi.client.youtube.playlistItems.list({
            part: 'snippet',
            playlistId: 'PLLzELPLbK7GmPVkwxLcxM87q3U9u0KJxD',
            maxResults: 50
        });

        request.execute(function(response) {
            for (var i = 0; i < response.items.length; i++) {
                var title = response.items[i].snippet.title;
                var thumbnail = response.items[i].snippet.thumbnails.medium.url;
                $('body').append('<img src="' + thumbnail + '" alt=""/>');
                // console.log(response.items[i].snippet.title + " published at " + response.items[i].snippet.publishedAt)
            }
        });
    });
}
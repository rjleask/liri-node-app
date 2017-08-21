
    var command = process.argv[2];
    var fs = require('fs');
    var categoryInput = '';
    var arg = process.argv;
    for (var i = 3; i < arg.length; i++) {
        categoryInput += (arg[i] + ' ');
    }
    mainCommand();
    // commands that trigger the proper api call
    function mainCommand() {
        switch (command) {
            case 'my-tweets':
                goTwitterGo();
                break;
            case 'spotify-this-song':
                spotifySongData();
                break;
            case 'movie-this':
                movieDatabase();
                break;
            case 'do-what-it-says':
                grabRandomTxtData();
        }
    }

    function goTwitterGo() {
        var keys = require('./keys.js');
        var Twit = require('twit');
        var T = new Twit(keys.twitterKeys);
        var params = {
            screen_name: 'JsportsJim',
            count: 10
        }
        T.get('statuses/user_timeline', params, callBackData);

        function callBackData(err, data, response) {
            for (var i = 0; i < data.length; i++) {
                console.log('TWEET: ' + data[i].text, '\nTIME TWEETED: ' + data[i].created_at);
                console.log('////////////////////////////////////////////////////');
                logData('TWEET: ' + data[i].text, '\nTIME TWEETED: ' + data[i].created_at);
                logData('////////////////////////////////////////////////////');
            }
        }
    }


    function spotifySongData() {
        var Spotify = require('node-spotify-api');
        var spotify = new Spotify({
            id: '6aa884ff33c4481986e88eab81c92450',
            secret: '5aec3c65dc7c4d98a08ea0c4986852a6'
        });
        // if the user doesnt have an input default to The Sign
        if (categoryInput === '') {
            spotify.search({ type: 'track', query: 'The Sign ace of base', limit: 5 }, function(err, track) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var itemsArr = track.tracks.items;
                for (var i = 0; i < track.tracks.items.length; i++) {
                    console.log('ALBUM: ' + itemsArr[i].album.name, '\nARTIST: ' + itemsArr[i].album.artists[0].name, '\nSONG: ' + itemsArr[i].name, '\nLINK: ' + itemsArr[i].preview_url);
                    console.log('////////////////////////////////////////////////////');
                    logData('ALBUM: ' + itemsArr[i].album.name, '\nARTIST: ' + itemsArr[i].album.artists[0].name, '\nSONG: ' + itemsArr[i].name, '\nLINK: ' + itemsArr[i].preview_url);
                    logData('////////////////////////////////////////////////////');
                }
            });
            // takes in the users search and outputs 5 of the closest search returns
        } else {
            spotify.search({ type: 'track', query: categoryInput, limit: 5 }, function(err, track) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var itemsArr = track.tracks.items;
                for (var i = 0; i < track.tracks.items.length; i++) {
                    console.log('ALBUM: ' + itemsArr[i].album.name, '\nARTIST: ' + itemsArr[i].album.artists[0].name, '\nSONG: ' + itemsArr[i].name, '\nLINK: ' + itemsArr[i].preview_url);
                    console.log('////////////////////////////////////////////////////');
                    logData('ALBUM: ' + itemsArr[i].album.name, '\nARTIST: ' + itemsArr[i].album.artists[0].name, '\nSONG: ' + itemsArr[i].name, '\nLINK: ' + itemsArr[i].preview_url);
                    logData('////////////////////////////////////////////////////');
                }
            });
        }
    }


    function movieDatabase() {
        var request = require('request');
        var queryUrl;
        if (categoryInput === '') {
            queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=40e9cece";
            request(queryUrl, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                	console.log("The movie name: " + JSON.parse(body).Title);
                    console.log("The movie year: " + JSON.parse(body).Year);
                    console.log("The IMDB rating: " + JSON.parse(body).imdbRating);
                    console.log("Made in: " + JSON.parse(body).Country);
                    console.log("The language: " + JSON.parse(body).Language);
                    console.log("The Plot: " + JSON.parse(body).Plot);
                    console.log("The cast: " + JSON.parse(body).Actors);
                    logData("The movie name: " + JSON.parse(body).Title);
                    logData("The movie year: " + JSON.parse(body).Year);
                    logData("The IMDB rating: " + JSON.parse(body).imdbRating);
                    logData("Made in: " + JSON.parse(body).Country);
                    logData("The language: " + JSON.parse(body).Language);
                    logData("The Plot: " + JSON.parse(body).Plot);
                    logData("The cast: " + JSON.parse(body).Actors);
                }
            });
        } else {
            queryUrl = "http://www.omdbapi.com/?t=" + categoryInput + "&y=&plot=short&apikey=40e9cece";
            request(queryUrl, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                		console.log("The movie name: " + JSON.parse(body).Title);
                    console.log("The movie year: " + JSON.parse(body).Year);
                    console.log("The IMDB rating: " + JSON.parse(body).imdbRating);
                    console.log("Made in: " + JSON.parse(body).Country);
                    console.log("The language: " + JSON.parse(body).Language);
                    console.log("The Plot: " + JSON.parse(body).Plot);
                    console.log("The cast: " + JSON.parse(body).Actors);
                    logData("The movie name: " + JSON.parse(body).Title);
                    logData("The movie year: " + JSON.parse(body).Year);
                    logData("The IMDB rating: " + JSON.parse(body).imdbRating);
                    logData("Made in: " + JSON.parse(body).Country);
                    logData("The language: " + JSON.parse(body).Language);
                    logData("The Plot: " + JSON.parse(body).Plot);
                    logData("The cast: " + JSON.parse(body).Actors);
                }
            });
        }
    }

    function grabRandomTxtData() {
        var fs = require('fs');
        fs.readFile('random.txt', 'utf8',
            function(error, data) {
                if (error) {
                    console.log(error);
                }
                var dataArr = data.split(',');
                command = dataArr[0];
                categoryInput = dataArr[1];
                mainCommand();
            });

    }

            function logData(keyword) {
            	// console.log(keyword);
        fs.appendFile('log.txt', keyword + '\r\n', function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }

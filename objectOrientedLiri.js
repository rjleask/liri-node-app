var liriBot = function() {
    this.command = process.argv[2];
    this.fs = require('fs');
    this.categoryInput = '';
    this.arg = process.argv;
    var base = this;
    for (var i = 3; i < this.arg.length; i++) {
        this.categoryInput += (this.arg[i] + ' ');
    }
     // appends the data to the txt file
    this.logData = function(keyword) {
        // console.log(keyword);
        this.fs.appendFile('log.txt', keyword + '\r\n', function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
    this.goTwitterGo = function() {
        this.keys = require('./keys.js');
        this.Twit = require('twit');
        this.T = new this.Twit(this.keys.twitterKeys);
        this.params = {
            screen_name: 'JsportsJim',
            count: 10
        }
        this.T.get('statuses/user_timeline', this.params, this.callBackData);

        this.callBackData = function(err, data, response) {
            for (var i = 0; i < data.length; i++) {
                console.log('TWEET: ' + data[i].text, '\nTIME TWEETED: ' + data[i].created_at);
                console.log('////////////////////////////////////////////////////');
                base.logData('TWEET: ' + data[i].text, '\nTIME TWEETED: ' + data[i].created_at);
                base.logData('////////////////////////////////////////////////////');
            }
        }
    }


    this.spotifySongData = function() {
        var Spotify = require('node-spotify-api');
        var spotify = new Spotify({
            id: '6aa884ff33c4481986e88eab81c92450',
            secret: '5aec3c65dc7c4d98a08ea0c4986852a6'
        });
        // if the user doesnt have an input default to The Sign
        if (this.categoryInput === '') {
            spotify.search({ type: 'track', query: 'The Sign ace of base', limit: 5 }, function(err, track) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var itemsArr = track.tracks.items;
                for (var i = 0; i < track.tracks.items.length; i++) {
                    console.log('ALBUM: ' + itemsArr[i].album.name, '\nARTIST: ' + itemsArr[i].album.artists[0].name, '\nSONG: ' + itemsArr[i].name, '\nLINK: ' + itemsArr[i].preview_url);
                    console.log('////////////////////////////////////////////////////');
                    base.logData('ALBUM: ' + itemsArr[i].album.name, '\nARTIST: ' + itemsArr[i].album.artists[0].name, '\nSONG: ' + itemsArr[i].name, '\nLINK: ' + itemsArr[i].preview_url);
                    base.logData('////////////////////////////////////////////////////');
                }
            });
            // takes in the users search and outputs 5 of the closest search returns
        } else {
            spotify.search({ type: 'track', query: this.categoryInput, limit: 5 }, function(err, track) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var itemsArr = track.tracks.items;
                for (var i = 0; i < track.tracks.items.length; i++) {
                    console.log('ALBUM: ' + itemsArr[i].album.name, '\nARTIST: ' + itemsArr[i].album.artists[0].name, '\nSONG: ' + itemsArr[i].name, '\nLINK: ' + itemsArr[i].preview_url);
                    console.log('////////////////////////////////////////////////////');
                    base.logData('ALBUM: ' + itemsArr[i].album.name, '\nARTIST: ' + itemsArr[i].album.artists[0].name, '\nSONG: ' + itemsArr[i].name, '\nLINK: ' + itemsArr[i].preview_url);
                    base.logData('////////////////////////////////////////////////////');
                }
            });
        }
    }


    this.movieDatabase = function() {
        var request = require('request');
        var queryUrl;
        // logs to the console the different movie stats, then appends it to log.txt file
        if (this.categoryInput === '') {
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
                    base.logData("The movie name: " + JSON.parse(body).Title);
                    base.logData("The movie year: " + JSON.parse(body).Year);
                    base.logData("The IMDB rating: " + JSON.parse(body).imdbRating);
                    base.logData("Made in: " + JSON.parse(body).Country);
                    base.logData("The language: " + JSON.parse(body).Language);
                    base.logData("The Plot: " + JSON.parse(body).Plot);
                    base.logData("The cast: " + JSON.parse(body).Actors);
                }
            });
        } else {
            queryUrl = "http://www.omdbapi.com/?t=" + this.categoryInput + "&y=&plot=short&apikey=40e9cece";
            request(queryUrl, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log("The movie name: " + JSON.parse(body).Title);
                    console.log("The movie year: " + JSON.parse(body).Year);
                    console.log("The IMDB rating: " + JSON.parse(body).imdbRating);
                    console.log("Made in: " + JSON.parse(body).Country);
                    console.log("The language: " + JSON.parse(body).Language);
                    console.log("The Plot: " + JSON.parse(body).Plot);
                    console.log("The cast: " + JSON.parse(body).Actors);
                    base.logData("The movie name: " + JSON.parse(body).Title);
                    base.logData("The movie year: " + JSON.parse(body).Year);
                    base.logData("The IMDB rating: " + JSON.parse(body).imdbRating);
                    base.logData("Made in: " + JSON.parse(body).Country);
                    base.logData("The language: " + JSON.parse(body).Language);
                    base.logData("The Plot: " + JSON.parse(body).Plot);
                    base.logData("The cast: " + JSON.parse(body).Actors);
                }
            });
        }
    }

    this.grabRandomTxtData = function() {
        this.fs.readFile('random.txt', 'utf8',
            function(error, data) {
                if (error) {
                    console.log(error);
                }
                var dataArr = data.split(',');
                this.command = dataArr[0];
                this.categoryInput = dataArr[1];
                this.mainCommand();
            });

    }

    // deals with the main console inputs
    this.mainCommand = function() {
        switch (this.command) {
            case 'my-tweets':
                this.goTwitterGo();
                break;
            case 'spotify-this-song':
                this.spotifySongData();
                break;
            case 'movie-this':
                this.movieDatabase();
                break;
            case 'do-what-it-says':
                this.grabRandomTxtData();
        }
    }
    base.mainCommand();
}
var myLiribot = new liriBot();
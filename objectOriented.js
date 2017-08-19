// var inquire = ('inquirer');
// var  DigitalPet = function(){
// 	this.hungry = false;
// 	this.sleepy = false;
// 	this.bored = true;
// 	this.age = 0;
// 	this.increaseAge = function(){
// 		this.age += 1;
// 		console.log("Happy birthday to me! im "+this.age);
// 	}
// 	this.feed = function(){
// 		if(this.hungry === true){
// 			console.log("That was delicious!");
// 			this.hungry = false;
// 			this.sleepy = true;
// 		}
// 		else{
// 			console.log('No thanks im full!');
// 		}
// 	}
// 	this.sleep = function(){
// 		if(this.sleepy === true){
// 			console.log("ZZzzz");
// 			this.sleepy = false;
// 			this.bored = true;
// 			this.increaseAge();
// 		}
// 		else{
// 			console.log("No way asshole! stop telling me what to do!");
// 		}
// 	}
// 	this.play = function(){
// 		if(this.bored === true){
// 			console.log("Yay lets play!");
// 			this.bored = false;
// 			this.hungry = true;
// 		}
// 		else{
// 			console.log('Not now, later?');
// 		}
// 	}
// }
// var dog = new DigitalPet();
// 	dog.outside = false;
// 	dog.bark = function(){
// 		console.log("Woof! woof!");
// 	}
// 	dog.goOutside = function(){
//          if(this.outside === false){
//          	console.log("yay! i love the outdoors!");
//          	this.outside = true;
//          	this.bark();
//          }
//          else{
//             console.log("We're already outside though");
//          }
// 	}
// 	dog.goInside = function(){
// 		if(this.outside === true){
// 			console.log("Do we have to? fine...");
// 			this.outside = false;
// 		}
// 		else{
// 			console.log("im already inside");
// 		}
// 	}

// var cat = new DigitalPet();
// 	cat.houseCondition = 100;
// 	cat.meow = function(){
// 		console.log("meow meow!");
// 	}
// 	cat.destroyFurniture = function(){
// 		if(cat.houseCondition === 0){
// 			console.log("broken house...bummer");
// 		}
// 		else{
// 		cat.houseCondition = cat.houseCondition - 10;
// 		console.log('Muahahahah');
// 		this.bored = false;
// 		this.sleepy = true;
// 	}
// 	}
// 	cat.buyNewFurniture = function(){
// 		cat.houseCondition += 50;
// 		console.log(cat.houseCondition);
// 		console.log("Arre you sure about that?");
// 	}
// 	console.log(dog.goInside());
// 	console.log(cat.buyNewFurniture());
   var liriBot = function(){
    this.command = process.argv[2];
    this.fs = require('fs');
    this.categoryInput = '';
    this.arg = process.argv;
    for (var i = 3; i < arg.length; i++) {
        this.categoryInput += (this.arg[i] + ' ');
    }
    this.mainCommand();
    // commands that trigger the proper api call
    this.mainCommand = function() {
        switch (command) {
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

    this.goTwitterGo = function() {
        this.keys = require('./keys.js');
        this.Twit = require('twit');
        this.T = new Twit(keys.twitterKeys);
        this.params = {
            screen_name: 'JsportsJim',
            count: 10
        }
        T.get('statuses/user_timeline', this.params, this.callBackData);

        function callBackData(err, data, response) {
            for (var i = 0; i < data.length; i++) {
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
            	console.log(keyword);
        fs.appendFile('log.txt', keyword + '\r\n', function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }


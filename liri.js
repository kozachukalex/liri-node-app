require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");

//The require on this file allows the exported information to be pulled to here.
var keys = require("./keys.js")

console.log(keys);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

if (!command) {
  console.log("You must enter a command");
} else {
  if (command === "my-tweets") {
    getTweets();
  };

  if (command === "spotify-this-song") {
    var song = process.argv[3];
    if (!song) {
      song = "The Sign"
    }
    searchSpotify(song);
  };

  if (command === "movie-this") {
    var movie = process.argv[3];

    if (!movie) {
      movie = "Mr Nobody"
    }
    searchOmdb(movie);
  }

  if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
        return console.log(error);
      }
      console.log(data);
      var dataArr = data.split(",");
      console.log(dataArr);
      if (dataArr[0] === "spotify-this-song") {
        searchSpotify(dataArr[1])
      }
      if (dataArr[0] === "movie-this") {
        searchOmdb(dataArr[1]);
      }
      if (dataArr[0] === "my-tweets") {
        getTweets();
      }
    });

  }
};

function getTweets() {
  var params = { screen_name: 'The_KamiKozy' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      tweets.forEach(function (data) {
        console.log("------------------------------------------------------------------------------------");
        console.log(data.text);
      });
    } else {
      console.log(error);
    }
  });
}
function searchOmdb(movie) {
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    // If there were no errors and the response code is 200 (meaning it was a success)
    if (!error && response.statusCode === 200) {
      console.log("------------------------------------------------------")
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("Rated: " + JSON.parse(body).Rated);
      // console.log(JSON.parse(body).ratings.source['rotten tomatoes']);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("------------------------------------------------------");
    }
  });
}
function searchSpotify(song) {
  spotify.search({ type: 'track', query: song, limit: 5 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (i = 0; i < data.tracks.items.length; i++) { }
    consoleLogSpotify(data);
  });

}
function consoleLogSpotify(data) {
  for (i = 0; i < data.tracks.items.length; i++) {
    var currentItem = data.tracks.items[i];
    console.log("----------------------------------------")
    for (a = 0; a < currentItem.artists.length; a++) {
      if (a == 0) {
        console.log("Artist: " + currentItem.artists[a].name);
      } else {
        console.log(currentItem.artists[a].name);
      }
    }
    console.log("Song: " + currentItem.name);
    console.log("Album: " + currentItem.album.name);
  }
}
require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

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
  };

  if (command === "spotify-this-song") {
    var song = process.argv[3];
    if (!song) {
      song = "The Sign"
    }
    console.log(song);
    spotify.search({ type: 'track', query: song }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("-------------------------------------------------")
      console.log(data.tracks.items[0].artists);
      // printSpotify(data);

    });

  };
};

function printSpotify(data) {
  for (var i = 0; i < data.tracks.items.length; i++) {
    var currentItem = data.tracks.items[i];
    console.log("----------------------------------------")
    console.log(currentItem)

  }
}
// <-- SETUP NODE PACKAGES & GLOBALS -->
// Require process.env variables
require("dotenv").config();
// Store API keys sent from .env file
var keys = require("./keys.js");
// Require node-spotify-api
var Spotify = require("node-spotify-api");
// Create spotify credentials object
var spotify = new Spotify(keys.spotify);
// Require Axios
var axios = require("axios");
// Require moment
var moment = require("moment");
// Require node file system
var fs = require("fs");
// Divider string
var divider = "\n======================================================\n";
// ________________________________________________________________________

// <-- STORE COMMAND LINE ARGUMENTS -->
var args = process.argv.slice(2);
var command = args[0];
var query = args.slice(1).join(" ");
// ________________________________________________________________________

// <-- CALL MAIN FUNCTION -->
commandSelect(command, query);
// ________________________________________________________________________

// <-- COMMAND SELECT -->
function commandSelect(cmd, arg) {
  switch (cmd) {
    // Concert function
    case "concert":
      concert(arg);
      break;

    // Song function
    case "song":
      if (arg == "") {
        // default to "The Sign" by Ace of Base
        arg = "The Sign - Ace of Base";
      }
      song(arg);
      break;

    // Movie function
    case "movie":
      if (arg == "") {
        // default to "Mr. Nobody"
        arg = "Mr. Nobody";
      }
      movie(arg);
      break;

    // Read-in function from random.txt
    case "readCommand":
      readCommand();
      break;

    // No command or invalid command
    default:
      console.log(divider);
      console.log("Invalid command, possible commands are:\n");
      console.log("   concert <query>");
      console.log("   song <query>");
      console.log("   movie <query>");
      console.log("   readCommand\n");
      console.log("For Example:\n");
      console.log("   node liri.js song Blood ANIMA!");
      console.log(divider);
  }
}
// ________________________________________________________________________

// <-- LIRI COMMANDS -->

// 1. concert
function concert(query) {
  url =
    "https://rest.bandsintown.com/artists/" +
    query +
    "/events?app_id=codingbootcamp";
  axios
    .get(url)
    .then(function(response) {
      // parse data from response
      var data = response.data;
      for (i = 0; i < data.length; i++) {
        var concert = data[i];
        var venue = concert.venue;
        var venueName = venue.name;
        var location = [venue.city, venue.country];
        var datetime = concert.datetime;
        var date = moment(datetime, moment.ISO_8601).format(
          "dddd MMMM Do, YYYY"
        );
        // print data
        console.log(divider);
        console.log("Venue: " + venueName);
        console.log("In: " + location.join(", "));
        console.log("On: " + date + "\n");
        console.log(divider);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

// 2. song
function song(query) {
  spotify.search(
    {
      type: "track",
      query: query,
      limit: 1
    },
    function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      // parse data from response
      var songData = data.tracks.items[0];
      var artistsArr = [];
      for (i = 0; i < songData.artists.length; i++) {
        artistsArr.push(songData.artists[i].name);
      }
      var artists = artistsArr.join(", ");
      var name = songData.name;
      var preview_url = songData.preview_url;
      var album = songData.album.name;
      // print data
      console.log(divider);
      console.log("Song: " + name);
      console.log("Artist(s): " + artists);
      console.log("Album: " + album);
      console.log("Preview URL: " + preview_url);
      console.log(divider);
    }
  );
}

// 3. movie
function movie(query) {
  url = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
  axios
    .get(url)
    .then(function(response) {
      // parse data from response
      var movie = response.data;
      var title = movie.Title;
      var released = movie.Released;
      var IMDB = movie.Ratings[0].Value;
      var RT = movie.Ratings[1].Value;
      var country = movie.Country;
      var language = movie.Language;
      var plot = movie.Plot;
      var actors = movie.Actors;
      // print data
      console.log(divider);
      console.log("Title: " + title + "\n");
      console.log("Released: " + released + "\n");
      console.log("Internet Movie Database Rating: " + IMDB);
      console.log("Rotten Tomatoes Rating: " + RT + "\n");
      console.log("Country of Production: " + country);
      console.log("Language(s): " + language + "\n");
      console.log("Plot Summary: " + "\n\n" + plot + "\n");
      console.log("Actors: " + actors + "\n");
      console.log(divider);
    })
    .catch(function(error) {
      console.log(error);
    });
}

// 4. readCommand
function readCommand() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    cmd = data.split(",")[0];
    arg = data.split(",")[1];
    // call command select recursively
    commandSelect(cmd, arg);
  });
}
// ________________________________________________________________________

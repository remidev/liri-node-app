// --------------------------------------------
// <-- Setup API Keys -->

// Require process.env variables
require("dotenv").config();

// Store keys sent from .env file
var keys = require("./keys.js");

console.log("Keys :", keys);

// --------------------------------------------
// <-- Store & Log Command Line Arguments -->

cli = process.argv.slice(2);
console.log(cli);

// --------------------------------------------
// <-- LIRI Commands -->

// concert-this <artist or band>

// Query bands in town api via axios
// return:
// name of venue
// venue location
// date of event (moment.js) MM/DD/YYYY
// default functionality left open...
// return syntax explanation
// return sample query of trending event

// spotify-this-song <title>
// Query spotify api via node package
// return:
// artist(s)
// title
// link to spotify preview
// album

// movie-this <title>

// Query OMDB via axios
// return:
// title
// release year
// IMDB rating
// rotten tomatoes rating
// country of production
// language
// plot
// actors

// do-what-it-says

// Read command from random.txt file
// via fs node package

/*  LIRI Bot PseudoCode

    1. node liri.js <command> <query> 
        - parse command line arguments
        - format and store command & query

    2. pass query as argument to selected command
        - command(query)

    3. command function queries relevant API 
        - concert(query)
          - Axios -> Bands in Town

        - spotify(query) 
          - Node -> Spotify

        - movie(query) 
          - Axios -> Open Movie Database

        - do-what-it-says
          - use fs to read command from random.txt

    4. parse response object

    5. format response data 

    5. console.log data 

    6. write command, query & result to log.text


  
*/

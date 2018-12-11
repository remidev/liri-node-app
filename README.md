# LIRI Bot

##Language Interpretation and Recognition Interface

##Project Description:

A command line NodeJS application with 3 commands to query API's and return information via console logs

##Usage:

To use LIRI, open a terminal or bash interface, navigate to the directory containing LIRI, then type node liri followed by a command and a query.

If you want to see a list of possible commands and syntax as well as an example, simply type node liri and hit enter.

##Commands:

Running the program without inputting a command will log a list of possible commands and an example.

![No command](LIRI-0.gif)

###Concert

The concert command queries the Bands in Town API via the Axios node package and returns a list of events based on the query.

![Concert command](LIRI-1.gif)

##Song

The song command queries the Spotify API via the node-spotify-api Node package. It returns information about the song that most closely matches the query.

###Note:

This command will not function unless after cloning the repository you create your own .env file and add to it your own spotify API credentials.

![Song command](LIRI-2.gif)

#Movie

The movie command queries the Open Movie Database API, again via Axios. It returns information related the the film that most closely matches the query.

![Movie command](LIRI-3.gif)

#Read

The read command uses the node file system package to read the contents of the random.txt file included in the repository. It relies on the content of the file being formated as command,query.

![Read command](LIRI-4.gif)

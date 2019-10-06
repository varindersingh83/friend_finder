// Dependencies
// =============================================================
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

// Sets up the Express App
// =============================================================
var app = express()
var PORT = 3000 //process.env.PORT

// Sets up bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// // Routes
// // =============================================================
require('./routes/api_route.js')(app)
require('./routes/html_route.js')(app)

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log('App listening on localhost:' + PORT)
})

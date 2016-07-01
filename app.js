/**
 * @overview 	Main Server File
 * @module app
 * @author Dominik Sigmund
 * @version 0.5
 * @description	Starts the Server and keeps it running
 * @memberof verbshaker
 */

// Require needed modules
require('nice-console')(console)
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var pack = require('./package.json')
var favicon = require('serve-favicon')
var ProverbCollection = require('./libs/proverbCollection.js')

// Send public and docs
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/doc'))

// Create Proverb-Service
var proverbCollection = new ProverbCollection(pack.config.proverbs, function (err) {
  if (err) {
    console.error(err)
  } else {
    // Listen to Port
    server.listen(pack.config.port)

    // Server favicon
    app.use(favicon(__dirname + '/public/images/favicon.ico'))

    // Routes
    require('./routes')(app, proverbCollection)

    // catches ctrl+c event
    process.on('SIGINT', exitHandler)
    // catches uncaught exceptions
    process.on('uncaughtException', function (err) {
      console.error(err)
      exitHandler(null, err)
    })
    // keep running
    process.stdin.resume()
  }
})
/** Handles exitEvents by destroying bibles first
* @param {object} options - Some Options
* @param {object} err - An Error Object
*/
function exitHandler (options, err) {
  console.log('Exiting...')
  process.exit()
}
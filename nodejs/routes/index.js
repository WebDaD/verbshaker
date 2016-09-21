/**
 * @overview 	Route Index File
 * @module index
 * @author Dominik Sigmund
 * @version 1.0
 * @description	Exports all Routes
 * @memberof verbshaker
 */
var fs = require('fs')
/** Exports Routes
* @param {object} app - Express app
* @param {object} proverbCollection - proverbCollection Object
*/
module.exports = function (app, proverbCollection, imageGenerator, config, fontManager) {
  // Load Verb Routes
  require('./proverbs.js')(app, proverbCollection, imageGenerator)

  // Sends status information
  app.get('/status', function (req, res) {
    res.status(200).send({status: 'running'})
  })
  // Sends config
  app.get('/config', function (req, res) {
    res.status(200).send(config)
  })
  // Sends avaiable Fonts
  app.get('/fonts', function (req, res) {
    fontManager.getAvailableFonts(function (fonts) {
      res.status(200).send(fonts)
    })
  })
  // Get font by Name
  app.get('/fonts/:postscriptName.ttf', function (req, res) {
    fontManager.findFont({postscriptName: req.params.postscriptName}, function (font) {
      if (req.params.postscriptName !== font.postscriptName) {
        return res.status(404).send('Font not Found')
      } else {
        fs.readFile(font.path, function (err, data) {
          if (err) {
            return res.status(404).send(err)
          } else {
            return res.status(200).send(data)
          }
        })
      }
    })
  })
  // Get font-face css-file by Name
  app.get('/css/:postscriptName.css', function (req, res) {
    fontManager.findFont({postscriptName: req.params.postscriptName}, function (font) {
      if (req.params.postscriptName !== font.postscriptName) {
        return res.status(404).send('Font not Found')
      } else {
        var content = '@font-face {font-family: "' + font.postscriptName + '";src: url("/fonts/' + font.postscriptName + '.ttf")  format("truetype");}'
        res.writeHead(200, {'Content-Type': 'text/css'})
        res.write(content, 'utf8')
        res.end()
      }
    })
  })
  /** Middleware to Catch Errors
  * @param {object} err - Express.err Object
  * @param {object} req - Express.req Object
  * @param {object} res - Express.res Object
  * @param {object} next - Express.next Object
  * @returns {undefined}
  */
  app.use(function (err, req, res, next) {
    console.error(err)
  })
}

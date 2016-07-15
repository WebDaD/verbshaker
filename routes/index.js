/**
 * @overview 	Route Index File
 * @module index
 * @author Dominik Sigmund
 * @version 1.0
 * @description	Exports all Routes
 * @memberof verbshaker
 */

/** Exports Routes
* @param {object} app - Express app
* @param {object} proverbCollection - proverbCollection Object
*/
module.exports = function (app, proverbCollection, imageGenerator, config) {
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

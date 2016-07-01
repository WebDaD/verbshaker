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
module.exports = function (app, proverbCollection) {
  // Load Bible Routes
  require('./proverbs.js')(app, proverbCollection)

  // Sends status information
  app.get('/status', function (req, res) {
    // TODO: send status
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

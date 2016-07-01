/**
 * @overview 	Route Proverbs File
 * @module index
 * @author Dominik Sigmund
 * @version 1.0
 * @description	Exports proverb Related Routes
 * @memberof verbshaker
 */

/** Exports Routes
* @param {object} app - Express app
* @param {object} proverbCollection - proverbCollection Object
*/
module.exports = function (app, proverbCollection) {
  app.get('/api/languages', function (req, res) {
    proverbCollection.languages(function (error, languages) {
      if (error) {
        res.status(500).send(error)
      } else {
        res.status(200).send(languages)
      }
    })
  })
  app.get('/api/random', function (req, res) {
    // TODO return fullRandom
  })
  app.get('/api/:language', function (req, res) {
    // TODO return all proverbs for language
  })
  app.get('/api/:language/random', function (req, res) {
    // TODO return random shaken proverb for language
  })
}

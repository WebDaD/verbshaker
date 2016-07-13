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
        res.status(error.status).send(error)
      } else {
        res.status(200).send(languages)
      }
    })
  })
  app.get('/api/random', function (req, res) {
    proverbCollection.fullRandom(function (error, verb) {
      if (error) {
        res.status(error.status).send(error)
      } else {
        res.status(200).send(verb)
      }
    })
  })
  app.get('/api/:language', function (req, res) {
    proverbCollection.all(req.params.language, function (error, verbs) {
      if (error) {
        res.status(error.status).send(error)
      } else {
        res.status(200).send(verbs)
      }
    })
  })
  app.get('/api/:language/random', function (req, res) {
    proverbCollection.random(req.params.language, function (error, verb) {
      if (error) {
        res.status(error.status).send(error)
      } else {
        res.status(200).send(verb)
      }
    })
  })
}

/**
 * @overview 	Collection of Proverb-Objects
 * @module proverbCollection
 * @author Dominik Sigmund
 * @version 0.2
 * @description	Creates an Object. Has specific methods to show and manipulate data
 * @memberof verbshaker
 * @requires module:fs
 * @requires module:path
 * @requires module:async
 * @requires lib:proverbs
 */
var fs = require('fs')
var path = require('path')
var async = require('async')

/** Creates a instance of class ProverbCollection
 * @class ProverbCollection
 * @param {string} proverbpath - Path to Folder with csv proverbs
 * @param {Proverb} Proverb - Proverb-Class
 * @param {ProverbCollection~contructorCallback} callback - Called after all is done
 * @returns {object} The Working Collection Object
 * */
function ProverbCollection (proverbpath, Proverb, callback) {
  if (typeof callback !== 'function') {
    throw new Error('No Callback')
  } else {
    if (typeof Proverb === 'undefined') {
      callback({status: 501, message: 'No ProverbClass given'})
    } else {
      var self = this
      self.proverbpath = proverbpath
      self.proverbs = []
      self.languages = []
      fs.readdir(proverbpath, function (err, files) {
        if (err) {
          callback(err)
        } else {
          for (var i = 0; i < files.length; i++) {
            self.languages.push(files[i].replace('.csv', ''))
            files[i] = path.join(self.proverbpath, files[i])
          }
          if (files.length < 1) {
            callback({status: 404, message: 'No Proverbs in folder found given'})
          } else {
            async.map(files, Proverb, function (err, results) {
              if (err) {
                callback(err)
              } else {
                self.proverbs = results
                self.languages = languages
                self.languagesSync = languagesSync
                self.all = all
                self.allSync = allSync
                self.random = random
                self.randomSync = randomSync
                self.fullRandom = fullRandom
                self.fullRandomSync = fullRandomSync
                callback(null, self)
                return self
              }
            })
          }
        }
      })
    }
  }
}
/** Return all Languages
 * @param {ProverbCollection~languagesCallback} callback - A Callback with the language
 * @throws NoCallbackError
 * @returns Nothing
 * */
function languages (callback) {
  if (typeof callback !== 'function') {
    throw new Error('No Callback')
  } else {
    var l = returnLanguages(this.proverbs)
    if (l.length < 1) {
      callback({status: 404, message: 'No Languages Found'})
    } else {
      callback(null, l)
    }
  }
}
/** SYNC Return all Languages
 * @returns {array} Array of Langauges
 * */
function languagesSync () {
  return returnLanguages(this.proverbs)
}
/** SYNC Return all Languages
 * @param {array} proverbs - Array of Proverb-Objects
 * @returns {array} Array of Langauges
 * */
function returnLanguages (proverbs) {
  var languages = []
  for (var i = 0; i < proverbs.length; i++) {
    languages.push(proverbs[i].getLanguageSync())
  }
  return languages
}
/** Return all Proverbs for a Language
 * @param {string} language - Language to use
 * @param {ProverbCollection~allCallback} callback - A Callback with the proverbs
 * @throws NoCallbackError
 * @returns Nothing
 * */
function all (language, callback) {
  if (typeof callback !== 'function') {
    throw new Error('No Callback')
  } else {
    var proverbs = returnProverbs(this.proverbs, language)
    if (!proverbs || proverbs.length < 1) {
      callback({status: 404, message: 'No Proverbs for Language ' + language + ' Found'})
    } else {
      callback(null, proverbs)
    }
  }
}
/** SYNC Return all Proverbs for a Language
 * @param {string} language - Language to use
 * @returns {array} Array of Proverbs
 * */
function allSync (language) {
  return returnProverbs(this.proverbs, language)
}
/** SYNC Return all Proverbs for a Language
 * @param {array} proverbs - Array of Proverb-Objects
 * @param {string} language - Language to use
 * @returns {array} Array of Proverbs
 * */
function returnProverbs (proverbs, language) {
  for (var i = 0; i < proverbs.length; i++) {
    if (proverbs[i].language === language) {
      return proverbs[i].allSync()
    }
  }
  return null
}
/** Return a random Proverb for a Language
 * @param {string} language - Language to use
 * @param {ProverbCollection~randomCallback} callback - A Callback with the proverb
 * @throws NoCallbackError
 * @returns Nothing
 * */
function random (language, callback) {
  if (typeof callback !== 'function') {
    throw new Error('No Callback')
  } else {
    var proverb = returnRandom(this.proverbs, language)
    if (proverb == null) {
      callback({status: 404, message: 'No random Proverb for Language ' + language + ' Found'})
    } else {
      callback(null, proverb)
    }
  }
}
/** SYNC Return a random Proverb for a Language
 * @param {string} language - Language to use
 * @returns {object} the proverb
 * @returns {object.front} the front half of the proverb
 * @returns {object.back} the back half of the proverb
 * @returns {object.combined} the proverb
 * @returns {object.language} the language of the proverb
 * */
function randomSync (language) {
  return returnRandom(this.proverbs, language)
}
/** SYNC Return a random Proverb for a Language
 * @param {array} proverbs - Array of Proverb-Objects
 * @param {string} language - Language to use
 * @returns {object} the proverb
 * @returns {object.front} the front half of the proverb
 * @returns {object.back} the back half of the proverb
 * @returns {object.combined} the proverb
 * @returns {object.language} the language of the proverb
 * */
function returnRandom (proverbs, language) {
  for (var i = 0; i < proverbs.length; i++) {
    if (proverbs[i].language === language) {
      return proverbs[i].randomSync()
    }
  }
  return null
}
/** Return a random Proverb from any Language
 * @param {ProverbCollection~randomCallback} callback - A Callback with the proverb
 * @throws NoCallbackError
 * @returns Nothing
 * */
function fullRandom (callback) {
  if (typeof callback !== 'function') {
    throw new Error('No Callback')
  } else {
    var proverb = returnFullRandom(this.proverbs)
    if (proverb == null) {
      callback({status: 404, message: 'No full random Proverb  Found'})
    } else {
      callback(null, proverb)
    }
  }
}
/** SYNC Return a random Proverb from any Language
 * @returns {object} the proverb
 * @returns {object.front} the front half of the proverb
 * @returns {object.back} the back half of the proverb
 * @returns {object.combined} the proverb
 * @returns {object.language} the language of the proverb
 * */
function fullRandomSync () {
  return returnFullRandom(this.proverbs)
}
/** SYNC Return a random Proverb from any Language
 * @param {array} proverbs - Array of Proverb-Objects
 * @returns {object} the proverb
 * @returns {object.front} the front half of the proverb
 * @returns {object.back} the back half of the proverb
 * @returns {object.combined} the proverb
 * @returns {object.language} the language of the proverb
 * */
function returnFullRandom (proverbs) {
  var rnd = Math.floor(Math.random() * proverbs.length)
  for (var i = 0; i < proverbs.length; i++) {
    if (i === rnd) {
      return proverbs[i].randomSync()
    }
  }
  return null
}
module.exports = ProverbCollection
/**
  * This callback is displayed as part of the ProverbCollection class.
  * @callback ProverbCollection~contructorCallback
  * @param {object} Error or null
  * @param {object.status} Number of Error (Uses HTTP-Status)
  * @param {object.message} Custom Error Message
  * @param {ProverbCollection} Instance of Class ProverbCollection
  */
/**
  * This callback is displayed as part of the ProverbCollection class.
  * @callback ProverbCollection~languagesCallback
  * @param {object} Error or null
  * @param {object.status} Number of Error (Uses HTTP-Status)
  * @param {object.message} Custom Error Message
  * @param {array} Array of Languages
  */
/**
 * This callback is displayed as part of the ProverbCollection class.
 * @callback ProverbCollection~allCallback
 * @param {object} Error or null
 * @param {object.status} Number of Error (Uses HTTP-Status)
 * @param {object.message} Custom Error Message
 * @param {array} Array of Proverbs
 */
/**
 * This callback is displayed as part of the ProverbCollection class.
 * @callback ProverbCollection~randomCallback
 * @param {object} Error or null
 * @param {object.status} Number of Error (Uses HTTP-Status)
 * @param {object.message} Custom Error Message
 * @param {object} the proverb
 * @param {object.front} the front half of the proverb
 * @param {object.back} the back half of the proverb
 * @param {object.combined} the proverb
 * @param {object.language} the language of the proverb
 */

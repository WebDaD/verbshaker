/**
 * @overview 	Proverb-Object, contains all proverbs of a language
 * @module proverbs
 * @author Dominik Sigmund
 * @version 0.2
 * @description	Creates an Object. Has specific methods to show and manipulate data
 * @memberof verbshaker
 * @requires module:csv-parse
 * @requires module:fs
 * @requires module:path
 */

 /** Creates a instance of class Proverb
 * @class Proverb
 * @param {string} file - A path to a proverb.csv
 * @param {Proverb~contructorCallback} callback - A Callback with an error or the object
 * @returns {Proverb} The Object
 * */
function Proverb (file, callback) {
  if (typeof callback === 'undefined' || typeof callback !== 'function') {
    throw new Error({status: 501, message: 'Callback missing'})
  } else {
    var self = {}
    var parse = require('csv-parse')
    var fs = require('fs')
    var path = require('path')
    try {
      fs.accessSync(file, fs.F_OK)
      if (fs.statSync(file).isFile()) {
        fs.readFile(file, 'utf8', function (err, csv) {
          if (err) {
            return callback({status: 501, message: err})
          } else {
            parse(csv, {delimiter: ';', skip_empty_lines: true}, function (err, data) {
              if (err) {
                return callback({status: 501, message: err})
              } else {
                self.proverbs = data
                self.language = path.basename(file, '.csv')
                self.getLanguage = getLanguage
                self.getLanguageSync = getLanguageSync
                self.all = all
                self.allSync = allSync
                self.random = random
                self.randomSync = randomSync
                callback(null, self)
                return self
              }
            })
          }
        })
      } else {
        return callback({status: 501, message: file + ' is not a csv'})
      }
    } catch (e) {
      throw e
    }
  }
}
/** get the Language of the Object
 * @param {Proverb~languageCallback} callback - A Callback with the language
 * @throws NoCallbackError
 * @returns Nothing
 * */
function getLanguage (callback) {
  if (typeof callback !== 'function') {
    throw new Error('No Callback')
  } else {
    callback(null, this.language)
  }
}
/** SYNC get the Language of the Object
 * @returns {string} the Language of the Object
 * */
function getLanguageSync () {
  return this.language
}
/** get all proverbs of the Object
 * @param {Proverb~allCallback} callback - A Callback with the proverbs
 * @throws NoCallbackError
 * @returns Nothing
 * */
function all (callback) {
  if (typeof callback !== 'function') {
    throw new Error('No Callback')
  } else {
    if (this.proverbs.length > 0) {
      callback(null, this.proverbs)
    } else {
      callback({status: 404, message: 'No Proverbs Loaded'})
    }
  }
}
/** SYNC get all proverbs of the Object
 * @returns {array} Array of Proverbs
 * */
function allSync () {
  return this.proverbs
}
/** get a random proverb of the Object
 * @param {Proverb~randomCallback} callback - A Callback with the proverb
 * @throws NoCallbackError
 * @returns Nothing
 * */
function random (callback) {
  if (typeof callback !== 'function') {
    throw new Error('No Callback')
  } else {
    var pv = returnRandom(this.proverbs)
    if (pv != null) {
      pv.language = this.language
      callback(null, pv)
    } else {
      callback({status: 404, message: 'No random Proverb found'})
    }
  }
}
/** SYNC get a random proverb of the Object
 * @returns {object} the proverb
 * @returns {object.front} the front half of the proverb
 * @returns {object.back} the back half of the proverb
 * @returns {object.combined} the proverb
 * @returns {object.language} the language of the proverb
 * */
function randomSync () {
  var pv = returnRandom(this.proverbs)
  pv.language = this.language
  return pv
}
/** get a random proverb from the list
 * @param {array} proverbs - Array of Proverbs
 * @returns {object} the proverb
 * @returns {object.front} the front half of the proverb
 * @returns {object.back} the back half of the proverb
 * @returns {object.combined} the proverb
 * @returns {object.language} the language of the proverb
 * */
function returnRandom (proverbs) {
  if (proverbs.length > 0) {
    var rnd_front = Math.floor(Math.random() * (proverbs.length - 1 + 1)) + 0
    var rnd_back = Math.floor(Math.random() * (proverbs.length - 1 + 1)) + 0
    return {
      front: proverbs[rnd_front][0],
      back: proverbs[rnd_back][1],
      combined: proverbs[rnd_front][0] + ' ' + proverbs[rnd_back][1]
    }
  } else {
    return null
  }
}
module.exports = Proverb
/**
  * This callback is displayed as part of the Proverb class.
  * @callback Proverb~contructorCallback
  * @param {object} Error or null
  * @param {object.status} Number of Error (Uses HTTP-Status)
  * @param {object.message} Custom Error Message
  * @param {Proverb} Instance of Class Proverb
  */
/**
  * This callback is displayed as part of the Proverb class.
  * @callback Proverb~languageCallback
  * @param {object} Error or null
  * @param {object.status} Number of Error (Uses HTTP-Status)
  * @param {object.message} Custom Error Message
  * @param {string} Language
  */
/**
 * This callback is displayed as part of the Proverb class.
 * @callback Proverb~allCallback
 * @param {object} Error or null
 * @param {object.status} Number of Error (Uses HTTP-Status)
 * @param {object.message} Custom Error Message
 * @param {array} Array of Proverbs
 */
 /**
  * This callback is displayed as part of the Proverb class.
  * @callback Proverb~randomCallback
  * @param {object} Error or null
  * @param {object.status} Number of Error (Uses HTTP-Status)
  * @param {object.message} Custom Error Message
  * @param {object} the proverb
  * @param {object.front} the front half of the proverb
  * @param {object.back} the back half of the proverb
  * @param {object.combined} the proverb
  * @param {object.language} the language of the proverb
  */

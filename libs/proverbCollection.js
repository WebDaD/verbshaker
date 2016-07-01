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
var Proverbs = require('./proverbs.js')

/** Creates a instance of class Bibles
 * @class ProverbCollection
 * @param {string} proverbpath - Path to Folder with csv proverbs
 * @param {function} callback - Called after all is done
 * @returns {object} The Working Collection Object
 * */
function ProverbCollection (proverbpath, callback) {
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
      async.map(files, Proverbs, function (err, results) {
        if (err) {
          callback(err)
        } else {
          self.proverbs = results
          callback(null, self)
        }
      })
    }
  })
}
ProverbCollection.prototype.languages = function (callback) {
  // TODO: return all languages
}
ProverbCollection.prototype.languagesSync = function () {
  // TODO: return all languages SYNC
}
ProverbCollection.prototype.all = function (language, callback) {
  // TODO: return all proverbs for language
}
ProverbCollection.prototype.allSync = function (language) {
  // TODO: return all proverbs for language SYNC
}
ProverbCollection.prototype.random = function (language, callback) {
  // TODO: return random shaken Proverb for language
}
ProverbCollection.prototype.randomSync = function (language) {
  // TODO: return random shaken Proverb for language SYNC
}
ProverbCollection.prototype.fullRandom = function (callback) {
  // TODO: return random shaken Proverb for a random language
}
ProverbCollection.prototype.fullRandomSync = function () {
  // TODO: return random shaken Proverb for a random language SYNC
}
module.exports = ProverbCollection

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

/** Creates a instance of class Bibles
 * @class ProverbCollection
 * @param {string} proverbpath - Path to Folder with csv proverbs
 * @param {function} callback - Called after all is done
 * @returns {object} The Working Collection Object
 * */
function ProverbCollection (proverbpath, Proverb, callback) {
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
  })
}
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
function languagesSync () {
  return returnLanguages(this.proverbs)
}
function returnLanguages (proverbs) {
  var languages = []
  for (var i = 0; i < proverbs.length; i++) {
    languages.push(proverbs[i].getLanguageSync())
  }
  return languages
}
function all (language, callback) {
  if (typeof callback !== 'function') {
    throw new Error('No Callback')
  } else {
    var proverbs = returnProverbs(this.proverbs, language)
    if (proverbs.length < 1) {
      callback({status: 404, message: 'No Proverbs for Language ' + language + ' Found'})
    } else {
      callback(null, proverbs)
    }
  }
}
function allSync (language) {
  return returnProverbs(this.proverbs, language)
}
function returnProverbs (proverbs, language) {
  for (var i = 0; i < proverbs.length; i++) {
    if (proverbs[i].language === language) {
      return proverbs[i].allSync()
    }
  }
  return null
}
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
function randomSync (language) {
  return returnRandom(this.proverbs, language)
}
function returnRandom (proverbs, language) {
  for (var i = 0; i < proverbs.length; i++) {
    if (proverbs[i].language === language) {
      return proverbs[i].randomSync()
    }
  }
  return null
}
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
function fullRandomSync () {
  return returnFullRandom(this.proverbs)
}
function returnFullRandom (proverbs) {
  var rnd = Math.floor(Math.random() * (proverbs.length - 0 + 1)) + 0
  for (var i = 0; i < proverbs.length; i++) {
    if (i === rnd) {
      return proverbs[i].randomSync()
    }
  }
  return null
}
module.exports = ProverbCollection

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
function Proverb (file, callback) {
  var self = {}
  var parse = require('csv-parse')
  var fs = require('fs')
  var path = require('path')
  var parser = parse({delimiter: ';'}, function (err, data) {
    if (err) {
      callback(err)
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
    }
  })
  fs.createReadStream(file).pipe(parser)
}
function getLanguage (callback) {
  if (typeof callback !== 'function') {
    return null
  } else {
    callback(null, this.language)
  }
}
function getLanguageSync () {
  return this.language
}
function all (callback) {
  if (typeof callback !== 'function') {
    return null
  } else {
    if (this.proverbs.length > 0) {
      callback(null, this.proverbs)
    } else {
      callback({status: 404, message: 'No Proverbs Loaded'})
    }
  }
}
function allSync () {
  return this.proverbs
}
function random (callback) {
  if (typeof callback !== 'function') {
    return null
  } else {
    var pv = returnRandom(this.proverbs)
    if (pv != null) {
      pv.language = this.language
      callback(null, this.proverbs)
    } else {
      callback({status: 404, message: 'No random Proverb found'})
    }
  }
}
function randomSync () {
  var pv = returnRandom(this.proverbs)
  pv.language = this.language
  return pv
}
function returnRandom (proverbs) {
  if (proverbs.length > 0) {
    var rnd_front = Math.floor(Math.random() * (proverbs.length - 0 + 1)) + 0
    var rnd_back = Math.floor(Math.random() * (proverbs.length - 0 + 1)) + 0
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

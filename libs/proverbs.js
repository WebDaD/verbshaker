/**
 * @overview 	Proverb-Object, contains all proverbs of a language
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
function Proverbs (file, callback) {
  // TODO: read in File (csv, internal json)
  // TODO: callback with (this)
  // TODO: set this.language
}
Proverbs.prototype.getLanguage = function (callback) {
  // TODO: return this.language
}
Proverbs.prototype.getLanguageSync = function () {
  // TODO: return this.language sync
}
Proverbs.prototype.all = function (callback) {
  // TODO: return all proverbs
}
Proverbs.prototype.allSync = function () {
  // TODO: return all proverbs sync
}
Proverbs.prototype.random = function (callback) {
  // TODO: return a shaken proverb
}
Proverbs.prototype.randomSync = function () {
  // TODO: return a shaken proverb sync
}
module.exports = Proverbs

/**
 * @overview 	ImageGenerator-Object, creates Images using gm and imageMagick
 * @module imageGenerator
 * @author Dominik Sigmund
 * @version 0.2
 * @description	Creates an Object. Has specific methods to show and manipulate data
 * @memberof verbshaker
 * @requires module:gm
 * @requires bin:imageMagick
 * @requires module:font-manager
 */

 /** Creates a instance of class ImageGenerator
 * @class ImageGenerator
 * @param {object} config - A config object containing the default settings
 * @returns {ImageGenerator} The Object
 * */
function ImageGenerator (config) {
  var self = {}
  self.default = config
  self.gm = require('gm').subClass({imageMagick: true})
  self.generate = generate
  self.fontManager = require('font-manager')
  return self
}
/** Create an Image based on some data
 * @param {string} width - Width of the Image
 * @param {string} height - Height of the Image
 * @param {object} params - More additional Parameters
 * @param {object.bc} backgroundcolor - Backgroundcolor as string
 * @param {object.fc} fontcolor - Fontcolor as string
 * @param {object.ff} fontfamily - Fontfamily as string
 * @param {object.fs} fontsize - Fontsize as string
 * @param {object.t} text - Text as string
 * @param {ImageGenerator~generateCallback} callback - A Callback with the Image
 * @throws NoCallbackError
 * @returns Nothing
 * */
function generate (width, height, params, callback) {
  if (typeof callback !== 'undefined' && typeof callback !== 'function') {
    throw new Error('no Callback given: ' + typeof callback)
  } else {
    width = (typeof width === 'undefined' || width === 'auto') ? this.default.image_width : width
    height = (typeof height === 'undefined' || height === 'auto') ? this.default.image_height : height
    var backgroundcolor = (typeof params.bc === 'undefined') ? this.default.backgroundcolor : params.bc
    var fontcolor = (typeof params.fc === 'undefined') ? this.default.fontcolor : params.fc
    var fontfamily = (typeof params.ff === 'undefined') ? this.default.fontfamily : params.ff
    var fontsize = (typeof params.fs === 'undefined') ? this.default.fontsize : params.fs
    var text = (typeof params.t === 'undefined') ? this.default.image_text : params.t

    fontsize = (((width < height) ? width : height) * fontsize) / 100

    this.gm(width, height, backgroundcolor)
      .fill(fontcolor)
      .font(this.fontManager.findFontSync({postscriptName: fontfamily}).path, fontsize)
      .gravity('Center')
      .drawText(0, 0, text)
      .fill(fontcolor)
      .toBuffer('JPG', function (err, buffer) {
        if (err) {
          return callback(err)
        } else {
          return callback(null, buffer)
        }
      })
  }
}
module.exports = ImageGenerator
/**
 * This callback is displayed as part of the ImageGenerator class.
 * @callback ImageGenerator~generateCallback
 * @param {object} Error or null
 * @param {buffer} The Image, ready to stream or save
 */

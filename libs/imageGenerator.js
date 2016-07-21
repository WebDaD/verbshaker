// TODO jsdoc

function ImageGenerator (config) {
  var self = {}
  self.default = config
  self.gm = require('gm').subClass({imageMagick: true})
  self.generate = generate
  self.fontManager = require('font-manager')
  return self
}
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

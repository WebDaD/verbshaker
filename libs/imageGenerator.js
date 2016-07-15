// TODO jsdoc

function ImageGenerator (config) {
  var self = {}
  self.default = config
  self.gm = require('gm').subClass({imageMagick: true})
  self.generate = generate
  return self
}
function generate (callback, width, height, params) {
  if (typeof callback !== 'undefined' || typeof callback !== 'function') {
    throw new Error('no Callback given')
  } else {
    width = (typeof width === 'undefined' || width === 'auto') ? this.default.width : width
    height = (typeof height === 'undefined' || height === 'auto') ? this.default.height : height
    var backgroundcolor = (typeof params.bc === 'undefined') ? this.default.backgroundcolor : params.bc
    var fontcolor = (typeof params.fc === 'undefined') ? this.default.fontcolor : params.fc
    var fontfamily = (typeof params.ff === 'undefined') ? this.default.fontfamily : params.ff
    var fontsize = (typeof params.fs === 'undefined') ? this.default.fontsize : params.fs
    var text = (typeof params.t === 'undefined') ? this.default.text : params.t
    this.gm(width, height, backgroundcolor)
      .stroke(fontcolor)
      .font(fontfamily + '.ttf', fontsize)
      .drawText(10, width / 2, text)
      .stream(function (err, stdout, stderr) {
        if (err || stderr) {
          callback(err || stderr)
        } else {
          callback(null, stdout)
        }
      })
  }
}
module.exports = ImageGenerator

/* Module to help with mocking */

var fs = require('fs')
var jsonfile = require('jsonfile')
var path = require('path')
function Mock () {
  var self = {}
  self.folder = undefined
  self.properties = []
  self.objects = []
  self.savestates = {}
  self.createDatabase = createDatabase
  self.addObject = addObject
  self.addModel = addModel
  self.getObject = getObject
  self.lockDatabase = lockDatabase
  self.unlockDatabase = unlockDatabase
  self.lockFile = lockFile
  self.unlockFile = unlockFile
  self.save = save
  self.restore = restore
  self.objectsToDatabase = objectsToDatabase
  self.destroyDatabase = destroyDatabase
  self.cleanDatabase = cleanDatabase
  self.addProperty = addProperty
  self.getProperty = getProperty
  return self
}
function createDatabase (folder) {
  try {
    fs.accessSync(folder, fs.F_OK)
    deleteFolderRecursive(folder)
    fs.mkdirSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
  this.folder = folder
  return true
}
function addObject (object) {
  this.objects.push(object)
  if (typeof this.folder !== 'undefined') {
    jsonfile.writeFileSync(path.join(this.folder, object.id.toString()) + '.json', object)
  }
}
function addModel (model) {
  this.model = model
}
function getObject (id) {
  for (var i = 0; i < this.objects.length; i++) {
    var t = this.objects[i]
    if (t.id.toString() === id.toString()) {
      return t
    }
  }
  return null
}
function lockDatabase () {
  if (typeof this.folder !== 'undefined') {
    fs.chmodSync(this.folder, '0000')
  }
}
function unlockDatabase () {
  if (typeof this.folder !== 'undefined') {
    fs.chmodSync(this.folder, '0777')
  }
}
function lockFile (file) {
  if (typeof file !== 'undefined') {
    fs.chmodSync(file, '0000')
  }
}
function unlockFile (file) {
  if (typeof file !== 'undefined') {
    fs.chmodSync(file, '0777')
  }
}
function save (name) {
  var self = this
  var savestate = (typeof name !== 'undefined') ? name : 'default'
  var state = {
    objects: self.objects,
    model: self.model,
    properties: self.properties
  }
  self.savestates[savestate] = state
}
function restore (name) {
  var self = this
  var savestate = (typeof name !== 'undefined') ? name : 'default'
  self.cleanDatabase()
  var state = self.savestates[savestate]
  self.objects = state.objects
  self.model = state.model
  self.properties = state.properties
  self.objectsToDatabase()
}
function objectsToDatabase () {
  if (typeof this.folder !== 'undefined') {
    for (var i = 0; i < this.objects.length; i++) {
      jsonfile.writeFileSync(path.join(this.folder, this.objects[i].id.toString()) + '.json', this.objects[i])
    }
  }
}
function destroyDatabase () {
  if (typeof this.folder !== 'undefined') {
    deleteFolderRecursive(this.folder)
  }
}
function cleanDatabase () {
  if (typeof this.folder !== 'undefined') {
    deleteFolderRecursiveWithoutTop(this.folder)
  }
}
function addProperty (key, value) {
  this.properties.push({key: key, value: value})
}
function getProperty (key) {
  for (var i = 0; i < this.properties.length; i++) {
    var t = this.properties[i]
    if (t.key === key) {
      return t.value
    }
  }
}
module.exports = Mock

function deleteFolderRecursive (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
function deleteFolderRecursiveWithoutTop (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
  }
}

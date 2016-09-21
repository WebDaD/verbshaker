/* global it, describe, before, after */
var assert = require('assert')
var superagent = require('superagent')
var status = require('http-status')
var ip = require('ip')
var pack = require('../package.json')
const spawn = require('child_process').spawn
var server
describe('IT02: API base Functions Test', function () {
  const uri = 'http://' + ip.address() + ':' + pack.config.port
  before(function (done) {
    server = spawn('node', ['app.js'])
    setTimeout(function () {
      done()
    }, 1000)
  })

  after(function (done) {
    server.kill('SIGHUP')
    setTimeout(function () {
      done()
    }, 1000)
  })
  it('IT02-01: /status: Return Status', function (done) {
    superagent.get(uri + '/status').end(function (err, res) {
      assert.ifError(err)
      assert.equal(res.status, status.OK)
      var result = JSON.parse(res.text)
      assert.deepEqual({status: 'running'}, result)
      done()
    })
  })
  it('IT02-02: /config: Return Config', function (done) {
    superagent.get(uri + '/config').end(function (err, res) {
      assert.ifError(err)
      assert.equal(res.status, status.OK)
      var result = JSON.parse(res.text)
      assert('port' in result)
      assert('proverbs' in result)
      assert('show_docs' in result)
      assert('default' in result)
      assert('changeable' in result)
      done()
    })
  })
  it('IT02-03: /fonts: Return List of Fonts', function (done) {
    superagent.get(uri + '/fonts').end(function (err, res) {
      assert.ifError(err)
      assert.equal(res.status, status.OK)
      var result = JSON.parse(res.text)
      assert(result.length > 0)
      done()
    })
  })
  it('IT02-04: /fonts/:postscriptName.ttf: Return File', function (done) {
    superagent.get(uri + '/fonts/InevitableBRK.ttf').end(function (err, res) {
      assert.ifError(err)
      assert.equal(res.status, status.OK)
      done()
    })
  })
  it('IT02-05: /fonts/:postscriptName.ttf: Error on not existing File', function (done) {
    superagent.get(uri + '/fonts/somenotextsingfont.ttf').end(function (err, res) {
      assert(err)
      assert.equal(res.status, status.NOT_FOUND)
      done()
    })
  })
  it('IT02-06: /css/:postscriptName.css: Return CSS File', function (done) {
    superagent.get(uri + '/css/InevitableBRK.css').end(function (err, res) {
      assert.ifError(err)
      assert.equal(res.status, status.OK)
      done()
    })
  })
  it('IT02-07: /css/:postscriptName.css: Error on not existing Font', function (done) {
    superagent.get(uri + '/css/somenotextsingfont.css').end(function (err, res) {
      assert(err)
      assert.equal(res.status, status.NOT_FOUND)
      done()
    })
  })
})
process.on('exit', function () {
  if (server) {
    server.kill('SIGHUP')
    server = null
  }
})

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
  it('IT02-01: /status: Return Status')
  it('IT02-02: /config: Return Config')
  it('IT02-03: /fonts: Return List of Fonts')
  it('IT02-04: /fonts/:postscriptName.ttf: Return File')
  it('IT02-05: /css/:postscriptName.css: Return CSS File')
})
process.on('exit', function () {
  if (server) {
    server.kill()
    server = null
  }
})

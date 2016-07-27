/* global it, describe, before, after */
var assert = require('assert')
var superagent = require('superagent')
var status = require('http-status')
var ip = require('ip')
var pack = require('../package.json')
const spawn = require('child_process').spawn
var server
describe('IT03: API Image Functions Test', function () {
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
  it('IT03-01: /image/:width/:height/proverb.jpg?params: Return Image width all Fields')
  it('IT03-02: /image/:width/:height/proverb.jpg: Return Image width Default Data')
  it('IT03-03: /image/:width/:height/proverb.jpg: Return Mixed (width, height; others default)')
})
process.on('exit', function () {
  if (server) {
    server.kill()
    server = null
  }
})

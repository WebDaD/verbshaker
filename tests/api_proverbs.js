/* global it, describe, before, after */
var assert = require('assert')
var superagent = require('superagent')
var status = require('http-status')
var ip = require('ip')
var pack = require('../package.json')
const spawn = require('child_process').spawn
var server
describe('IT01: API Proverbs Test', function () {
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
  it('IT01-01: /api/languages: Return Array of Languages', function (done) {
    superagent.get(uri + '/api/languages').end(function (err, res) {
      assert.ifError(err)
      assert.equal(res.status, status.OK)
      var result = JSON.parse(res.text)
      assert.equal(4, result.length)
      done()
    })
  })
  it('IT01-02: /api/random: Return Random Proverb', function (done) {
    superagent.get(uri + '/api/random').end(function (err, res) {
      assert.ifError(err)
      assert.equal(res.status, status.OK)
      var result = JSON.parse(res.text)
      assert.ok(result.front)
      assert.ok(result.back)
      assert.ok(result.language)
      assert.equal(result.front + ' ' + result.back, result.combined)
      done()
    })
  })
  it('IT01-04: /api/:language: Return Array of Proverbs on Known language', function (done) {
    superagent.get(uri + '/api/de').end(function (err, res) {
      assert.ifError(err)
      assert.equal(res.status, status.OK)
      var result = JSON.parse(res.text)
      assert.ok(result.length > 0)
      done()
    })
  })
  it('IT01-05: /api/:language: Return Error on Unnown language', function (done) {
    superagent.get(uri + '/api/xx').end(function (err, res) {
      if (err) {
        assert.equal(res.status, 404)
        done()
      } else {
        assert.equal(res.status, 404)
        done()
      }
    })
  })
  it('IT01-06: /api/:language/random: Return Random Proverb for Language', function (done) {
    superagent.get(uri + '/api/de/random').end(function (err, res) {
      assert.ifError(err)
      assert.equal(res.status, status.OK)
      var result = JSON.parse(res.text)
      assert.ok(result.front)
      assert.ok(result.back)
      assert.ok(result.language)
      assert.equal(result.front + ' ' + result.back, result.combined)
      done()
    })
  })
  it('IT01-07: /api/:language/random: Return Error on Unnown language', function (done) {
    superagent.get(uri + '/api/xx/random').end(function (err, res) {
      if (err) {
        assert.equal(res.status, 404)
        done()
      } else {
        assert.equal(res.status, 404)
        done()
      }
    })
  })
})
process.on('exit', function () {
  if (server) {
    server.kill()
    server = null
  }
})

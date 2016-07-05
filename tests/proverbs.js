/* global it, describe, before, after, beforeEach, afterEach*/
var assert = require('assert')
var path = require('path')
var MOCK = require('./mock')
var mock
var Proverb = require(path.join(__dirname, '../libs/proverbs'))
var proverb
describe('UT01: Proverb', function () {
  before('UT01-00-Prep: Creating Mock Database', function () {
    mock = new MOCK()
    mock.addProperty('language', 'good')
    mock.addProperty('entries', 3)
    mock.addProperty('csv', path.join(__dirname, '../tests/good.csv'))
    mock.addProperty('nocsv', path.join(__dirname, '../tests/'))
    mock.addProperty('defectiveCsv', path.join(__dirname, '../tests/fail.csv'))
    mock.addProperty('emptyCsv', path.join(__dirname, '../tests/empty.csv'))
  })
  after('UT01-99-Clean: Removing Mock Database', function () {
    mock.destroyDatabase()
  })
  beforeEach(function () {
    mock.save('pv')
  })
  afterEach(function (done) {
    mock.restore('pv')
    proverb = new Proverb(mock.getProperty('csv'), function (error, pv) {
      if (error) {
        done(new Error(error))
      } else {
        proverb = pv
        done()
      }
    })
  })
  describe('UT01-01: create Object', function () {
    it('UT01-01-01: should throw error without callback', function (done) {
      try {
        proverb = new Proverb(mock.getProperty('csv'))
        done(new Error('Error: no Error'))
      } catch (e) {
        done()
      }
    })
    it('UT01-01-02: should callback with error with wrong path', function (done) {
      try {
        proverb = new Proverb(undefined, function (error, pv) {
          if (error) {
            done()
          } else {
            done(new Error('Error: no Error'))
          }
        })
      } catch (e) {
        done()
      }
    })
    it('UT01-01-03: should callback with error with defective csv', function (done) {
      proverb = new Proverb(mock.getProperty('defectiveCsv'), function (error, pv) {
        if (error) {
          done()
        } else {
          done(new Error('Error: no Error'))
        }
      })
    })
    it('UT01-01-04: should callback error with no csv', function (done) {
      proverb = new Proverb(mock.getProperty('nocsv'), function (error, pv) {
        if (error) {
          done()
        } else {
          done(new Error('Error: no Error'))
        }
      })
    })
    it('UT01-01-05: should callback self with good file', function (done) {
      proverb = new Proverb(mock.getProperty('csv'), function (error, pv) {
        if (error) {
          done(new Error(error))
        } else {
          assert.deepEqual(mock.getProperty('language'), pv.language)
          proverb = pv
          done()
        }
      })
    })
  })
  describe('UT01-02: getLanguage', function () {
    it('UT01-02-01: should throw error without callback in async-call', function (done) {
      try {
        proverb.getLanguage()
        done(new Error('Error: no Error'))
      } catch (e) {
        done()
      }
    })
    it('UT01-02-02: should callback language in async-call', function (done) {
      proverb.getLanguage(function (error, language) {
        if (error) {
          done(new Error(error))
        } else {
          assert.deepEqual(mock.getProperty('language'), language)
          done()
        }
      })
    })
    it('UT01-02-03: should return language in sync-call', function () {
      assert.deepEqual(mock.getProperty('language'), proverb.getLanguageSync())
    })
  })
  describe('UT01-03: all', function () {
    it('UT01-03-01: should throw error without callback in async-call', function (done) {
      try {
        proverb.all()
        done(new Error('Error: no Error'))
      } catch (e) {
        done()
      }
    })
    it('UT01-03-02: should callback all proverbs in async-call', function (done) {
      proverb.all(function (error, verbs) {
        if (error) {
          done(new Error(error))
        } else {
          assert.deepEqual(mock.getProperty('entries'), verbs.length)
          done()
        }
      })
    })
    it('UT01-03-03: should callback error 404 if no proverbs in async-call', function (done) {
      proverb = new Proverb(mock.getProperty('emptyCsv'), function (error, pv) {
        if (error) {
          done(new Error(error))
        } else {
          pv.all(function (error, verbs) {
            if (error) {
              assert.deepEqual(404, error.status)
              done()
            } else {
              done(new Error('Error: no Error'))
            }
          })
        }
      })
    })
    it('UT01-03-04: should return all proverbs in sync-call', function () {
      assert.deepEqual(mock.getProperty('entries'), proverb.allSync().length)
    })
  })
  describe('UT01-04: random', function () {
    it('UT01-04-01: should throw error without callback in async-call', function (done) {
      try {
        proverb.random()
        done(new Error('Error: no Error'))
      } catch (e) {
        done()
      }
    })
    it('UT01-04-02: should callback a random proverb in async-call', function (done) {
      proverb.random(function (error, verb) {
        if (error) {
          done(new Error(error))
        } else {
          assert.deepEqual(verb.combined, verb.front + ' ' + verb.back)
          done()
        }
      })
    })
    it('UT01-04-03: should callback error 404 if no proverbs in async-call', function (done) {
      proverb = new Proverb(mock.getProperty('emptyCsv'), function (error, pv) {
        if (error) {
          done(new Error(error))
        } else {
          pv.random(function (error, verb) {
            if (error) {
              assert.deepEqual(404, error.status)
              done()
            } else {
              done(new Error('Error: no Error'))
            }
          })
        }
      })
    })
    it('UT01-04-04: should return a random proverb in sync-call', function () {
      var verb = proverb.randomSync()
      assert.deepEqual(verb.combined, verb.front + ' ' + verb.back)
    })
  })
})

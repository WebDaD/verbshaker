/* global it, describe, before, after, beforeEach, afterEach*/
var assert = require('assert')
var path = require('path')
var MOCK = require('./mock')
var mock
var ProverbCollection = require(path.join(__dirname, '../libs/proverbCollection'))
var proverbCollection
describe('UT02: ProverbCollection', function () {
  before('UT02-00-Prep: Creating Mock Database', function () {
    mock = new MOCK()
    mock.addProperty('proverbfolder', path.join(__dirname, '../tests/pvtest'))
    mock.addProperty('proverb', function Proverb (file, callback) {
      var self = {}
      self.proverbs = [['Morgenstund', 'hat Gold im Mund'], ['Ein Sprichwort', 'ist schön']]
      self.language = path.basename(file, '.csv')
      self.getLanguage = function (callback) { callback(null, this.language) }
      self.getLanguageSync = function () { return this.language }
      self.all = function (callback) { callback(null, this.proverbs) }
      self.allSync = function () { return this.proverbs }
      self.random = function (callback) { callback(null, {front: 'morgenstund', back: 'gold im Mund', combined: 'morgenstund gold im Mund', language: 'good'}) }
      self.randomSync = function () { return {front: 'morgenstund', back: 'gold im Mund', combined: 'morgenstund gold im Mund', language: 'good'} }
      callback(null, self)
      return self
    })
    mock.addProperty('languages', ['good', 'good2', 'good3'])
  })
  after('UT02-99-Clean: Removing Mock Database', function () {
    mock.destroyDatabase()
  })
  beforeEach(function () {
    mock.save('pv')
  })
  afterEach(function (done) {
    mock.restore('pv')
    proverbCollection = new ProverbCollection(mock.getProperty('proverbfolder'), mock.getProperty('proverb'), function (error, pv) {
      if (error) {
        done(new Error(error))
      } else {
        proverbCollection = pv
        done()
      }
    })
  })
  describe('UT02-01: create Object', function () {
    it('UT02-01-01: should throw error without callback')
    it('UT02-01-02: should throw error without Proverb-Object')
    it('UT02-01-03: should callback with error with wrong path')
    it('UT02-01-04: should callback error with no csvs')
    it('UT02-01-05: should callback self with good folder', function (done) {
      proverbCollection = new ProverbCollection(mock.getProperty('proverbfolder'), mock.getProperty('proverb'), function (error, pv) {
        if (error) {
          done(new Error(error))
        } else {
          proverbCollection = pv
          done()
        }
      })
    })
  })
  describe('UT02-02: languages', function () {
    it('UT02-02-01: should throw error without callback in async-call', function (done) {
      try {
        proverbCollection.languages()
        done(new Error('Error: no Error'))
      } catch (e) {
        done()
      }
    })
    it('UT02-02-02: should callback array of languages in async-call', function (done) {
      proverbCollection.languages(function (error, languages) {
        if (error) {
          done(new Error(error))
        } else {
          assert.deepEqual(mock.getProperty('languages'), languages)
          done()
        }
      })
    })
    it('UT02-02-03: should return array of languages in sync-call', function () {
      assert.deepEqual(mock.getProperty('languages'), proverbCollection.languagesSync())
    })
  })
  describe('UT02-03: all', function () {
    it('UT02-03-01: should throw error without callback in async-call', function (done) {
      try {
        proverbCollection.all()
        done(new Error('Error: no Error'))
      } catch (e) {
        done()
      }
    })
    it('UT02-03-02: should callback all proverbs for language in async-call')
    it('UT02-03-03: should callback error for wrong language in async-call')
    it('UT02-03-04: should return all proverbs for language in sync-call')
    it('UT02-03-05: should return null for wrong language in sync-call')
  })
  describe('UT02-04: random', function () {
    it('UT02-04-01: should throw error without callback in async-call', function (done) {
      try {
        proverbCollection.random()
        done(new Error('Error: no Error'))
      } catch (e) {
        done()
      }
    })
    it('UT02-04-02: should callback random proverb for language in async-call')
    it('UT02-04-03: should callback error for wrong language in async-call')
    it('UT02-04-04: should return random proverb for language in sync-call')
    it('UT02-04-05: should return null for wrong language in sync-call')
  })
  describe('UT02-05: fullRandom', function () {
    it('UT02-05-01: should throw error without callback in async-call', function (done) {
      try {
        proverbCollection.fullRandom()
        done(new Error('Error: no Error'))
      } catch (e) {
        done()
      }
    })
    it('UT02-05-02: should callback random proverb for any language in async-call')
    it('UT02-05-03: should return random proverb for any language in sync-call')
  })
})

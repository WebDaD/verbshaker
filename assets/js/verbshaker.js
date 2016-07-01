/* global angular */
;(function () {
  angular.module('verbshaker').controller('verbshakerController', function () {
    var ctrl = this
    // TODO: get from server, button to reload, language into rootScope.
    // TODO: on first load get language from browserconfig
    // TODO: have cookie to save language
    ctrl.language = 'de'
    ctrl.proverb = 'Click to Load...'
    ctrl.newProverb = getVerb
    function getVerb () {
      ctrl.proverb = ''
    }
    getVerb()
  })
}())

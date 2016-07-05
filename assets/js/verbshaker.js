/* global angular */
;(function () {
  angular.module('verbshaker', ['ngCookies']).controller('verbshakerController', ['$http', '$cookies', '$scope', '$window', function ($http, $cookies, $scope, $window) {
    if (typeof $cookies.get('verbshaker-language') !== 'undefined') {
      $scope.language = $cookies.get('verbshaker-language')
    } else {
      var lang = $window.navigator.language || $window.navigator.userLanguage
      switch (lang) {
        case 'en-US':
          $scope.language = 'en'
          break
        case 'de-DE':
          $scope.language = 'de'
          break
        case 'fr-FR':
          $scope.language = 'fr'
          break
        case 'es-ES':
          $scope.language = 'es'
          break
        default:
          $scope.language = 'en'
          break
      }
      $cookies.put('verbshaker-language', $scope.language)
    }
    $scope.$watch('language', function () {
      $cookies.put('verbshaker-language', $scope.language)
      getVerb()
    })
    $scope.proverb = 'Click to Load...'
    $scope.newProverb = getVerb
    function getVerb () {
      $scope.proverb = ''
      $http.get('/api/' + $scope.language + '/random', {}).then(function (data) {
        $scope.proverb = data.data.combined
      }, function (error) {
        $scope.proverb = error.data.message
      })
    }
    getVerb()
  }])
}())

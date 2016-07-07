/* global angular */
;(function () {
  angular.module('verbshaker', ['ngCookies', 'colorpicker.module']).controller('verbshakerController', ['$http', '$cookies', '$scope', '$window', function ($http, $cookies, $scope, $window) {
    $scope.languages = ''
    $http.get('/api/languages', {}).then(function (data) {
      $scope.languages = data.data
    }, function (error) {
      $scope.languages = error.data.message
    })
    if (typeof $cookies.get('verbshaker-language') !== 'undefined') {
      $scope.language = $cookies.get('verbshaker-language')
    } else {
      var lang = $window.navigator.language || $window.navigator.userLanguage
      switch (lang) {
        case 'en-US':
          $scope.language = 'gb'
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
          $scope.language = 'gb'
          break
      }
      $cookies.put('verbshaker-language', $scope.language)
    }
    $scope.$watch('language', function () {
      $cookies.put('verbshaker-language', $scope.language)
      getVerb()
    })
    if (typeof $cookies.get('verbshaker-backgroundcolor') !== 'undefined') {
      $scope.backgroundcolor = $cookies.get('verbshaker-backgroundcolor')
    } else {
      $scope.backgroundcolor = '#000000'
    }
    $scope.$watch('backgroundcolor', function () {
      $cookies.put('verbshaker-backgroundcolor', $scope.backgroundcolor)
    })
    if (typeof $cookies.get('verbshaker-fontcolor') !== 'undefined') {
      $scope.fontcolor = $cookies.get('verbshaker-fontcolor')
    } else {
      $scope.fontcolor = '#FFFFFF'
    }
    $scope.$watch('fontcolor', function () {
      $cookies.put('verbshaker-fontcolor', $scope.fontcolor)
    })
    if (typeof $cookies.get('verbshaker-hiddenNav') !== 'undefined') {
      $scope.hiddenNav = $cookies.get('verbshaker-hiddenNav') === 'true'
    } else {
      $scope.hiddenNav = false
    }
    $scope.$watch('hiddenNav', function () {
      $cookies.put('verbshaker-hiddenNav', $scope.hiddenNav)
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

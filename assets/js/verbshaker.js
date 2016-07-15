/* global angular, Shake */
;(function () {
  angular.module('verbshaker', ['ngCookies', 'colorpicker.module', 'ngNumberPicker', '720kb.tooltips', '720kb.socialshare', 'ui.bootstrap', 'ngAnimate']).controller('verbshakerController', ['$http', '$cookies', '$scope', '$window', '$uibModal', function ($http, $cookies, $scope, $window, $uibModal) {
    $http.get('/api/languages', {}).then(function (data) {
      $scope.default = data.data.default
      $scope.changeable = data.data.changeable
      // Get Languages
      $scope.languages = ''
      $http.get('/api/languages', {}).then(function (data) {
        $scope.languages = data.data
      }, function (error) {
        $scope.languages = error.data.message
      })
      // Get Selected Language
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
      // backgroundcolor
      if (typeof $cookies.get('verbshaker-backgroundcolor') !== 'undefined') {
        $scope.backgroundcolor = $cookies.get('verbshaker-backgroundcolor')
      } else {
        $scope.backgroundcolor = $scope.default.backgroundcolor
      }
      $scope.$watch('backgroundcolor', function () {
        $cookies.put('verbshaker-backgroundcolor', $scope.backgroundcolor)
      })
      // fontcolor
      if (typeof $cookies.get('verbshaker-fontcolor') !== 'undefined') {
        $scope.fontcolor = $cookies.get('verbshaker-fontcolor')
      } else {
        $scope.fontcolor = $scope.default.fontcolor
      }
      $scope.$watch('fontcolor', function () {
        $cookies.put('verbshaker-fontcolor', $scope.fontcolor)
      })
      // fontsize
      if (typeof $cookies.get('verbshaker-fontsize') !== 'undefined') {
        $scope.fontsize = $cookies.get('verbshaker-fontsize')
      } else {
        $scope.fontsize = $scope.default.fontsize
      }
      $scope.$watch('fontsize', function () {
        $cookies.put('verbshaker-fontsize', $scope.fontsize)
      })
      // hiddenNav
      if (typeof $cookies.get('verbshaker-hiddenNav') !== 'undefined') {
        $scope.hiddenNav = $cookies.get('verbshaker-hiddenNav') === 'true'
      } else {
        $scope.hiddenNav = $scope.default.hiddenNav
      }
      $scope.$watch('hiddenNav', function () {
        $cookies.put('verbshaker-hiddenNav', $scope.hiddenNav)
      })
      // proverbbutton
      if (typeof $cookies.get('verbshaker-proverbbutton') !== 'undefined') {
        $scope.proverbbutton = $cookies.get('verbshaker-proverbbutton') === 'true'
      } else {
        $scope.proverbbutton = $scope.default.proverbbutton
      }
      $scope.$watch('proverbbutton', function () {
        $cookies.put('verbshaker-proverbbutton', $scope.proverbbutton)
      })
      // proverb
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
      // shake.js
      var shakeEvent = new Shake({threshold: 15})
      shakeEvent.start()
      window.addEventListener('shake', function () {
        getVerb()
      }, false)
      // new verb every x seconds
      var autoupdateInterval
      if (typeof $cookies.get('verbshaker-autoupdate') !== 'undefined') {
        $scope.autoupdate = parseInt($cookies.get('verbshaker-autoupdate'), 10)
      } else {
        $scope.autoupdate = $scope.default.autoupdate
      }
      if (autoupdateInterval) {
        clearInterval(autoupdateInterval)
      }
      if ($scope.autoupdate !== 0) {
        autoupdateInterval = setInterval(function () {
          getVerb()
        }, $scope.autoupdate * 1000)
      }
      $scope.$watch('autoupdate', function () {
        $cookies.put('verbshaker-autoupdate', $scope.autoupdate)
        if (autoupdateInterval) {
          clearInterval(autoupdateInterval)
        }
        if ($scope.autoupdate !== 0) {
          autoupdateInterval = setInterval(function () {
            getVerb()
          }, $scope.autoupdate * 1000)
        }
      })
      // Share Modal
      $scope.openModal = function () {
        $uibModal.open({
          animation: true,
          templateUrl: 'share.html',
          controller: 'shareController',
          controllerAs: 'ctrl',
          size: 'lg',
          resolve: {
            data: function () {
              return $scope.proverb
            }
          }
        })
      }
    }, function (error) {
      console.error(error)
      $scope.proverb = 'Error (see console)'
    })
  }])
    .config(['tooltipsConfProvider', function configConf (tooltipsConfProvider) {
      tooltipsConfProvider.configure({
        'size': 'large',
        'speed': 'slow',
        'side': 'bottom'
      })
    }])
}())

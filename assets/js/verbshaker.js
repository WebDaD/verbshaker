/* global angular */
;(function () {
  angular.module('verbshaker', ['ngCookies', 'colorpicker.module', 'ngNumberPicker', '720kb.tooltips', '720kb.socialshare', 'ui.bootstrap', 'ngAnimate']).controller('verbshakerController', ['$http', '$cookies', '$scope', '$window', '$uibModal', '$rootScope', function ($http, $cookies, $scope, $window, $uibModal, $rootScope) {
    var ctrl = $rootScope
    // cookie expiration date -> 12 months from now
    var now = new $window.Date()
    ctrl.cookieExp = new $window.Date(now.getFullYear(), now.getMonth() + 12, now.getDate())
    // Get Fonts
    ctrl.fonts = []
    $http.get('/fonts', {}).then(function (data) {
      ctrl.fonts = data.data
    }, function (error) {
      ctrl.fonts = error.data.message
    })
    // Get Languages
    ctrl.languages = []
    $http.get('/api/languages', {}).then(function (data) {
      ctrl.languages = data.data
    }, function (error) {
      ctrl.languages = error.data.message
    })
    // Get Config
    $http.get('/config', {}).then(function (configdata) {
      ctrl.default = configdata.data.default
      ctrl.changeable = configdata.data.changeable
    }, function (error) {
      console.error(error)
      ctrl.proverb = 'Error (see console)'
    })
    ctrl.settings = {}
    ctrl.settings.font = {}
    ctrl.settings.font.family = 'LMRoman17-Regular'
    ctrl.proverb = 'Loading...'
    ctrl.autoupdateInterval = undefined
    ctrl.updateInterval = function () {
      if (ctrl.autoupdateInterval) {
        clearInterval(ctrl.autoupdateInterval)
      }
      if (ctrl.settings.autoupdate !== 0) {
        ctrl.autoupdateInterval = setInterval(function () {
          ctrl.newProverb()
        }, ctrl.settings.autoupdate * 1000)
      }
    }
    ctrl.updateSettings = function () {
      $cookies.put('verbshaker-language', ctrl.settings.language, { expires: ctrl.cookieExp })
      $cookies.put('verbshaker-backgroundcolor', ctrl.settings.backgroundcolor, { expires: ctrl.cookieExp })
      $cookies.put('verbshaker-fontcolor', ctrl.settings.font.color, { expires: ctrl.cookieExp })
      $cookies.put('verbshaker-fontsize', ctrl.settings.font.size, { expires: ctrl.cookieExp })
      $cookies.put('verbshaker-fontfamily', ctrl.settings.font.family, { expires: ctrl.cookieExp })
      $cookies.put('verbshaker-hiddenNav', ctrl.settings.hiddenNav, { expires: ctrl.cookieExp })
      $cookies.put('verbshaker-proverbbutton', ctrl.settings.proverbbutton, { expires: ctrl.cookieExp })
      $cookies.put('verbshaker-autoupdate', ctrl.settings.autoupdate, { expires: ctrl.cookieExp })
    }
    $scope.$watch(function () {
      return $rootScope.settings
    }, function () {
      ctrl.updateSettings()
      ctrl.updateInterval()
    }, true)

    // Get Selected Language
    if (typeof $cookies.get('verbshaker-language') !== 'undefined') {
      ctrl.settings.language = $cookies.get('verbshaker-language')
    } else {
      var lang = $window.navigator.language || $window.navigator.userLanguage
      switch (lang) {
        case 'en-US':
          ctrl.settings.language = 'gb'
          break
        case 'de-DE':
          ctrl.settings.language = 'de'
          break
        case 'fr-FR':
          ctrl.settings.language = 'fr'
          break
        case 'es-ES':
          ctrl.settings.language = 'es'
          break
        default:
          ctrl.settings.language = 'gb'
          break
      }
    }
    ctrl.settings.backgroundcolor = (typeof $cookies.get('verbshaker-backgroundcolor') !== 'undefined') ? $cookies.get('verbshaker-backgroundcolor') : ctrl.default.backgroundcolor
    ctrl.settings.font.color = (typeof $cookies.get('verbshaker-fontcolor') !== 'undefined') ? $cookies.get('verbshaker-fontcolor') : ctrl.default.fontcolor
    ctrl.settings.font.size = (typeof $cookies.get('verbshaker-fontsize') !== 'undefined') ? $cookies.get('verbshaker-fontsize') : ctrl.default.fontsize
    ctrl.settings.font.family = (typeof $cookies.get('verbshaker-fontfamily') !== 'undefined') ? $cookies.get('verbshaker-fontfamily') : ctrl.default.fontfamily
    ctrl.settings.hiddenNav = (typeof $cookies.get('verbshaker-hiddenNav') !== 'undefined') ? $cookies.get('verbshaker-hiddenNav') === 'true' : ctrl.default.hiddenNav
    ctrl.settings.proverbbutton = (typeof $cookies.get('verbshaker-proverbbutton') !== 'undefined') ? $cookies.get('verbshaker-proverbbutton') === 'true' : ctrl.default.proverbbutton
    ctrl.settings.autoupdate = (typeof $cookies.get('verbshaker-autoupdate') !== 'undefined') ? parseInt($cookies.get('verbshaker-autoupdate'), 10) : parseInt(ctrl.default.autoupdate, 10)

    // proverb
    ctrl.proverb = 'Click to Load...'
    ctrl.newProverb = function () {
      ctrl.proverb = ''
      $http.get('/api/' + ctrl.settings.language + '/random', {}).then(function (data) {
        ctrl.proverb = data.data.combined
      }, function (error) {
        ctrl.proverb = error.data.message
      })
    }
    ctrl.newProverb()
    ctrl.updateInterval()
    // Share Modal
    ctrl.openModal = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'share.html',
        controller: 'shareController',
        controllerAs: 'ctrl',
        size: 'lg',
        resolve: {
          data: function () {
            return ctrl.proverb
          }
        }
      })
    }
  }
  ])
    .config(['tooltipsConfProvider', function configConf (tooltipsConfProvider) {
      tooltipsConfProvider.configure({
        'size': 'large',
        'speed': 'slow',
        'side': 'bottom'
      })
    }])
}())

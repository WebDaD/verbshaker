/* global angular */
;(function () {
  angular.module('verbshaker', ['ngCookies', 'colorpicker.module', 'ngNumberPicker', '720kb.tooltips', '720kb.socialshare', 'ui.bootstrap', 'ngAnimate']).controller('verbshakerController', ['$http', '$cookies', '$scope', '$window', '$uibModal', function ($http, $cookies, $scope, $window, $uibModal) {
    var ctrl = this
    ctrl.settings = {}
    ctrl.settings.fontfamily = 'LMRoman17-Regular'
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
      $cookies.put('verbshaker-language', ctrl.settings.language)
      $cookies.put('verbshaker-backgroundcolor', ctrl.settings.backgroundcolor)
      $cookies.put('verbshaker-fontcolor', ctrl.settings.fontcolor)
      $cookies.put('verbshaker-fontsize', ctrl.settings.fontsize)
      $cookies.put('verbshaker-fontfamily', ctrl.settings.fontfamily)
      $cookies.put('verbshaker-hiddenNav', ctrl.settings.hiddenNav)
      $cookies.put('verbshaker-proverbbutton', ctrl.settings.proverbbutton)
      $cookies.put('verbshaker-autoupdate', ctrl.settings.autoupdate)
    }
    $scope.$watch(angular.bind(this, function () {
      return this.settings.autoupdate
    }), function (newVal) {
      ctrl.updateInterval()
      ctrl.updateSettings()
    })
    $scope.$watch(angular.bind(this, function () {
      return this.settings.fontsize
    }), function (newVal) {
      ctrl.updateSettings()
    })
    $http.get('/config', {}).then(function (configdata) {
      ctrl.default = configdata.data.default
      ctrl.changeable = configdata.data.changeable

      // Get Languages
      ctrl.languages = []
      $http.get('/api/languages', {}).then(function (data) {
        ctrl.languages = data.data
      }, function (error) {
        ctrl.languages = error.data.message
      })

      // Get Fonts
      ctrl.fonts = []
      $http.get('/fonts', {}).then(function (data) {
        ctrl.fonts = data.data
      }, function (error) {
        ctrl.fonts = error.data.message
      })

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
      ctrl.settings.fontcolor = (typeof $cookies.get('verbshaker-fontcolor') !== 'undefined') ? $cookies.get('verbshaker-fontcolor') : ctrl.default.fontcolor
      ctrl.settings.fontsize = (typeof $cookies.get('verbshaker-fontsize') !== 'undefined') ? $cookies.get('verbshaker-fontsize') : ctrl.default.fontsize
      ctrl.settings.fontfamily = (typeof $cookies.get('verbshaker-fontfamily') !== 'undefined') ? $cookies.get('verbshaker-fontfamily') : ctrl.default.fontfamily
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
    }, function (error) {
      console.error(error)
      ctrl.proverb = 'Error (see console)'
    })
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

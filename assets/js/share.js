/* global angular */
angular.module('verbshaker').controller('shareController', ['$scope', '$uibModalInstance', 'data', function ($scope, $uibModalInstance, data) {
  var ctrl = this
  ctrl.proverb = data
  ctrl.url = 'http://www.verbshaker.eu'
  ctrl.media = 'http://verbshaker.com/images/android-chrome-512x512.png'
  $scope.ok = function () {
    $uibModalInstance.close()
  }
}])

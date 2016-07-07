/* global angular */
angular.module('verbshaker').controller('shareController', ['$scope', '$uibModalInstance', 'data', function ($scope, $uibModalInstance, data) {
  var ctrl = this
  ctrl.proverb = data
  $scope.ok = function () {
    $uibModalInstance.close()
  }
}])

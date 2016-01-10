angular.module('brewItYourself').service('Export', function($uibModal) {

  return function(exportData) {
    return $uibModal.open({
      templateUrl: 'app/shared/dialog/export/dialog-export.modal.html',
      controller: 'ExportModalController',
      controllerAs: 'ExportModal',
      resolve: {
        exportData: function () {
          return exportData;
        }
      }
    }).result;
  };

});

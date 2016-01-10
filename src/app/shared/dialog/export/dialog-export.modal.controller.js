angular.module('brewItYourself').controller('ExportModalController',
    function ($uibModalInstance, exportData) {
        'use strict';

        this.data = _.isString(exportData) ? exportData : JSON.stringify(exportData);

        this.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });

angular.module('brewItYourself').directive('selectOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                this.select();
            });
        }
    };
});

(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length-1].src;
    angular.module('uiglp.ingreso', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/ingreso', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'IngresoController'
            });
        }])
        .controller('IngresoController', IngresoController);


    IngresoController.$inject = [];
    function IngresoController() {

        var vm = this;

    }
})();
(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length-1].src;
    angular.module('uiglp.administracion', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/administracion', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'AdministracionController'
            });
        }])
        .controller('AdministracionController', AdministracionController);


    AdministracionController.$inject = [];
    function AdministracionController() {

        var vm = this;

    }
})();
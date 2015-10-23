(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('uiglp.institucional', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/institucional', {
                templateUrl: currentScriptPath.replace('.min.js', '.html'),
                controller: 'InstitucionalController',
                data: {requiresLogin:false}
            });
        }])
        .controller('InstitucionalController', InstitucionalController);


    InstitucionalController.$inject = ['LoginService', 'LoginState', 'store', '$location'];
    function InstitucionalController(LoginService, LoginState, store, $location) {

        var vm = this;

        vm.seccion = 1;

        function changeSeccion(){
            institucionalCtrl.seccion = (institucionalCtrl.seccion == 1)? 1:institucionalCtrl.seccion + 1;
        }


    }
})();
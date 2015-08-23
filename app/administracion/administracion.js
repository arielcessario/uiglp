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


    AdministracionController.$inject = ['LoginService'];
    function AdministracionController(LoginService) {

        var vm = this;
        vm.usuario = {
            cliente_id: -1,
            nombre:'',
            apellido:'',
            nro_doc:'',
            telefono:'',
            password:'',
            direccion:'',
            mail:''
        };
        vm.usuarios=[];


        vm.saveUsuario = saveUsuario;

        LoginService.getClientes(function(data){
            vm.usuarios = data;
        });


        function saveUsuario(){

        }




    }
})();
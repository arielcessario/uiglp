(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('uiglp.nuevoUsuario', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/nuevo_usuario', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'NuevoUsuarioController',
                data: {requiresLogin:false}
            });
        }])
        .controller('NuevoUsuarioController', NuevoUsuarioController);


    NuevoUsuarioController.$inject = ['LoginService', 'LoginState', 'store', '$location', 'OfertasLaboralesService'];
    function NuevoUsuarioController(LoginService, LoginState, store, $location, OfertasLaboralesService) {

        var vm = this;

        vm.usuario = {
            cliente_id: -1,
            nombre: '',
            apellido: '',
            nro_doc: '',
            telefono: '',
            password: '',
            direccion: '',
            mail: ''
        };

        vm.saveUsuario = saveUsuario;



        function saveUsuario() {
            LoginService.create(vm.usuario, function (data) {
                console.log(data);
            });

        }

    }
})();
(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('uiglp.administracion', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/administracion', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'AdministracionController',
                data: {requiresLogin:true}
            });
        }])
        .controller('AdministracionController', AdministracionController);


    AdministracionController.$inject = ['LoginService', 'LoginState', 'store', '$location', 'OfertasLaboralesService'];
    function AdministracionController(LoginService, LoginState, store, $location, OfertasLaboralesService) {

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

        vm.oferta_laboral = {
            oferta_laboral_id: -1,
            titulo: '',
            detalle: ''
        };

        vm.usuarios = [];
        vm.ofertas_laborales = [];

        vm.saveUsuario = saveUsuario;
        vm.updateUsuario = updateUsuario;
        vm.modificarUsuario = modificarUsuario;

        vm.saveOfertaLaboral = saveOfertaLaboral;
        vm.updateOfertaLaboral = updateOfertaLaboral;
        vm.modificarOfertaLaboral = modificarOfertaLaboral;
        vm.removeOfertaLaboral = removeOfertaLaboral;

        vm.logout = logout;

        function logout(){
            LoginState = false;
            store.remove('jwt');
            $location.path('/ingreso');
        }

        LoginService.getClientes(function (data) {
            console.log(data);
            vm.usuarios = data;
        });

        OfertasLaboralesService.get(function (data) {
            vm.ofertas_laborales = data;
        });


        function modificarUsuario(usuario) {
            vm.usuario = angular.copy(usuario);
            vm.usuario.rol_id = '' + vm.usuario.rol_id;
        }

        function saveUsuario() {
            LoginService.create(vm.usuario, function (data) {
                console.log(data);
            });

        }

        function updateUsuario() {
            LoginService.updateCliente(vm.usuario, function (data) {
                console.log(data);
            });

        }

        function modificarOfertaLaboral(usuario) {
            vm.usuario = angular.copy(usuario);
            vm.usuario.rol_id = '' + vm.usuario.rol_id;
        }

        function saveOfertaLaboral() {
            LoginService.create(vm.usuario, function (data) {
                console.log(data);
            });

        }

        function updateOfertaLaboral() {
            LoginService.updateCliente(vm.usuario, function (data) {
                console.log(data);
            });

        }

        function removeOfertaLaboral() {
            LoginService.updateCliente(vm.usuario, function (data) {
                console.log(data);
            });

        }


    }
})();
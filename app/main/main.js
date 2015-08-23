(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length-1].src;
    angular.module('uiglp.main', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'MainController'
            });
        }])
        .controller('MainController', MainController);


    MainController.$inject = [];
    function MainController() {

        var vm = this;
        vm.agendaMes = 'DICIEMBRE';

        vm.selectImage = selectImage;
        vm.alerta = alerta;
        vm.empresas = [
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''},
            {nombre:'', foto:''}
        ];



        function alerta(){
            var r = confirm('hoa');
            if(r){
                alert(r);
            }
        }



        function selectImage(id){
            console.log(id);
        }
    }
})();
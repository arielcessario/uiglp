(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length-1].src;
    angular.module('uiglp.main', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controllerAs: 'mainCtrl',
                data: {requiresLogin:false}
            });
        }])
        .controller('MainController', MainController);


    MainController.$inject = ['$interval'];
    function MainController($interval) {

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

        vm.slideSelected = 1;

        $interval(autoChangeSlide, 3000);

        function autoChangeSlide(){
            vm.slideSelected = (vm.slideSelected + 1 > 4)? 1 : vm.slideSelected + 1;
        }

        function selectImage(slide){
            vm.slideSelected = slide;
        }

        function alerta(){
            var r = confirm('hoa');
            if(r){
                alert(r);
            }
        }

    }
})();
window.conProductos = 0;(function () {    'use strict';    var scripts = document.getElementsByTagName("script");    var currentScriptPath = scripts[scripts.length-1].src;    angular.module('uiglp.main', ['ngRoute'])    .config(['$routeProvider', function ($routeProvider) {            $routeProvider.when('/', {                templateUrl: currentScriptPath.replace('.js', '.html'),                controllerAs: 'mainCtrl',                data: {requiresLogin:false}            });        }])        .controller('MainController', MainController);    MainController.$inject = ['$interval', 'slidersService', 'NoticiasService'];    function MainController($interval, slidersService, NoticiasService) {        var vm = this;        vm.agendaMes = 'DICIEMBRE';        vm.noticia01 = {};        vm.noticia02 = {};        vm.noticia03 = {};        vm.selectImage = selectImage;        vm.alerta = alerta;        vm.slider_01 = {};        vm.slider_02 = {};        vm.slider_03 = {};        vm.slider_04 = {};        vm.empresas = [            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''},            {nombre:'', foto:''}        ];        vm.slideSelected = 1;        slidersService.getSliders(function (data) {            console.log(data);            var slide01 = angular.element(document.querySelector('#slide-01'));            var slide02 = angular.element(document.querySelector('#slide-02'));            var slide03 = angular.element(document.querySelector('#slide-03'));            var slide04 = angular.element(document.querySelector('#slide-04'));            data[0].precio = 0;            data[1].precio = 0;            data[2].precio = 0;            data[3].precio = 0;            vm.slider_01 = data[0];            vm.slider_02 = data[1];            vm.slider_03 = data[2];            vm.slider_04 = data[3];            slide01[0].style.background = 'black url(img/'+vm.slider_01.imagen+') 50% 50% no-repeat';            slide02[0].style.background = 'black url(img/'+vm.slider_02.imagen+') 50% 50% no-repeat';            slide03[0].style.background = 'black url(img/'+vm.slider_03.imagen+') 50% 50% no-repeat';            slide04[0].style.background = 'black url(img/'+vm.slider_04.imagen+') 50% 50% no-repeat';        });        $interval(autoChangeSlide, 3000);        NoticiasService.getSoloNoticias(function(data){            vm.noticia01 = data[0];            vm.noticia02 = data[1];            vm.noticia03 = data[2];        });        function autoChangeSlide(){            vm.slideSelected = (vm.slideSelected + 1 > 4)? 1 : vm.slideSelected + 1;        }        function selectImage(slide){            vm.slideSelected = slide;        }        function alerta(){            var r = confirm('hoa');            if(r){                alert(r);            }        }    }})();
window.conProductos = 0;(function () {    'use strict';    var scripts = document.getElementsByTagName("script");    var currentScriptPath = scripts[scripts.length - 1].src;    angular.module('uiglp.main', ['ngRoute',['bower_components/ac-angular-slider-manager/slider-manager.min.js']])        .config(['$routeProvider', function ($routeProvider) {            /*$routeProvider.when('/', {                templateUrl: currentScriptPath.replace('.min.js', '.html'),                controllerAs: 'mainCtrl',                data: {requiresLogin: false}            });*/        }])        .controller('MainController', MainController);    MainController.$inject = ['$interval', 'slidersService', 'NoticiasService', '$timeout'];    function MainController($interval, slidersService, NoticiasService, $timeout) {        var vm = this;        vm.noticia01 = {};        vm.noticia02 = {};        vm.noticia03 = {};        vm.fecha = new Date();        vm.anio = vm.fecha.getFullYear();        vm.mes = '' + vm.fecha.getMonth();        vm.meses = [            {id: 0, nombre: 'ENERO'},            {id: 1, nombre: 'FEBRERO'},            {id: 2, nombre: 'MARZO'},            {id: 3, nombre: 'ABRIL'},            {id: 4, nombre: 'MAYO'},            {id: 5, nombre: 'JUNIO'},            {id: 6, nombre: 'JULIO'},            {id: 7, nombre: 'AGOSTO'},            {id: 8, nombre: 'SEPTIEMBRE'},            {id: 9, nombre: 'OCTUBRE'},            {id: 10, nombre: 'NOVIEMBRE'},            {id: 11, nombre: 'DICIEMBRE'}];        vm.agendaMes = vm.meses[vm.fecha.getMonth()];        vm.agendaAnio = vm.anio;        vm.listaEventos = [];        vm.evento = {};        vm.selectImage = selectImage;        vm.selectEvento = selectEvento;        vm.prevMonth = prevMonth;        vm.nextMonth = nextMonth;        vm.slider_01 = {};        vm.slider_02 = {};        vm.slider_03 = {};        vm.slider_04 = {};        vm.slider_05 = {};        vm.slider_06 = {};        vm.slider_07 = {};        vm.empresas = [            {nombre: '', foto: '01.png'},            {nombre: '', foto: '02.png'},            {nombre: '', foto: '03.png'},            {nombre: '', foto: '04.png'},            {nombre: '', foto: '05.png'},            {nombre: '', foto: '06.png'},            {nombre: '', foto: '07.png'},            {nombre: '', foto: '08.png'},            {nombre: '', foto: '09.png'},            {nombre: '', foto: '10.png'},            {nombre: '', foto: '11.png'},            {nombre: '', foto: '12.png'},            {nombre: '', foto: '13.png'},            {nombre: '', foto: '14.png'},            {nombre: '', foto: '15.png'},            {nombre: '', foto: '16.png'},            {nombre: '', foto: '17.png'},            {nombre: '', foto: '18.png'},            {nombre: '', foto: '19.png'},            {nombre: '', foto: '20.png'},            {nombre: '', foto: '21.png'},            {nombre: '', foto: '22.png'},            {nombre: '', foto: '23.png'},            {nombre: '', foto: '24.png'},            {nombre: '', foto: '25.png'},            {nombre: '', foto: '26.png'},            {nombre: '', foto: '27.png'},            {nombre: '', foto: '28.png'},            {nombre: '', foto: '29.png'},            {nombre: '', foto: '30.png'},            {nombre: '', foto: '31.png'},            {nombre: '', foto: '32.png'},            {nombre: '', foto: '33.png'},            {nombre: '', foto: '34.png'},            {nombre: '', foto: '35.png'},            {nombre: '', foto: '36.png'},            {nombre: '', foto: '37.png'},            {nombre: '', foto: '38.png'},            {nombre: '', foto: '39.png'},            {nombre: '', foto: '40.png'},            {nombre: '', foto: '41.png'},            {nombre: '', foto: '42.png'},            {nombre: '', foto: '43.png'},            {nombre: '', foto: '44.png'},            {nombre: '', foto: '45.png'},            {nombre: '', foto: '46.png'},            {nombre: '', foto: '47.png'},            {nombre: '', foto: '48.png'},            {nombre: '', foto: '49.png'},            {nombre: '', foto: '50.png'}        ];        vm.slideSelected = 1;        autoChangeEmpresas();        $interval(autoChangeEmpresas, 5000);        function autoChangeEmpresas() {            var elem01 = vm.empresas.shift();            var elem02 = vm.empresas.shift();            $timeout(function () {                vm.empresas.push(elem01);                vm.empresas.push(elem02);            }, 0);        }        slidersService.getSliders(function (data) {            var slide01 = angular.element(document.querySelector('#slide-01'));            var slide02 = angular.element(document.querySelector('#slide-02'));            var slide03 = angular.element(document.querySelector('#slide-03'));            var slide04 = angular.element(document.querySelector('#slide-04'));            var slide05 = angular.element(document.querySelector('#slide-05'));            var slide06 = angular.element(document.querySelector('#slide-06'));            var slide07 = angular.element(document.querySelector('#slide-07'));            data[0].precio = 0;            data[1].precio = 0;            data[2].precio = 0;            data[3].precio = 0;            data[4].precio = 0;            data[5].precio = 0;            data[6].precio = 0;            vm.slider_01 = data[0];            vm.slider_02 = data[1];            vm.slider_03 = data[2];            vm.slider_04 = data[3];            vm.slider_05 = data[4];            vm.slider_06 = data[5];            vm.slider_07 = data[6];            slide01[0].style.background = 'black url(img/' + vm.slider_01.imagen.replace(' ', '%20') + ') left center no-repeat';            slide02[0].style.background = 'black url(img/' + vm.slider_02.imagen.replace(' ', '%20') + ') left center no-repeat';            slide03[0].style.background = 'black url(img/' + vm.slider_03.imagen.replace(' ', '%20') + ') left center no-repeat';            slide04[0].style.background = 'black url(img/' + vm.slider_04.imagen.replace(' ', '%20') + ') left center no-repeat';            slide05[0].style.background = 'black url(img/' + vm.slider_05.imagen.replace(' ', '%20') + ') left center no-repeat';            slide06[0].style.background = 'black url(img/' + vm.slider_06.imagen.replace(' ', '%20') + ') left center no-repeat';            slide07[0].style.background = 'black url(img/' + vm.slider_07.imagen.replace(' ', '%20') + ') left center no-repeat';        });        $interval(autoChangeSlide, 4000);        NoticiasService.getSoloNoticias(function (data) {            vm.noticia01 = data[0];            vm.noticia02 = data[1];            vm.noticia03 = data[2];        });        getLastEvento();        function getLastEvento() {            NoticiasService.getLastEvento(function (data) {                var year = vm.anio;                var month = vm.agendaMes.id;                var fecha = data.fecha.format('dd-mm-yyyy');                year = parseInt(fecha.split('-')[2]);                month = parseInt(fecha.split('-')[1]) - 1;                vm.agendaMes = vm.meses[month];                getEventos(year, month);            });        }        function getEventos(year, month) {            NoticiasService.getEventosByFecha(year, month, function (data) {                var diasMes = new Date(year, month + 1, 0).getDate();                vm.listaEventos = [];                var event = {};                for (var i = 0; i < (new Date(year, month, 1).getDay()); i++) {                    event = {dia: '', evento: undefined};                    vm.listaEventos.push(event);                }                for (var i = 1; i < diasMes + 1; i++) {                    event = {dia: i, evento: undefined};                    for (var x = 0; x < data.length; x++) {                        if ((new Date(data[x].fecha)).getDate() == i) {                            event.evento = data[x];                        }                    }                    vm.listaEventos.push(event);                }                for (var i = diasMes + 2; i < 50; i++) {                    event = {dia: '', evento: undefined};                    vm.listaEventos.push(event);                }                vm.evento = data[0];            });        }        function nextMonth() {            vm.agendaMes = (vm.agendaMes.id == 11) ? vm.meses[0] : vm.meses[vm.agendaMes.id + 1];            vm.agendaAnio = (vm.agendaMes.id == 0) ? vm.agendaAnio + 1 : vm.agendaAnio;            getEventos(vm.agendaAnio, vm.agendaMes.id);        }        function prevMonth() {            vm.agendaMes = (vm.agendaMes.id == 0) ? vm.meses[11] : vm.meses[vm.agendaMes.id - 1];            vm.agendaAnio = (vm.agendaMes.id == 11) ? vm.agendaAnio - 1 : vm.agendaAnio;            getEventos(vm.agendaAnio, vm.agendaMes.id);        }        function autoChangeSlide() {            vm.slideSelected = (vm.slideSelected + 1 > 7) ? 1 : vm.slideSelected + 1;        }        function selectImage(slide) {            vm.slideSelected = slide;        }        function selectEvento(evento) {            if (evento != undefined) {                vm.evento = evento;            }        }    }})();
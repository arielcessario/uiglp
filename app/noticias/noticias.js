(function () {    'use strict';    var scripts = document.getElementsByTagName("script");    var currentScriptPath = scripts[scripts.length - 1].src;    angular.module('uiglp.noticias', ['ngRoute'])        .config(['$routeProvider', function ($routeProvider) {            $routeProvider.when('/noticias/:id', {                templateUrl: currentScriptPath.replace('.js', '.html'),                controller: 'NoticiasController',                data: {requiresLogin: false}            });        }])        .controller('NoticiasController', NoticiasController);    NoticiasController.$inject = ['NoticiasService', 'LoginState', 'store', 'jwtHelper', '$routeParams', '$location',    'AcUtilsService'];    function NoticiasController(NoticiasService, LoginState, store, jwtHelper, $routeParams, $location,    AcUtilsService) {        var vm = this;        vm.fecha = new Date();        vm.id = $routeParams.id;        vm.meses = [            {nombre: 'Enero', indice: '0'},            {nombre: 'Febrero', indice: '1'},            {nombre: 'Marzo', indice: '2'},            {nombre: 'Abril', indice: '3'},            {nombre: 'Mayo', indice: '4'},            {nombre: 'Junio', indice: '5'},            {nombre: 'Julio', indice: '6'},            {nombre: 'Agosto', indice: '7'},            {nombre: 'Septiembre', indice: '8'},            {nombre: 'Octubre', indice: '9'},            {nombre: 'Noviembre', indice: '10'},            {nombre: 'Diciembre', indice: '11'}        ];        vm.anios = [{anio: 2015}, {anio: 2016}, {anio: 2017}, {anio: 2018}, {anio: 2019}, {anio: 2020}];        vm.noticias = [];        vm.noticia = {};        vm.saveComentario = saveComentario;        vm.anio = vm.fecha.getFullYear();        vm.mes = '' + vm.fecha.getMonth();        vm.changeDate = changeDate;        vm.fotoSelected = '';        vm.user = {data:{rol:0}};        vm.borrarComentario = borrarComentario;        function borrarComentario(index){            console.log(index);            NoticiasService.deleteComentario(vm.noticia.comentarios[index].noticia_comentario_id, function(data){                console.log(data);                vm.noticia.comentarios.splice(index,1);            })        }        if(store.get('jwt')){            vm.user = jwtHelper.decodeToken(store.get('jwt'));        }        function changeDate(){            NoticiasService.getNoticiasByFecha(vm.anio, vm.mes, function (data) {                vm.noticias = data;                vm.noticia = data[0];                vm.fotoSelected = (data.length > 0 && data.fotos[0]!= undefined)?data.fotos[0].foto:'';            });        }        if (vm.id > 0) {            NoticiasService.getNoticiaByID(vm.id, function (data) {                vm.noticia = data;                vm.fotoSelected = (data.fotos[0] == undefined)?'':data.fotos[0].foto;                NoticiasService.getNoticiasByFecha(vm.noticia.fecha.getFullYear(), vm.noticia.fecha.getMonth(), function (data) {                    vm.noticias = data;                    var id = vm.noticia.noticia_id;                    for(var i = 0; i<data.length; i++){                        if(data[i].noticia_id == id){                            vm.noticia = data[i];                        }                    }                });            });        } else {            NoticiasService.getNoticiasByFecha(vm.anio, vm.mes, function (data) {                vm.noticias = data;                vm.noticia = data[0];                vm.fotoSelected = (data[0].fotos[0] == undefined)?'':data[0].fotos[0].foto;            });        }        function saveComentario() {            if(vm.user.data.userId == undefined){                alert('Debe estar registrado para poder realizar comentarios');                return;            }            if(vm.comentario == undefined || vm.comentario.trim() == ''){                AcUtilsService.validations('text-comentario', 'El comentario no debe estar vacío');                return;            }            var comentario = {                noticia_id: vm.noticia.noticia_id,                noticia_comentario_id: -1,                titulo: '',                detalles: vm.comentario,                parent_id: 0,                creador_id: vm.user.data.userId,                creador: [{mail: vm.user.data.userName}],                votos_up: 0,                votos_down: 0,                fecha: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()            };            NoticiasService.saveComentario(comentario, 'saveComentario', function (data) {                comentario.noticia_comentario_id = data;                vm.noticia.comentarios.push(comentario);                vm.comentario = '';            });        }    }})();
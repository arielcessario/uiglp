(function () {    'use strict';    var scripts = document.getElementsByTagName("script")    var currentScriptPath = scripts[scripts.length - 1].src;    angular.module('uiglp.administracion', ['ngRoute'])        .config(['$routeProvider', function ($routeProvider) {            $routeProvider.when('/administracion', {                templateUrl: currentScriptPath.replace('.js', '.html'),                controller: 'AdministracionController',                data: {requiresLogin: true}            });        }])        .controller('AdministracionController', AdministracionController);    AdministracionController.$inject = ['LoginService', 'LoginState', 'store', '$location', 'OfertasLaboralesService',        'jwtHelper', '$scope', 'NoticiasService', 'slidersService', 'RevistasService'];    function AdministracionController(LoginService, LoginState, store, $location, OfertasLaboralesService,                                      jwtHelper, $scope, NoticiasService, slidersService, RevistasService) {        var vm = this;        vm.usuario = {            cliente_id: -1,            nombre: '',            apellido: '',            nro_doc: '',            telefono: '',            password: '',            direccion: '',            mail: ''        };        vm.oferta_laboral = {            oferta_laboral_id: -1,            titulo: '',            detalle: '',            cliente_id: 0        };        vm.noticia = {            noticia_id: -1,            titulo: '',            detalles: '',            fecha: new Date(),            creador_id: 0,            vistas: 0,            tipo: '0',            fotos: [],            comentarios: []        };        vm.revista = {            revista_id: -1,            nombre: '',            link: ''        };        vm.usuarios = [];        vm.ofertas_laborales = [];        vm.noticias = [];        vm.revistas = [];        vm.slider_01 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 1,            precio: 0,            producto_id: 0        };        vm.slider_02 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 2,            precio: 0,            producto_id: 0        };        vm.slider_03 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 3,            precio: 0,            producto_id: 0        };        vm.slider_04 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 4,            precio: 0,            producto_id: 0        };        vm.sliders = [];        var foto = {};        vm.fotoNoticia01 = {name: 'file_add.png'};        vm.fotoNoticia02 = {name: 'file_add.png'};        vm.fotoNoticia03 = {name: 'file_add.png'};        vm.fotoNoticia04 = {name: 'file_add.png'};        vm.saveUsuario = saveUsuario;        vm.removeUsuario = removeUsuario;        vm.updateUsuario = updateUsuario;        vm.modificarUsuario = modificarUsuario;        vm.saveOfertaLaboral = saveOfertaLaboral;        vm.modificarOfertaLaboral = modificarOfertaLaboral;        vm.removeOfertaLaboral = removeOfertaLaboral;        vm.resetOferta = resetOferta;        vm.agregarImagenNoticia = agregarImagenNoticia;        vm.saveNoticia = saveNoticia;        vm.modificarNoticia = modificarNoticia;        vm.removeNoticia = removeNoticia;        vm.resetNoticia = resetNoticia;        vm.modificarRevista = modificarRevista;        vm.removeRevista = removeRevista;        vm.resetRevista = resetRevista;        vm.saveRevista = saveRevista;        vm.logout = logout;        vm.agregarImagenSlider = agregarImagenSlider;        vm.saveSliders = saveSliders;        vm.fotoSlider01 = {};        vm.fotoSlider02 = {};        vm.fotoSlider03 = {};        vm.fotoSlider04 = {};        vm.user = jwtHelper.decodeToken(store.get('jwt'));        function logout() {            LoginState = false;            store.remove('jwt');            $location.path('/ingreso');        }        if (vm.user.data.rol == 1) {            slidersService.getSliders(function (data) {                data[0].precio = 0;                data[1].precio = 0;                data[2].precio = 0;                data[3].precio = 0;                vm.slider_01 = data[0];                vm.slider_02 = data[1];                vm.slider_03 = data[2];                vm.slider_04 = data[3];            });            NoticiasService.getNoticias(function (data) {                vm.noticias = data;            });            LoginService.getClientes(function (data) {                vm.usuarios = data;            });        } else {            LoginService.getClienteById(vm.user.data.userId, function (data) {                vm.usuario = data;            });        }        getOfertasMain();        function getOfertasMain() {            if (vm.user.data.rol == 1) {                OfertasLaboralesService.get(function (data) {                    vm.ofertas_laborales = data;                });            } else {                OfertasLaboralesService.getByCliente(vm.user.data.userId, function (data) {                    vm.ofertas_laborales = data;                });            }        }        getRevistas();        function getRevistas(){            RevistasService.get(function(data){                vm.revistas = data;            })        }        function modificarRevista(revista) {            vm.revista = angular.copy(revista);        }        function saveRevista() {            var _function = 'save';            if (vm.revista.revista_id != -1) {                _function = 'update';            }            RevistasService.save(_function, vm.revista, function (data) {                console.log(data);                RevistasService.get(function (data) {                    vm.revistas = data;                    resetRevista();                    getRevistas();                });            });        }        function resetRevista(){            vm.revista = {                revista_id: -1,                nombre: '',                link: ''            };        }        function removeRevista(){            RevistasService.remove(vm.revista, function(data){                console.log(data);            })        }        function modificarUsuario(usuario) {            vm.usuario = angular.copy(usuario);            vm.usuario.rol_id = '' + vm.usuario.rol_id;        }        function saveUsuario() {            LoginService.create(vm.usuario, function (data) {                console.log(data);                LoginService.getClientes(function (data) {                    vm.usuarios = data;                });            });        }        function removeUsuario() {            LoginService.deleteCliente(vm.usuario.cliente_id, function (data) {                console.log(data);                LoginService.getClientes(function (data) {                    vm.usuarios = data;                });            });        }        function updateUsuario() {            LoginService.updateCliente(vm.usuario, function (data) {                console.log(data);                LoginService.getClientes(function (data) {                    vm.usuarios = data;                });            });        }        function modificarOfertaLaboral(oferta) {            vm.oferta_laboral = angular.copy(oferta);        }        function saveOfertaLaboral() {            if (vm.oferta_laboral.oferta_laboral_id == -1) {                OfertasLaboralesService.create(vm.oferta_laboral, function (data) {                    console.log(data);                    resetOferta();                    getOfertasMain();                });            } else {                OfertasLaboralesService.update(vm.oferta_laboral, function (data) {                    console.log(data);                    resetOferta();                    getOfertasMain();                });            }        }        function resetOferta() {            vm.oferta_laboral = {                oferta_laboral_id: -1,                titulo: '',                detalle: '',                cliente_id: 0            };        }        function removeOfertaLaboral() {            OfertasLaboralesService.remove(vm.usuario, function (data) {                console.log(data);            });        }        function agregarImagenNoticia(filelist, index) {            console.log(filelist);            for (var i = 0; i < filelist.length; ++i) {                var file = filelist.item(i);                switch (index) {                    case 1:                        vm.fotoNoticia01 = {};                        vm.fotoNoticia01 = file;                        uploadImages(file);                        break;                    case 2:                        vm.fotoNoticia02 = {};                        vm.fotoNoticia02 = file;                        uploadImages(file);                        break;                    case 3:                        vm.fotoNoticia03 = {};                        vm.fotoNoticia03 = file;                        uploadImages(file);                        break;                    case 4:                        vm.fotoNoticia04 = {};                        vm.fotoNoticia04 = file;                        uploadImages(file);                        break;                }                foto = {};                foto.foto = file.name;                foto.main = 1;            }        }        function uploadImages(file, tipo) {            var form_data = new FormData();            form_data.append('images', file);            var ajax = new XMLHttpRequest();            ajax.onprogress = function () {            };            ajax.onload = function (data) {                console.log(data);                $scope.$apply();            };            ajax.open("POST", "bower_components/ac-angular-noticias/upload.php");            ajax.send(form_data);        }        function saveNoticia() {            vm.noticia.fotos = [];            if (vm.fotoNoticia01.name !== undefined) {                foto = {};                foto.foto = vm.fotoNoticia01.name;                foto.main = 1;                vm.noticia.fotos.push(foto);            }            if (vm.fotoNoticia02.name !== undefined) {                foto = {};                foto.foto = vm.fotoNoticia02.name;                foto.main = 0;                vm.noticia.fotos.push(foto);            }            if (vm.fotoNoticia03.name !== undefined) {                foto = {};                foto.foto = vm.fotoNoticia03.name;                foto.main = 0;                vm.noticia.fotos.push(foto);            }            if (vm.fotoNoticia04.name !== undefined) {                foto = {};                foto.foto = vm.fotoNoticia04.name;                foto.main = 0;                vm.noticia.fotos.push(foto);            }            if (vm.noticia.noticia_id == -1) {                NoticiasService.save(vm.noticia, 'saveNoticia', function (data) {                    resetNoticia();                    NoticiasService.getNoticias(function (data) {                        vm.noticias = data;                    });                });            } else {                NoticiasService.save(vm.noticia, 'updateNoticia', function (data) {                    resetNoticia();                    NoticiasService.getNoticias(function (data) {                        vm.noticias = data;                    });                });            }        }        function modificarNoticia(noticia) {            vm.noticia = angular.copy(noticia);            vm.noticia.tipo = '' + vm.noticia.tipo;            vm.fotoNoticia01.name = (vm.noticia.fotos[0] !== undefined) ? vm.noticia.fotos[0].foto : undefined;            vm.fotoNoticia02.name = (vm.noticia.fotos[1] !== undefined) ? vm.noticia.fotos[1].foto : undefined;            vm.fotoNoticia03.name = (vm.noticia.fotos[2] !== undefined) ? vm.noticia.fotos[2].foto : undefined;            vm.fotoNoticia04.name = (vm.noticia.fotos[3] !== undefined) ? vm.noticia.fotos[3].foto : undefined;        }        function removeNoticia() {        }        function resetNoticia() {            vm.noticia = {                noticia_id: -1,                titulo: '',                detalles: '',                fecha: new Date(),                creador_id: 0,                vistas: 0,                tipo: '0',                fotos: [],                comentarios: []            };            var foto = {};            vm.fotoNoticia01 = {};            vm.fotoNoticia02 = {};            vm.fotoNoticia03 = {};            vm.fotoNoticia04 = {};        }        function saveSliders() {            if (vm.fotoSlider01.name !== undefined) {                vm.slider_01.imagen = vm.fotoSlider01.name;            }            if (vm.fotoSlider02.name !== undefined) {                vm.slider_02.imagen = vm.fotoSlider02.name;            }            if (vm.fotoSlider03.name !== undefined) {                vm.slider_03.imagen = vm.fotoSlider03.name;            }            if (vm.fotoSlider04.name !== undefined) {                vm.slider_04.imagen = vm.fotoSlider04.name;            }            vm.slider_01.producto_id = -1;            vm.slider_02.producto_id = -1;            vm.slider_03.producto_id = -1;            vm.slider_04.producto_id = -1;            vm.sliders.push(vm.slider_01);            vm.sliders.push(vm.slider_02);            vm.sliders.push(vm.slider_03);            vm.sliders.push(vm.slider_04);            slidersService.saveSlider(vm.sliders, 'saveSlider', function (data) {                console.log(data);            });        }        function agregarImagenSlider(filelist, index) {            for (var i = 0; i < filelist.length; ++i) {                var file = filelist.item(i);                switch (index) {                    case 1:                        vm.fotoSlider01 = {};                        vm.fotoSlider01 = file;                        vm.slider_01.imagen = vm.fotoSlider01.name;                        uploadImages(file);                        break;                    case 2:                        vm.fotoSlider02 = {};                        vm.fotoSlider02 = file;                        vm.slider_02.imagen = vm.fotoSlider02.name;                        uploadImages(file);                        break;                    case 3:                        vm.fotoSlider03 = {};                        vm.fotoSlider03 = file;                        vm.slider_03.imagen = vm.fotoSlider03.name;                        uploadImages(file);                        break;                    case 4:                        vm.fotoSlider04 = {};                        vm.fotoSlider04 = file;                        vm.slider_04.imagen = vm.fotoSlider04.name;                        uploadImages(file);                        break;                }            }        }    }})();
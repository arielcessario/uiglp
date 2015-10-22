(function () {    'use strict';    var scripts = document.getElementsByTagName("script")    var currentScriptPath = scripts[scripts.length - 1].src;    angular.module('uiglp.administracion', ['ngRoute'])        .config(['$routeProvider', function ($routeProvider) {            $routeProvider.when('/administracion', {                templateUrl: currentScriptPath.replace('.min.js', '.html'),                controller: 'AdministracionController',                data: {requiresLogin: true}            });        }])        .controller('AdministracionController', AdministracionController);    AdministracionController.$inject = ['LoginService', 'LoginState', 'store', '$location', 'OfertasLaboralesService',        'jwtHelper', '$scope', 'NoticiasService', 'slidersService', 'RevistasService', 'AcUtilsService', 'AcUtilsGlobals'];    function AdministracionController(LoginService, LoginState, store, $location, OfertasLaboralesService,                                      jwtHelper, $scope, NoticiasService, slidersService, RevistasService, AcUtilsService, AcUtilsGlobals) {        var vm = this;        vm.usuario = {            cliente_id: -1,            nombre: '',            apellido: '',            nro_doc: '',            telefono: '',            password: '',            direccion: '',            mail: '',            rol_id: '0'        };        vm.oferta_laboral = {            oferta_laboral_id: -1,            titulo: '',            detalle: '',            cliente_id: 0        };        vm.noticia = {            noticia_id: -1,            titulo: '',            detalles: '',            fecha: new Date(),            creador_id: 0,            vistas: 0,            tipo: '0',            fotos: [],            comentarios: []        };        vm.revista = {            revista_id: -1,            nombre: '',            link: ''        };        vm.usuarios = [];        vm.ofertas_laborales = [];        vm.noticias = [];        vm.revistas = [];        vm.slider_01 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 1,            precio: 0,            producto_id: 0        };        vm.slider_02 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 2,            precio: 0,            producto_id: 0        };        vm.slider_03 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 3,            precio: 0,            producto_id: 0        };        vm.slider_04 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 4,            precio: 0,            producto_id: 0        };        vm.slider_04 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 4,            precio: 0,            producto_id: 0        };        vm.slider_05 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 5,            precio: 0,            producto_id: 0        };        vm.slider_06 = {            titulo: '',            descripcion: '',            imagen: 'file_add.png',            slider_id: 6,            precio: 0,            producto_id: 0        };        vm.sliders = [];        var foto = {};        vm.fotoNoticia01 = {name: 'file_add.png'};        vm.fotoNoticia02 = {name: 'file_add.png'};        vm.fotoNoticia03 = {name: 'file_add.png'};        vm.fotoNoticia04 = {name: 'file_add.png'};        vm.saveUsuario = saveUsuario;        vm.removeUsuario = removeUsuario;        vm.updateUsuario = updateUsuario;        vm.modificarUsuario = modificarUsuario;        vm.resetUsuario = resetUsuario;        vm.saveOfertaLaboral = saveOfertaLaboral;        vm.modificarOfertaLaboral = modificarOfertaLaboral;        vm.removeOfertaLaboral = removeOfertaLaboral;        vm.resetOferta = resetOferta;        vm.agregarImagenNoticia = agregarImagenNoticia;        vm.saveNoticia = saveNoticia;        vm.modificarNoticia = modificarNoticia;        vm.removeNoticia = removeNoticia;        vm.resetNoticia = resetNoticia;        vm.modificarRevista = modificarRevista;        vm.removeRevista = removeRevista;        vm.resetRevista = resetRevista;        vm.saveRevista = saveRevista;        vm.logout = logout;        vm.agregarImagenSlider = agregarImagenSlider;        vm.saveSliders = saveSliders;        vm.fotoSlider01 = {};        vm.fotoSlider02 = {};        vm.fotoSlider03 = {};        vm.fotoSlider04 = {};        vm.fotoSlider05 = {};        vm.fotoSlider06 = {};        vm.fotoSlider07 = {};        vm.user = jwtHelper.decodeToken(store.get('jwt'));        function logout() {            LoginState = false;            store.remove('jwt');            $location.path('/ingreso');        }        if (vm.user.data.rol == 1) {            slidersService.getSliders(function (data) {                data[0].precio = 0;                data[1].precio = 0;                data[2].precio = 0;                data[3].precio = 0;                data[4].precio = 0;                data[5].precio = 0;                data[6].precio = 0;                vm.slider_01 = data[0];                vm.slider_02 = data[1];                vm.slider_03 = data[2];                vm.slider_04 = data[3];                vm.slider_05 = data[4];                vm.slider_06 = data[5];                vm.slider_07 = data[6];            });            NoticiasService.getNoticias(function (data) {                vm.noticias = data;            });            LoginService.getClientes(function (data) {                vm.usuarios = data;            });        } else {            LoginService.getClienteById(vm.user.data.userId, function (data) {                vm.usuario = data;            });        }        getOfertasMain();        function getOfertasMain() {            if (vm.user.data.rol == 1) {                OfertasLaboralesService.get(function (data) {                    vm.ofertas_laborales = data;                });            } else {                OfertasLaboralesService.getByCliente(vm.user.data.userId, function (data) {                    vm.ofertas_laborales = data;                });            }        }        getRevistas();        function getRevistas() {            RevistasService.get(function (data) {                vm.revistas = data;            })        }        function modificarRevista(revista) {            vm.revista = angular.copy(revista);        }        function saveRevista() {            var conErrores = false;            if (vm.revista.nombre.trim().length == 0) {                AcUtilsService.validations('revista-nombre', 'El nombre es obligatorio');                conErrores = true;            }            if (vm.revista.link.trim().length == 0) {                AcUtilsService.validations('revista-link', 'El link es obligatorio');                conErrores = true;            }            if (conErrores) {                return;            }            var _function = 'save';            if (vm.revista.revista_id != -1) {                _function = 'update';            }            RevistasService.save(_function, vm.revista, function (data) {                console.log(data);                RevistasService.get(function (data) {                    vm.revistas = data;                    resetRevista();                    getRevistas();                });            });        }        function resetRevista() {            vm.revista = {                revista_id: -1,                nombre: '',                link: ''            };        }        function removeRevista() {            var r = confirm('Realmente desea borrar la revista?');            if (!r) {                return;            }            RevistasService.remove(vm.revista, function (data) {                resetRevista();                getRevistas();            })        }        function modificarUsuario(usuario) {            vm.usuario = angular.copy(usuario);            vm.usuario.rol_id = '' + vm.usuario.rol_id;            var elem = angular.element(document.querySelector('#nombre'));            elem[0].focus();        }        function resetUsuario() {            vm.usuario = {                cliente_id: -1,                nombre: '',                apellido: '',                nro_doc: '',                telefono: '',                password: '',                direccion: '',                mail: '',                rol_id: '0'            };        }        function saveUsuario() {            LoginService.create(vm.usuario, function (data) {                LoginService.getClientes(function (data) {                    vm.usuarios = data;                });            });        }        function removeUsuario() {            LoginService.deleteCliente(vm.usuario.cliente_id, function (data) {                LoginService.getClientes(function (data) {                    vm.usuarios = data;                });            });        }        function updateUsuario() {            var conErrores = false;            if (vm.usuario.cliente_id == -1) {                AcUtilsService.validations('nombre', 'Debe seleccionar un usuario');                conErrores = true;                return;            }            if (vm.usuario.nombre.trim().length == 0) {                AcUtilsService.validations('nombre', 'El nombre es obligatorio');                conErrores = true;            }            if (vm.usuario.apellido.trim().length == 0) {                AcUtilsService.validations('apellido', 'El apellido es obligatorio');                conErrores = true;            }            if (vm.usuario.nro_doc.trim().length == 0) {                AcUtilsService.validations('cuit', 'El CUIT es obligatorio');                conErrores = true;            }            if (vm.usuario.telefono.trim().length == 0) {                AcUtilsService.validations('telefono', 'El teléfono es obligatorio');                conErrores = true;            }            /*if (vm.usuario.password.trim().length == 0) {             //    AcUtilsService.validations('password', 'El password es obligatorio');             //    conErrores = true;             //}*/            if (vm.usuario.direccion.trim().length == 0) {                AcUtilsService.validations('direccion', 'La dirección es obligatoria');                conErrores = true;            }            if (vm.usuario.rol_id == undefined) {                AcUtilsService.validations('rol', 'Debe asignar un rol');                conErrores = true;            }            if (!AcUtilsService.validateEmail(vm.usuario.mail)) {                AcUtilsService.validations('mail', 'El mail es incorrecto');                conErrores = true;            }            if (conErrores) {                return;            }            LoginService.updateCliente(vm.usuario, function (data) {                LoginService.getClientes(function (data) {                    vm.usuarios = data;                    vm.usuario = {                        cliente_id: -1,                        nombre: '',                        apellido: '',                        nro_doc: '',                        telefono: '',                        password: '',                        direccion: '',                        mail: '',                        rol_id: '0'                    };                });            });        }        function modificarOfertaLaboral(oferta) {            vm.oferta_laboral = angular.copy(oferta);        }        function saveOfertaLaboral() {            var conErrores = false;            if (vm.oferta_laboral.titulo.trim().length == 0) {                AcUtilsService.validations('oferta-titulo', 'El título es obligatorio');                conErrores = true;            }            if (vm.oferta_laboral.detalle.trim().length == 0) {                AcUtilsService.validations('oferta-detalle', 'La descripción es obligatoria');                conErrores = true;            }            if (conErrores) {                return;            }            if (vm.oferta_laboral.oferta_laboral_id == -1) {                OfertasLaboralesService.create(vm.oferta_laboral, function (data) {                    resetOferta();                    getOfertasMain();                });            } else {                OfertasLaboralesService.update(vm.oferta_laboral, function (data) {                    resetOferta();                    getOfertasMain();                });            }        }        function resetOferta() {            vm.oferta_laboral = {                oferta_laboral_id: -1,                titulo: '',                detalle: '',                cliente_id: 0            };        }        function removeOfertaLaboral() {            var r = confirm('Realmente desea eliminar la oferta?');            if (!r) {                return;            }            OfertasLaboralesService.remove(vm.oferta_laboral, function (data) {                resetOferta();                getOfertasMain();            });        }        function agregarImagenNoticia(filelist, index) {            for (var i = 0; i < filelist.length; ++i) {                var file = filelist.item(i);                switch (index) {                    case 1:                        vm.fotoNoticia01 = {};                        vm.fotoNoticia01 = file;                        uploadImages(file);                        break;                    case 2:                        vm.fotoNoticia02 = {};                        vm.fotoNoticia02 = file;                        uploadImages(file);                        break;                    case 3:                        vm.fotoNoticia03 = {};                        vm.fotoNoticia03 = file;                        uploadImages(file);                        break;                    case 4:                        vm.fotoNoticia04 = {};                        vm.fotoNoticia04 = file;                        uploadImages(file);                        break;                }                foto = {};                foto.foto = file.name;                foto.main = 1;            }        }        function uploadImages(file, tipo) {            var form_data = new FormData();            /* Limito la subida de archivos a 400kb*/            if (file.size > 400000) {                alert('No se puede subir un archivo que sea mayor a 400k');                return;            }            form_data.append('images', file);            var ajax = new XMLHttpRequest();            ajax.onprogress = function () {            };            ajax.onload = function (data) {                $scope.$apply();            };            ajax.open("POST", "bower_components/ac-angular-noticias/upload.php");            ajax.send(form_data);        }        function saveNoticia() {            var conErrores = false;            if (vm.fotoNoticia01.name == 'file_add.png' &&                vm.fotoNoticia02.name == 'file_add.png' &&                vm.fotoNoticia03.name == 'file_add.png' &&                vm.fotoNoticia04.name == 'file_add.png') {                AcUtilsService.validations('noticia-foto', 'Al menos debe subir una foto');                conErrores = true;            }            if (vm.noticia.titulo.trim().length == 0) {                AcUtilsService.validations('noticia-titulo', 'El título es obligatorio');                conErrores = true;            }            if (vm.noticia.detalles.trim().length == 0) {                AcUtilsService.validations('noticia-detalles', 'La descripción es obligatoria');                conErrores = true;            }            if (vm.noticia.fecha == undefined) {                AcUtilsService.validations('noticia-fecha', 'La fecha no es válida');                conErrores = true;            }            if (conErrores) {                return;            }            vm.noticia.fotos = [];            if (vm.fotoNoticia01.name !== undefined) {                foto = {};                foto.foto = vm.fotoNoticia01.name;                foto.main = 1;                vm.noticia.fotos.push(foto);            }            if (vm.fotoNoticia02.name !== undefined) {                foto = {};                foto.foto = vm.fotoNoticia02.name;                foto.main = 0;                vm.noticia.fotos.push(foto);            }            if (vm.fotoNoticia03.name !== undefined) {                foto = {};                foto.foto = vm.fotoNoticia03.name;                foto.main = 0;                vm.noticia.fotos.push(foto);            }            if (vm.fotoNoticia04.name !== undefined) {                foto = {};                foto.foto = vm.fotoNoticia04.name;                foto.main = 0;                vm.noticia.fotos.push(foto);            }            if (vm.noticia.noticia_id == -1) {                NoticiasService.save(vm.noticia, 'saveNoticia', function (data) {                    resetNoticia();                    NoticiasService.getNoticias(function (data) {                        vm.noticias = data;                    });                });            } else {                NoticiasService.save(vm.noticia, 'updateNoticia', function (data) {                    resetNoticia();                    NoticiasService.getNoticias(function (data) {                        vm.noticias = data;                    });                });            }        }        function modificarNoticia(noticia) {            vm.noticia = angular.copy(noticia);            vm.noticia.tipo = '' + vm.noticia.tipo;            vm.fotoNoticia01.name = (vm.noticia.fotos[0] !== undefined) ? vm.noticia.fotos[0].foto : undefined;            vm.fotoNoticia02.name = (vm.noticia.fotos[1] !== undefined) ? vm.noticia.fotos[1].foto : undefined;            vm.fotoNoticia03.name = (vm.noticia.fotos[2] !== undefined) ? vm.noticia.fotos[2].foto : undefined;            vm.fotoNoticia04.name = (vm.noticia.fotos[3] !== undefined) ? vm.noticia.fotos[3].foto : undefined;            AcUtilsGlobals.broadcast();        }        function removeNoticia() {            var r = confirm('Realmente desea eliminar la noticia?');            if (!r) {                return;            }            NoticiasService.deleteNoticia(vm.noticia.noticia_id, function (data) {                resetNoticia();                NoticiasService.getNoticias(function (data) {                    vm.noticias = data;                });            })        }        function resetNoticia() {            vm.noticia = {                noticia_id: -1,                titulo: '',                detalles: '',                fecha: new Date(),                creador_id: 0,                vistas: 0,                tipo: '0',                fotos: [],                comentarios: []            };            var foto = {};            vm.fotoNoticia01 = {};            vm.fotoNoticia02 = {};            vm.fotoNoticia03 = {};            vm.fotoNoticia04 = {};            vm.fotoNoticia01.name = 'file_add.png';            vm.fotoNoticia02.name = 'file_add.png';            vm.fotoNoticia03.name = 'file_add.png';            vm.fotoNoticia04.name = 'file_add.png';        }        function saveSliders() {            var conErrores = false;            /*if (vm.slider_01.titulo.trim().length == 0) {                AcUtilsService.validations('slider-01-titulo', 'El título es obligatorio');                conErrores = true;            }*/            if (vm.slider_01.descripcion.trim().length == 0) {                AcUtilsService.validations('slider-01-descripcion', 'La descripción es obligatoria');                conErrores = true;            }            /*if (vm.slider_02.titulo.trim().length == 0) {                AcUtilsService.validations('slider-02-titulo', 'El título es obligatorio');                conErrores = true;            }*/            if (vm.slider_02.descripcion.trim().length == 0) {                AcUtilsService.validations('slider-02-descripcion', 'La descripción es obligatoria');                conErrores = true;            }            /*if (vm.slider_03.titulo.trim().length == 0) {                AcUtilsService.validations('slider-03-titulo', 'El título es obligatorio');                conErrores = true;            }*/            if (vm.slider_03.descripcion.trim().length == 0) {                AcUtilsService.validations('slider-03-descripcion', 'La descripción es obligatoria');                conErrores = true;            }            /*if (vm.slider_04.titulo.trim().length == 0) {                AcUtilsService.validations('slider-04-titulo', 'El título es obligatorio');                conErrores = true;            }*/            if (vm.slider_04.descripcion.trim().length == 0) {                AcUtilsService.validations('slider-04-descripcion', 'La descripción es obligatoria');                conErrores = true;            }            /*if (vm.slider_05.titulo.trim().length == 0) {                AcUtilsService.validations('slider-05-titulo', 'El título es obligatorio');                conErrores = true;            }*/            if (vm.slider_05.descripcion.trim().length == 0) {                AcUtilsService.validations('slider-05-descripcion', 'La descripción es obligatoria');                conErrores = true;            }            /*if (vm.slider_06.titulo.trim().length == 0) {                AcUtilsService.validations('slider-06-titulo', 'El título es obligatorio');                conErrores = true;            }*/            if (vm.slider_06.descripcion.trim().length == 0) {                AcUtilsService.validations('slider-06-descripcion', 'La descripción es obligatoria');                conErrores = true;            }            /*if (vm.slider_07.titulo.trim().length == 0) {                AcUtilsService.validations('slider-07-titulo', 'El título es obligatorio');                conErrores = true;            }*/            if (vm.slider_04.descripcion.trim().length == 0) {                AcUtilsService.validations('slider-04-descripcion', 'La descripción es obligatoria');                conErrores = true;            }            if (conErrores) {                return;            }            if (vm.fotoSlider01.name !== undefined) {                vm.slider_01.imagen = vm.fotoSlider01.name;            }            if (vm.fotoSlider02.name !== undefined) {                vm.slider_02.imagen = vm.fotoSlider02.name;            }            if (vm.fotoSlider03.name !== undefined) {                vm.slider_03.imagen = vm.fotoSlider03.name;            }            if (vm.fotoSlider04.name !== undefined) {                vm.slider_04.imagen = vm.fotoSlider04.name;            }            if (vm.fotoSlider05.name !== undefined) {                vm.slider_05.imagen = vm.fotoSlider05.name;            }            if (vm.fotoSlider06.name !== undefined) {                vm.slider_06.imagen = vm.fotoSlider06.name;            }            if (vm.fotoSlider07.name !== undefined) {                vm.slider_07.imagen = vm.fotoSlider07.name;            }            vm.slider_01.producto_id = -1;            vm.slider_02.producto_id = -1;            vm.slider_03.producto_id = -1;            vm.slider_04.producto_id = -1;            vm.slider_05.producto_id = -1;            vm.slider_06.producto_id = -1;            vm.slider_07.producto_id = -1;            vm.sliders.push(vm.slider_01);            vm.sliders.push(vm.slider_02);            vm.sliders.push(vm.slider_03);            vm.sliders.push(vm.slider_04);            vm.sliders.push(vm.slider_05);            vm.sliders.push(vm.slider_06);            vm.sliders.push(vm.slider_07);            slidersService.saveSlider(vm.sliders, 'saveSlider', function (data) {                console.log(data);            });        }        function agregarImagenSlider(filelist, index) {            for (var i = 0; i < filelist.length; ++i) {                var file = filelist.item(i);                switch (index) {                    case 1:                        vm.fotoSlider01 = {};                        vm.fotoSlider01 = file;                        vm.slider_01.imagen = vm.fotoSlider01.name;                        uploadImages(file);                        break;                    case 2:                        vm.fotoSlider02 = {};                        vm.fotoSlider02 = file;                        vm.slider_02.imagen = vm.fotoSlider02.name;                        uploadImages(file);                        break;                    case 3:                        vm.fotoSlider03 = {};                        vm.fotoSlider03 = file;                        vm.slider_03.imagen = vm.fotoSlider03.name;                        uploadImages(file);                        break;                    case 4:                        vm.fotoSlider04 = {};                        vm.fotoSlider04 = file;                        vm.slider_04.imagen = vm.fotoSlider04.name;                        uploadImages(file);                        break;                    case 5:                        vm.fotoSlider05 = {};                        vm.fotoSlider05 = file;                        vm.slider_05.imagen = vm.fotoSlider05.name;                        uploadImages(file);                        break;                    case 6:                        vm.fotoSlider06 = {};                        vm.fotoSlider06 = file;                        vm.slider_06.imagen = vm.fotoSlider06.name;                        uploadImages(file);                        break;                    case 7:                        vm.fotoSlider07 = {};                        vm.fotoSlider07 = file;                        vm.slider_07.imagen = vm.fotoSlider07.name;                        uploadImages(file);                        break;                }            }        }    }})();
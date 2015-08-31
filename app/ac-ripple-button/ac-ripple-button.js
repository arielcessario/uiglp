(function () {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acRipple', ['ngRoute'])
        .directive('acRipple', AcRipple);


    AcRipple.$inject = ['$location', '$timeout'];

    function AcRipple($location, $timeout) {
        return {
            restrict: 'C',
            scope: {

                rippleColor: '@'
            },
            controller: AcRippleController,
            link: function (scope, element, attrs) {
                element.on('click', function (event) {
                    event.preventDefault();

                    var $div = angular.element('<div></div>'),
                    //btnOffset = $(this).offset(),
                        xPos = event.pageX - element[0].offsetLeft,
                        yPos = event.pageY - element[0].offsetTop;

                    $div.addClass('ripple-effect');
                    //var $ripple = angular.element(".ripple-effect");
                    var $ripple = $div;

                    $ripple.css("height", element[0].clientHeight);
                    $ripple.css("width", element[0].clientHeight);
                    $div.css({
                        top: yPos + 'px',
                        left: xPos + 'px',
                        background: scope.rippleColor
                    });
                    element.append($div);

                    $timeout(function () {
                        $div.remove();
                    }, 2000);
                });
            },
            controllerAs: 'AcRippleCtrl'
        };
    }


    AcRippleController.$inject = ["$http", "$scope"];
    function AcRippleController($http, $scope) {
        var vm = this;

    }

})();

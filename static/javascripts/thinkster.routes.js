(function(){
    'use strict';

    angular.module('thinkster.routes')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/register', {
                controller: 'RegisterController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/authentication/register.html'
            })
            .otherwise('/');
        }]);
})();

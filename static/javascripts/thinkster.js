(function(){
    'use strict';

    angular.module('thinkster', [
        'thinkster.routes',
        'thinkster.authentication',
        'thinkster.config',
        'thinkster.layout'
    ]);

    angular.module('thinkster.routes', ['ngRoute']);

    angular.module('thinkster.config', []);

    // CSRF Protection for POST, PUT, PATCH, DELETE
    angular.module('thinkster')
        .run(['$http', function($http){
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
        }])
})();

(function(){
    'use strict';

    angular.module('thinkster.authentication.services')
        .factory('Authentication', ['$cookies', '$http', function($cookies, $http){
            return {
                register: function(email, password, username){
                    return $http.post('/api/v1/accounts/', {
                        username: username,
                        password: password,
                        email: email
                    });
                }
            };
        }]);
})();

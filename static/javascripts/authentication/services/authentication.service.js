(function(){
    'use strict';

    angular.module('thinkster.authentication.services')
        .factory('Authentication', ['$cookies', '$http', 
            function($cookies, $http) {
        var Authentication = {
            register: register,
            login: login,
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthencticated,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate,
            logout: logout
        }

        return Authentication;

        function register(email, password, username){
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            })
            .then(function(data, status, headers, config){
                // Registration successful, login user
                Authentication.login(email, password);
            }, function(data, status, headers, config){
                // Registration failed
                console.log('Epic Failure!');
            });
        }

        function login(email, password){
            return $http.post('/api/v1/auth/login/', {
                email: email,
                password: password
            })
            .then(function(data, status, headers, config){
                // Login Success function
                Authentication.setAuthenticatedAccount(data.data);
                window.location = '/';

            }, function(data, status, headers, config){
                // Login failure function.
                console.log("Epic Failure!");
            });
        }

        function getAuthenticatedAccount(){
            if(!$cookies.authenticatedAccount){
                return;
            }
            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthencticated(){
            return !!$cookies.authenticatedAccount;
        }

        function setAuthenticatedAccount(account){
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticate(){
            delete $cookies.authenticatedAccount;

        }

        function logout(){
            return $http.post('/api/v1/auth/logout/').then(
                    function(data, status, headers, config){
                // Logout success function
                Authentication.unauthenticate();
                window.location = '/';
            }, function(data, status, headers, config){
                // Logout out error fn
                console.log('Epic Failure!');
            });
        }
    }]);

})();

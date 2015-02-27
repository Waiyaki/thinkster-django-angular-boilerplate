/*
    Authentication
    @namespace thinkster.authentication.services
*/

(function(){
    'use strict'

    angular
        .module('thinkster.authentication.services')
            .factory('Authentication', Authentication);

    Authentication.inject = ['$cookies', '$http'];

    /*
      @namespace Authentication
      @return {Factory}
    */

    function Authentication($cookies, $http) {
        /*
          @name Authentication
          @desc The Factory to be returned
        */
        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            setAuthenticatedAccount: setAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            unauthenticate: unauthenticate,
            register: register,
            login: login
        };
        return Authentication;

        // Try and Register the account using the provided email and password. Returns a Promise.
        function register(email, password, username) {
            return $http.post('api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccessFn, registerErrorFn);

            // Log the new user in, if registration was successful
            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(email, password);
            }

            // Log "Epic failure!" to the console if unsuccessful
            function registerErrorFn(data, status, headers, config) {
                console.error("Epic failure!");
            }
        }

        // Try and log in the user using the credentials provided. Returns a Promise.
        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email,
                password: password
            }).then(loginSuccessFn, loginErrorFn);

            // loginSuccessFn: Set the authenticatedAccount and redirect to index.
            function loginSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount(data.data);
                window.location = '/';
            }

            // loginErrorFn: Log "Epic failure!" to the console.
            function loginErrorFn(data, status, headers, config) {
                console.error("Epic failure!");
            }
        }

        // Return the currently authenticated account.
        // Returns object if authenticated, else 'undefined'.
        function getAuthenticatedAccount() {
            if(!$cookies.authenticatedAccount){
                return;
            }
            return JSON.parse($cookies.authenticatedAccount);
        }

        // Check whether a user is authenticated.
        // Returns true if authenticated, else false.
        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        // Set the authenticated account in a cookie using stringify.
        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account)
        }

        // Unauthenticate: Delete the cookie where the user object is stored.
        // Returns undefined.
        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }
    }
})();
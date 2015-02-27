/*
* Register controller
* @namespace thinkster.authentication.controllers
*/

(function(){
    'use strict';

    angular
        .module('thinkster.authentication.controllers')
            .controller('RegisterController', RegisterController);
            
    RegisterController.$inject = ['$location', '$scope', 'Authentication'];

    // @namespace RegisterController

    function RegisterController($location, $scope, Authentication){
        var vm = this;
        vm.register = register;

        activate(); // Actions to be performed once this controller is instantiated.

        // Register a new user
        function register(){
            Authentication.register(vm.email, vm.password, vm.username);
        }

        function activate() {
            // If the user is authenticated, they shouldn't be here.
            if(Authentication.isAuthenticated())
                $location.url('/');
        }
    }
})();
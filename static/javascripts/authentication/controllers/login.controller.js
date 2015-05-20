(function(){
    'use strict';

    angular.module('thinkster.authentication.controllers')
        .controller('LoginController', ['$location', '$scope', 'Authentication',
            function($location, $scope, Authentication){
                var vm = this;

                vm.login = function(){
                    Authentication.login(vm.email, vm.password);
                }

                var activate = function(){
                    // Redirect the user if they are already authenticated
                    if(Authentication.isAuthenticated()){
                        $location.path('/');
                    }
                };

                activate();
            }])
})();

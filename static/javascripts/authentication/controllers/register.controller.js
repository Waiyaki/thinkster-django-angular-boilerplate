(function(){
    'use strict';
    
    angular.module('thinkster.authentication.controllers')
        .controller('RegisterController', ['$location', '$scope', 'Authentication',
            function($location, $scope, Authentication){
                var vm = this;
                vm.register = function(){
                    Authentication.register(vm.email, vm.password, vm.username);
                };
            }]);
})();

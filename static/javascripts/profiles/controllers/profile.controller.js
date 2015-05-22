(function(){
    'use strict';

    angular.module('thinkster.profiles.controllers')
        .controller('ProfileController', [
            '$location', '$routeParams', 'Posts', 'Profile', 'Snackbar',
            function($location, $routeParams, Posts, Profile, Snackbar){
                var vm = this;

                vm.profile = undefined;

                vm.posts = [];

                function activate(){
                    var username = $routeParams.username.substr(1);
                    Profile.get(username).then(function(data, status, headers, config){
                        vm.profile = data.data;
                    }, function(data, status, headers, config){
                        console.log(data.data);
                        console.log(status)
                        $location.path('/');
                        Snackbar.error('That user does not exist');
                    });

                    Posts.get(username).then(function(data, status, headers, config){
                        vm.posts = data.data;
                    }, function(data, status, headers, config){
                        Snackbar.error(data.data.error);
                        console.log(data.data);
                    });
                }

                activate();

            }]);
})();

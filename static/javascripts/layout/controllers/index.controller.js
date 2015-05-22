(function(){
    'use strict';

    angular.module('thinkster.layout.controllers')
        .controller('IndexController', ['$scope', 'Authentication', 'Posts', 'Snackbar',
            function($scope, Authentication, Posts, Snackbar){
                var vm = this;

                vm.isAuthenticated = Authentication.isAuthenticated();
                vm.posts = [];

                var activate = function(){
                    Posts.all().then(function(data, status, headers, config){
                        vm.posts = data.data;
                    }, function(data, status, headers, config){
                        Snackbar.error(data.error);
                    });

                    $scope.$on('post.created', function(event, post){
                        vm.posts.unshift(post);
                    });

                    $scope.$on('post.created.error', function(){
                        vm.posts.shift();
                    });
                }

                activate();
            }])
})();

(function(){
    'use strict';

    angular.module('thinkster.posts.controllers')
        .controller('NewPostController', [
            '$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts',
            function($rootScope, $scope, Authentication, Snackbar, Posts){
                var vm = this;

                vm.submit = function(){
                    $rootScope.$broadcast('post.created', {
                        content: vm.content,
                        author: {
                            username: Authentication.getAuthenticatedAccount().username
                        }
                    });

                    $scope.closeThisDialog();

                    Posts.create(vm.content).then(function(data, status, headers, config){
                        Snackbar.show('Success! Post created.');
                    }, function(data, status, headers, config){
                        $rootScope.$broadcast('post.created.error');
                        Snackbar.error(data.error);
                    });
                }
            }]);
})();

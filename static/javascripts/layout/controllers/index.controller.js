// IndexController

(function() {
    'use strict';

    angular
        .module('thinkster.layout.controllers')
            .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

    function IndexController($scope, Authentication, Posts, Snackbar) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.posts = [];

        activate(); // Actions to be performed upon the instantiation of this Controller.

        function activate() {
            Posts.all().then(postSuccessFn, postErrorFn);

            $scope.$on('post.create', function(event, post){
                vm.posts.unshift(post);
            });

            $scope.$on('post.create.error', function(){
                vm.posts.shift();
            });

            // Update posts array on view
            function postSuccessFn(data, status, headers, config) {
                vm.posts = data.data;
            }

            // Show snackbar with error
            function postErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();
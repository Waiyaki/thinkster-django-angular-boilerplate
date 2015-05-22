(function(){
    'use strict';

    angular.module('thinkster.posts.directives')
        .directive('posts', [function(){
            return {
                controller: 'PostsController',
                controllerAs: 'vm',
                restrict: 'E',
                scope: {
                    posts: '='
                },
                templateUrl: '/static/templates/posts/posts.html'
            };
        }]);
})();

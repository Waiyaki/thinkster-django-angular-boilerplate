(function(){
    'use strict';

    angular.module('thinkster.posts.directives')
        .directive('post', [function(){
            return {
                restrict: 'E',
                scope: {
                    post: '='
                },
                templateUrl: '/static/templates/posts/post.html'
            };
        }]);
})();

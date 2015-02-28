(function() {
    'use strict';

    angular
        .module('thinkster.posts.services')
            .factory('Posts', Posts);

    // Factory service
    function Posts($http) {
        var Posts = {
            all: all,
            create: create,
            get: get
        };

        return Posts;

        // Get all Posts
        function all() {
            return $http.get('/api/v1/posts/');
        }

        // Create a new post
        function create(content) {
            return $http.post('/api/v1/posts/', {
                content: content
            });
        }


        // Get the posts of a given user
        function get(username) {
            return $http.get('/api/v1/account/' + username + '/posts/');
        }
    }
})();
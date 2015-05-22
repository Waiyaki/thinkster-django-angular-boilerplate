(function($, _){
    'use strict';

    angular.module('thinkster.utils.services')
        .factory('Snackbar', [function(){

            function _snackbar(content, options){
                options = _.extend({timeout: 3000}, options);
                options.content = content;

                $.snackbar(options);
            }


            return {
                error: function(content, options){
                    _snackbar('Error: ' + content, options);
                },

                show: function(content, options){
                    _snackbar(content, options);
                }
            };
        }]);
})($, _);

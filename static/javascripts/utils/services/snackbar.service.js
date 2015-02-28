// Snackbar service

(function($, _) {
    'use strict';

    angular
        .module('thinkster.utils.services')
            .factory('Snackbar', Snackbar);

    function Snackbar() {
        var Snackbar = {
            error: error,
            show: show
        };

        return Snackbar;

        // Function _snackbar: Displays a snackbar.
        // content: Content to display
        // options: Options for displaying the snackbar
        function _snackbar(content, options) {
            options = _.extend({timeout: 3000}, options);
            options.content = content;

            $.snackbar(options);
        }

        // Display an error snackbar
        function error(content, options) {
            _snackbar('Error: ' + content, options);
        }

        // Display a standard snackbar
        function show(content, options) {
            _snackbar(content, options);
        }
    }
})($, _);

'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));
    }
};
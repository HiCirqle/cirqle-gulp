'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('jshint', function () {
            return gulp.src('app/scripts/**/*.js')
                .pipe($.jshint())
                .pipe($.jshint.reporter('jshint-stylish'))
        });
    }
};
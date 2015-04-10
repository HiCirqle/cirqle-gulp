'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('vendor', function () {
            return gulp.src([
                './vendor/*.*',
            ], {
                dot: true
            }).pipe(gulp.dest('.tmp/vendor/'));
        });
    }
};
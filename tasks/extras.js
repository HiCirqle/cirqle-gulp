'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('extras', function () {
            return gulp.src([
                'app/*.*',
                '!app/*.html'
            ], {
                dot: true
            }).pipe(gulp.dest('.tmp'));
        });
    }
};
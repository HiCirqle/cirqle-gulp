'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('fonts', function() {
            return gulp.src('app/fonts/**/*.{eot,svg,ttf,wof,woff2}')
                .pipe(gulp.dest('.tmp/fonts'))
        });
    }
};

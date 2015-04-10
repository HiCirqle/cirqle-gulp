'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('images', function () {
            return gulp.src('app/images/**/*')
                .pipe($.cache($.imagemin({
                    progressive: true,
                    interlaced: true,
                    // don't remove IDs from SVGs, they are often used
                    // as hooks for embedding and styling
                    svgoPlugins: [{
                        cleanupIDs: false
                    }]
                })))
                .pipe(gulp.dest('.tmp/images'))
                .pipe(gulp.dest('./dist/images'));
        });
    }
};
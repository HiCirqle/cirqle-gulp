'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('scripts', function() {
            return gulp.src('app/scripts/**/*.js')
                .pipe($.es6Transpiler({
                    disallowUnknownReferences: false
                }))
                .pipe($.replaceTask({
                    patterns: patterns
                }))
                .pipe(gulp.dest('.tmp/scripts'));
        });
    }
};
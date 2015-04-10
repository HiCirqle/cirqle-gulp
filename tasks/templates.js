'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('templates', function() {
            return gulp.src('app/views/partials/**/*.' + config.templateExt)
                // Use jade for the templates 
                .pipe($.if(config.templateExt === 'jade', $.jade({
                    pretty: true
                })))
                .pipe($.plumber())
                // Swap out the API link
                .pipe($.replaceTask({
                    patterns: patterns
                }))
                .pipe($.angularTemplatecache({
                    module: 'templatescache',
                    standalone: true,
                    root: '/partials/'
                }))
                .pipe(gulp.dest('.tmp/scripts'));
        });
    }
};
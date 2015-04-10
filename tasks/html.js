'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('html', function () {
            return gulp.src('app/index.' + config.templateExt)
                // Use jade for the templates 
                .pipe($.if(config.templateExt === 'jade', $.jade({
                    pretty: true
                })))
                .pipe($.inject(gulp.src('./app/scripts/**/*.js', {
                    read: false
                }), {
                    relative: true,
                    addRootSlash: true
                }))
                .pipe($.if(config.env === 'development', $.injectReload({
                    port: config.livereload
                })))
                .pipe(gulp.dest('.tmp'));
        });
    }
};
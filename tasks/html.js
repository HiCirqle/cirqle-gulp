'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        if (config.env === 'development' || require('yargs').argv.livereload) {
            console.log('Setting live reload')
        }
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
                .pipe($.if(config.env === 'development' || require('yargs').argv.livereload, $.injectReload({
                    port: config.livereload
                })))
                .pipe(gulp.dest('.tmp'));
        });
    }
};
'use strict';

module.exports = function(gulp, $, config, patterns, dependancies) {
    return function() {
        gulp.task('serve', function () {
            var superstatic = require('superstatic/lib/server');
            var app = superstatic({
                config: {
                    root: ".tmp/",
                    clean_urls: true,
                    debug: true,
                    cache_control: {
                        "**": false,
                        "/": false
                    },
                    routes: {
                        "**": "index.html"
                    }
                },
                port: config.port
            }).listen();
            console.log('Now listening on http://localhost:' + config.port);
            
            $.livereload.listen({
                port: config.livereload
            });
                        
            // watch for changes
            gulp.watch([
                [config.root, '.tmp/*.html'].join('/'),
                [config.root, '.tmp/scripts/**/*.js'].join('/'),
                [config.root, '.tmp/styles/**/*.css'].join('/'),
                [config.root, '.tmp/images/**/*'].join('/'),
            ]).on('change', function(event) {
                console.log('Changed', event.path);
                $.livereload.changed(event.path);
            });

            gulp.watch([config.root, 'app/styles/**/*.s*ss'].join('/'), ['styles']);
            gulp.watch([config.root, 'app/scripts/**/*.js'].join('/'), ['scripts']);
            gulp.watch([config.root, 'app/views/partials/**/*.' + config.templateExt].join('/'), ['templates']);
            gulp.watch([config.root, 'app/*.' + config.templateExt].join('/'), ['html']);
        });
    }
};
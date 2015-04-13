'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('build', function () {
            var assets = $.useref.assets({
                searchPath: '.tmp'
            });
            console.log([config.root, '.tmp'].join('/'), [config.root, 'dist'].join('/'))
            return gulp.src('.tmp/index.html')
                .pipe(assets) // Get assets from index.html
                .pipe($.rev()) // Apply version names to built files
                /*.pipe($.if('*.js', $.uglify({ // concat and uglify js
                    mangle: false // Do not mangle variable names for Angular
                })))*/
                .pipe($.if('*.css', $.minifyCss())) // Minify css
                .pipe(assets.restore()) // Rewrite unversioned filerefs in index.html
                .pipe($.revReplace({
                    prefix: '/'
                })) // Replace filerefs with version
                .pipe($.useref())
                .pipe(gulp.dest('dist')) // Write versioned files to dist
                .pipe($.size({
                    showFiles: true
                }));
        });
    }
};
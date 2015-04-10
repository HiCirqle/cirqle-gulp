'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('build', function () {
            var assets = $.useref.assets({
                searchPath: [config.root, '.tmp'].join('/')
            });
            return gulp.src([config.root, '.tmp/index.html'].join('/'))
                .pipe(assets) // Get assets from index.html
                .pipe($.rev()) // Apply version names to built files
                /*.pipe($.if('*.js', $.uglify({ // concat and uglify js
                    mangle: false // Do not mangle variable names for Angular
                })))*/
                .pipe($.if('*.css', $.minifyCss())) // Minify css
                .pipe(assets.restore()) // Rewrite unversioned filerefs in index.html
                .pipe($.revReplace()) // Replace filerefs with version
                .pipe($.useref())
                .pipe(gulp.dest([config.root, 'dist'].join('/'))) // Write versioned files to dist
                .pipe($.size({
                    showFiles: true
                }));
        });
    }
};
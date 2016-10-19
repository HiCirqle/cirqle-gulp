'use strict';

var _ = require('underscore'),
    gulpIf = require('gulp-if');

module.exports = function(gulp, $, config, patterns) {
    return function() {
        gulp.task('styles', function () {
            return gulp.src([config.root, 'app/styles/main.s*ss'].join('/'))
                .pipe($.plumber())
                .pipe(gulpIf(config.env === 'development', $.sourcemaps.init()))
                .pipe($.sass(_.extend({
                    outputStyle: 'nested', // libsass doesn't support expanded yet
                    precision: 10,
                    includePaths: ['.'],
                    onError: console.error.bind(console, 'Sass error:')
                }, config.sass || {})))
                .pipe($.postcss([
                    require('autoprefixer-core')({browsers: ['last 1 version']})
                ]))
                .pipe(gulpIf(config.env === 'development', $.sourcemaps.write('/maps')))
                .pipe(gulp.dest([config.root, '.tmp/styles'].join('/')));
        });
    }
};
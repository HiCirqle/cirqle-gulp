'use strict';
var stylish = require('jshint-stylish'),
    _ = require('underscore'),
    fs = require('fs');
var packageJSON  = require('../package');
var jshintConfig = packageJSON.jshintConfig;
jshintConfig.lookup = false;

module.exports = function(gulp, $, config, patterns) {
    var jshintrc = JSON.parse(fs.readFileSync('./.jshintrc', 'utf8')) || {};
    jshintConfig = _.extend(jshintConfig, jshintrc);

    return function() {
        gulp.task('scripts', function() {
            return gulp.src('app/scripts/**/*.js')
                .pipe($.plumber())
                .pipe($.jshint(jshintConfig))
                .pipe($.jshint.reporter(stylish))
                // Dont't fail in non-production build
                .pipe($.jshint.reporter('default'))
                // jshint test stop when failed on production
                .pipe($.if(process.env.NODE_ENV === 'production', $.jshint.reporter('fail')))
                .pipe($.cached('scripts'))                
                .pipe($.babel())
                .pipe($.replaceTask({
                    patterns: patterns,
                }))
                .pipe($.plumber())
                .pipe(gulp.dest('.tmp/scripts'));
        });
    }
};

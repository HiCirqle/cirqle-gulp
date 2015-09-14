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
                .pipe($.jshint(jshintConfig)) // jshint test
                // .pipe($.jshint.reporter('default', { verbose: true })) // reporter
                .pipe($.jshint.reporter(stylish)) // reporter
                .pipe($.jshint.reporter('fail')) // jshint test stop when failed
                .pipe($.plumber())
                .pipe($.cached('scripts'))
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

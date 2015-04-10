'use strict';

var mainBowerFiles = require('main-bower-files');

module.exports = function(gulp, $, config, patterns) {
    return function() {
        return gulp.task('bower-components', function() {
            return gulp.src(mainBowerFiles({
                paths: {
                    // Allow the bower configuration to be overwritten
                    bowerDirectory: config.bowerDirectory || [config.root, 'bower_components'].join('/'),
                    bowerrc: config.bowerrc || [config.root, '.bowerrc'].join('/'),
                    bowerJson: config.bowerJson || [config.root, 'bower.json'].join('/')
                }
            }))
            .pipe(gulp.dest([config.root, '.tmp/bower_components'].join('/')));
        });
    }
};
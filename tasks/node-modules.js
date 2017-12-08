'use strict';

module.exports = function(gulp, $, config, patterns) {
    return function() {
        return gulp.task('node-modules', function() {
            return gulp.src([
                // [config.root, 'node_modules/es6-shim/es6-shim.js'].join('/'),
                // [config.root, 'node_modules/systemjs/dist/system-polyfills.js'].join('/'),
                // [config.root, 'node_modules/systemjs/dist/system.src.js'].join('/'),
                // [config.root, 'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js'].join('/'),
                // [config.root, 'node_modules/angular2/bundles/angular2-polyfills.js'].join('/'),
                [config.root, 'node_modules/rxjs/bundles/Rx.umd.js'].join('/'),
                [config.root, 'node_modules/angular2/bundles/angular2-polyfills.js'].join('/'),
                [config.root, 'node_modules/angular2/bundles/angular2-all.umd.dev.js'].join('/'),
            ])
            .pipe(gulp.dest([config.root, '.tmp/node_modules'].join('/')));
        });
    }
};

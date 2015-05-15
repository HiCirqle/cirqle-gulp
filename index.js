'use strict';

module.exports = function(gulp) {

    // generated on 2015-03-20 using generator-gulp-webapp 0.3.0
    //var gulp = require('gulp'),
    var    _ = require('lodash'),
        fs = require('fs'),
        yargs = require('yargs'),
        $ = require('gulp-load-plugins')();

    // Which config file to use to swap out @@ replacements
    var env = yargs.argv.env || 'production';

    // Holds the gulp configuration for ports etc
    var config = _.extend({
        templateExt: 'html',
        env: env,
        root: process.env.PWD
    }, JSON.parse(fs.readFileSync('./build/config.json', 'utf8')));

    // Variable for the replace tasks
    var replacements = JSON.parse(fs.readFileSync('./build/' + env + '.json', 'utf8'));
    var patterns = [];
    _.each(replacements, function(value, key) {
        patterns.push({
            match: key,
            replacement: value
        })
    });

    // All gulp tasks are located in the ./build/tasks directory
    // Gulp configuration is in files in ./build directory
    /*exports.getTask = function(task) {
        //return function() {
        return require([__dirname, '/tasks/', task].join(''))(gulp, $, config, patterns);
        //}
    }*/

    var getTask = function(task) {

    //function getTask(task) {
        //return require('./build/tasks/' + task)(gulp, $, config, patterns);
        return require([__dirname, '/tasks/', task].join(''))(gulp, $, config, patterns);
    }
    /*
    module.exports = function(task) {
        return function() {
            require([__dirname, '/tasks/', task].join(''))(gulp, $, config, patterns);
        }
    };*/
    return {
        getTask: getTask,
    };

}

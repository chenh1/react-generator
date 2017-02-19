'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var generator = require('../generators/app/index.js');
console.log

describe('react-test:app', function() {
    describe('default', function() {
        //testing file creation
        before(function(done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withArguments(['MyCoolApp'])
                .withOptions({ skipInstall: true }) //skipInstall is camelcase in test only
                .on('end', done);
        });

        it('creates files', function() {
            //check if the list of files below are created
            assert.file([
                '../app/package.json',
                '../app/src/app.js'
            ])
        });
        
        //testing file contents
        it('adds default app', function() {
            //test for default app name
            assert.fileContent('../app/src/app.js', /'app/);
        });
    });

    //test for user custom input
    describe('app prompt', function() {
        //assuming the user enters "testApp"
        before(function(done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withArguments(['MyCoolApp'])
                .withOptions({ skipInstall: true }) //skipInstall is camelcase in test only
                .withPrompts({ name: 'testApp' })
                .on('end', done);
        });

        //checks to see if "testApp" is, in fact, the name
        it('injects custom appName', function() {
            assert.fileContent('../test-app/src/app.js', /'testApp/);
        })
    })
})
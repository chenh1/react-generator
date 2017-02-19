'use strict';

var Generator = require('yeoman-generator');
var _ = require('lodash');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.name = args[0];
        console.log('inside reactComponent subgen', this.name);
    }

    writing() {
        var rootGenerator = this;

        this.fs.copyTpl(
            this.templatePath('ParentComponent.js'),
            this.destinationPath('../' + _.kebabCase(rootGenerator.config.get('appName')) + '/src/components/' + this.name + '.js'),
            {
                ComponentName: this.name,
                ActionsName: _.camelCase(this.name) + 'Actions'
            }
        )
        /*
        this.fs.copyTpl(
            this.templatePath('parentComponentActions.js'),
            this.destinationPath('../' + _.kebabCase(rootGenerator.config.get('appName')) + '/src/actions/' + _.camelCase(this.name) + 'Actions.js')
        )

        this.fs.copyTpl(
            this.templatePath('parentComponentReducer.js'),
            this.destinationPath('../' + _.kebabCase(rootGenerator.config.get('appName')) + '/src/reducers/' + _.camelCase(this.name) + 'Reducer.js'),
            {
                ReducerName: _.camelCase(this.name) + 'Reducer'
            }
        )
        */
    }
}

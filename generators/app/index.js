'use strict';

var Generator = require('yeoman-generator');
var _ = require('lodash');
var chalk = require('chalk');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        //Generator.apply(this, args);
        
        this.argument('appName', {type: String, required: true})
        this.appName = _.kebabCase(args[0]);
        
        this.log('name:', this.appName);
        this.log(chalk.cyan('           .+oo+/-    .:+ooo-     '));
        this.log(chalk.cyan('         `y/   ./s/:s+-`  .h-     '));
        this.log(chalk.cyan('         .h.    `/yso`     s/     '));
        this.log(chalk.cyan('         `y/`.-:sy/:sy/-...h-     '));
        this.log(chalk.cyan('      .:/+sh+/ss------oy//yy+/:.` '));
        this.log(chalk.cyan('    -o+-.` oooo``/oo+. /s/y` `-/o/     '));
        this.log(chalk.cyan('    y+     `hy` :hhhhs  oh/     .h.     '));
        this.log(chalk.cyan('    -o+-.  oooo``/os+. /s/y` `-/o/     '));
        this.log(chalk.cyan('      .:/+oh+/ss-.--.-+y//yy+//.`  =====  =====     =      ====  ===== '));
        this.log(chalk.cyan('         `y/..-:sy/:sy/-...h-      =    = =        = =    =    =   =   '));
        this.log(chalk.cyan('         .h.    `/yso`     y/      =====  =====   =====   =        =   '));
        this.log(chalk.cyan('         `y:   ./s+/o+-`  `h-      =  =   =      =     =  =    =   =   '));
        this.log(chalk.cyan('          .+o++/-    .:+++o-       =   =  ===== =       =  ====    =   '));
        
        this.option('includerouter', {
            desc: 'Optionally includes react-router',
            type: Boolean,
            default: false
        });
    }

    initializing() {
        this.log('initializing')
    }

    prompting() {
        this.log('Welcome to Your React-Redux Application!');

        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Please input your application name:',
            default: 'app'
        }]).then((answers) => {
            this.appName = answers.name;
            this.config.set('appName', answers.name);
            this.config.save();
            this.log('app name', answers.name);
        });
    }

    configuring() {

    }

    writing() {
        var packageJson = {
            name: this.appName,
            version: '1.0.0',
            description: '',
            scripts: {},
            author: '',
            license: 'MIT',
            dependencies: {},
            devDependencies: {}
        };

        packageJson.scripts['sass'] = 'sass src/styles/style.scss src/styles/style.css';
        packageJson.scripts['sass:watch'] = 'sass --watch src/styles/:src/styles/';
        packageJson.scripts['prestart'] = 'babel-node tools/startMessage.js';
        packageJson.scripts['start'] = 'npm-run-all --parallel sass sass:watch test:watch open:src lint:watch';
        packageJson.scripts['open:src'] = 'babel-node tools/srcServer.js';
        packageJson.scripts['lint'] = 'node_modules/.bin/esw webpack.config.* src tools';
        packageJson.scripts['lint:watch'] = 'npm run lint -- --watch';
        packageJson.scripts['test'] = 'mocha --reporter progress tools/testSetup.js \"src/**/*.test.js\"';
        packageJson.scripts['test:watch'] = 'npm run test -- --watch';
        packageJson.scripts['clean-dist'] = 'npm run remove-dist && mkdir dist';
        packageJson.scripts['remove-dist'] = 'node_modules/.bin/rimraf ./dist';
        packageJson.scripts['build:html'] = 'babel-node tools/buildHtml.js';
        packageJson.scripts['prebuild'] = 'npm-run-all sass clean-dist test lint build:html';
        packageJson.scripts['build'] = 'babel-node tools/build.js';
        packageJson.scripts['postbuild'] = 'babel-node tools/distServer.js';

        packageJson.dependencies['babel-polyfill'] = '6.8.0';
        packageJson.dependencies['react'] = '15.0.2';
        packageJson.dependencies['react-dom'] = '15.0.2';
        packageJson.dependencies['react-redux'] = '4.4.5';
        //if (this.options.includerouter) {
        packageJson.dependencies['react-router'] = '2.4.0';
        packageJson.dependencies['react-router-redux'] = '4.0.4';
        //}
        packageJson.dependencies['redux'] = '3.5.2';
        packageJson.dependencies['redux-thunk'] = '2.0.1';
        packageJson.dependencies['toastr'] = '2.1.2';
        packageJson.dependencies['yeoman-generator'] = "1.1.0";

        packageJson.devDependencies['babel-cli'] = '6.8.0';
        packageJson.devDependencies['babel-core'] = '6.8.0';
        packageJson.devDependencies['babel-loader'] = '6.2.4';
        packageJson.devDependencies['babel-plugin-react-display-name'] = '2.0.0';
        packageJson.devDependencies['babel-preset-es2015'] = '6.6.0';
        packageJson.devDependencies['babel-preset-react'] = '6.5.0';
        packageJson.devDependencies['babel-preset-react-hmre'] = '1.1.1';
        packageJson.devDependencies['babel-register'] = '6.8.0';
        packageJson.devDependencies['colors'] = '1.1.2';
        packageJson.devDependencies['compression'] = '1.6.1';
        packageJson.devDependencies['cross-env'] = '1.0.7';
        packageJson.devDependencies['css-loader'] = '0.23.1';
        packageJson.devDependencies['enzyme'] = '2.2.0';
        packageJson.devDependencies['eslint'] = '2.9.0';
        packageJson.devDependencies['eslint-plugin-import'] = '1.6.1';
        packageJson.devDependencies['eslint-plugin-react'] = '5.0.1';
        packageJson.devDependencies['eslint-watch'] = '2.1.11';
        packageJson.devDependencies['eventsource-polyfill'] = '0.9.6';
        packageJson.devDependencies['expect'] = '1.19.0';
        packageJson.devDependencies['express'] = '4.13.4';
        packageJson.devDependencies['extract-text-webpack-plugin'] = '1.0.1';
        packageJson.devDependencies['file-loader'] = '0.8.5';
        packageJson.devDependencies['jsdom'] = '8.5.0';
        packageJson.devDependencies['mocha'] = '2.4.5';
        packageJson.devDependencies['nock'] = '8.0.0';
        packageJson.devDependencies['node-sass'] = '4.5.0';
        packageJson.devDependencies['npm-run-all'] = '1.8.0';
        packageJson.devDependencies['open'] = '0.0.5';
        packageJson.devDependencies['postcss-loader'] = '1.2.2';
        packageJson.devDependencies['react-addons-test-utils'] = '15.0.2';
        packageJson.devDependencies['redux-immutable-state-invariant'] = '1.2.3';
        packageJson.devDependencies['redux-mock-store'] = '1.0.2';
        packageJson.devDependencies['rimraf'] = '2.5.2';
        packageJson.devDependencies['sass-loader'] = '4.1.1';
        packageJson.devDependencies['style-loader'] = '0.13.1';
        packageJson.devDependencies['url-loader'] = '0.5.7';
        packageJson.devDependencies['webpack'] = '1.13.0';
        packageJson.devDependencies['webpack-dev-middleware'] = '1.6.1';
        packageJson.devDependencies['webpack-hot-middleware'] = '2.10.0';

        this.fs.writeJSON('../' + _.kebabCase(this.appName) + '/package.json', packageJson);

        this.fs.copyTpl(
            this.templatePath('webpack.config.dev.js'),
            this.destinationPath('../' + _.kebabCase(this.appName) + 'webpack.config.dev.js')
        );

        this.fs.copyTpl(
            this.templatePath('webpack.config.prod.js'),
            this.destinationPath('../' + _.kebabCase(this.appName) + 'webpack.config.prod.js')
        );

        this.fs.copyTpl(
            this.templatePath('_index.html'),
            this.destinationPath('../' + _.kebabCase(this.appName) + '/src/index.html'),
            {
                appName: _.startCase(this.appName),
                appId: _.kebabCase(this.appName)
            }
        );

        this.fs.copyTpl(
            this.templatePath('_index.js'),
            this.destinationPath('../' + _.kebabCase(this.appName) + '/src/index.js'),
            {
                appId: _.kebabCase(this.appName)
            }
        );

        this.fs.copyTpl(
            this.templatePath('_index.test.js'),
            this.destinationPath('../' + _.kebabCase(this.appName) + '/src/index.test.js')
        );

        this.fs.copyTpl(
            this.templatePath('_routes.js'),
            this.destinationPath('../' + _.kebabCase(this.appName) + '/src/routes.js'),
            {
                appId: _.kebabCase(this.appName)
            }
        );

        this.fs.copyTpl(
            this.templatePath('_App.js'),
            this.destinationPath('../' + _.kebabCase(this.appName) + '/src/components/App.js')
        );

        this.fs.copyTpl(
            this.templatePath('reducers/_index.js'),
            this.destinationPath('../' + _.kebabCase(this.appName) + '/src/reducers/index.js')
        );

        this.fs.copyTpl(
            this.templatePath('reducers/_initialState.js'),
            this.destinationPath('../' + _.kebabCase(this.appName) + '/src/reducers/initialState.js')
        );

        this.fs.copy(
            this.templatePath('tools/'),
            this.destinationPath('../' + _.kebabCase(this.appName) + '/tools/')
        );

        this.fs.copy(
            this.templatePath('store/'),
            this.destinationPath('../' + _.kebabCase(this.appName) + '/store/')
        );
    }

    conflicts() {

    }

    install() {
        //this.npmInstall();
    }

    end() {

    }
}


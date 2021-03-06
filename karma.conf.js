module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: [
          'bower_components/jquery/dist/jquery.js',
		'bower_components/angular/angular.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'bower_components/angular-cookies/angular-cookies.js',
		'bower_components/bootstrap/dist/js/bootstrap.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
		'bower_components/angular-translate/angular-translate.js',
		'bower_components/angular-dialog-service/dist/dialogs.min.js',
		'bower_components/angular-dialog-service/dist/dialogs-default-translations.min.js',
		'bower_components/angular-flash-alert/dist/angular-flash.js',
		'bower_components/moment/moment.js',
		'bower_components/angular-moment/angular-moment.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angularjs-toaster/toaster.js',
		'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
		'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
		'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/jquery-ui/jquery-ui.js',
		'bower_components/angular-ui-sortable/sortable.js',
		'bower_components/angular-ui-validate/dist/validate.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'bower_components/units-conversion/dist/units-conversion.min.js',
		'bower_components/beer-toolbox/dist/beer-toolbox.min.js',
		'bower_components/karma-read-json/karma-read-json.js',
		'bower_components/lodash/lodash.js',
		'bower_components/ngstorage/ngStorage.js',
		  'bower_components/ng-uuid/build/ng-uuid.min.js',
          'bower_components/noopy-api-plugin/index.js',
          'src/**/*.js',
          'build/scripts/config.js',
          {pattern: "src/**/*.fixture.json", included: false}
        ],
        exclude: [
        ],
        preprocessors: {},
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};

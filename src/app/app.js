/*global angular,console*/
angular.module('brewItYourself', [
    'application.config',
    'dialogs.main',
    'ui.bootstrap',
    'ui.router',
    'ui.sortable',
    'ui.validate',
    'ngCookies',
    'ngStorage',
    'ngSanitize',
    'pascalprecht.translate',
    'ngResource',
    'ngStorage',
    'flash',
    'angularMoment',
    'BeerToolbox',
    'UnitsConversion',
    'toaster',
    'uuid',
    'api-plugin'
])
    .config(function($urlRouterProvider, $locationProvider) {
        'use strict';
        $urlRouterProvider.otherwise('/recipe/list');
        $locationProvider.html5Mode(true);
    })

    .config(function ($translateProvider, $windowProvider) {
        'use strict';
        $translateProvider.useCookieStorage();

        //$translateProvider.useSanitizeValueStrategy('sanitize');

        // set default and fallback languages
        $translateProvider.preferredLanguage('fr');
        $windowProvider.$get().moment.locale('fr');

        // define translation loader
        $translateProvider.useLoader("$translatePartialLoader", {
            urlTemplate: function(part, lang) {
                return 'assets/app/' + part + '/translations/' + lang.replace(/_.*$/, '') + '.json';
            }
        });
    })

    .run(function ($rootScope, $translatePartialLoader, $translate, $state) {
        'use strict';
        // manage route change

        $translate.refresh();
        $rootScope.$on("$stateChangeStart", function (event, routeOption) {
            $translatePartialLoader.addPart('components/common');
            $translatePartialLoader.addPart('shared');
            if (routeOption.translations) {
                // load translation parts
                angular.forEach(routeOption.translations, function (part) {
                    var tab = part.split('/');
                    var partToLoad = '';

                    for (var i = 0; i < tab.length; i++) {
                        if (i > 0) {
                            partToLoad += "/" + tab[i];
                        } else {
                            partToLoad += tab[i];
                        }
                        $translatePartialLoader.addPart(partToLoad);
                    }
                });
                $translate.refresh();
            }
            $translate.refresh();
        });
    })
;

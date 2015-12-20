angular.module('brewItYourself').filter('lasting', function ($translate) {
    'use strict';
    return function (text,format) {
        var minutes = parseInt(text, 10);
        var time = {
          minutes: minutes % 60,
          hours: Math.floor(minutes / 60) % 24,
          days: Math.floor(minutes / 1440)
        };

        function leading(str, num) {
          return (str + num).substr(-2);
        }

        var result = [];
        switch(format) {
          case 'compact':
            if (time.days) {
                result.push([time.days, $translate.instant('day_s')].join(' '));
            }
            if (time.hours || time.days) {
              result.push([leading('00', time.hours),  leading('00', time.minutes)].join(':'));
            } else {
              result.push([time.minutes, $translate.instant('minute_s')].join(' '));
            }
            return result.join(' - ');
          default:
            if (time.days) {
                result.push([time.days, $translate.instant('day_s')].join(' '));
            }
            if (time.hours || time.minutes) {
              result.push([leading('00', time.hours),  leading('00', time.minutes)].join(':'));
            }
            return result.join(' - ');
        }

    };
});

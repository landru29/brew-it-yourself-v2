angular.module('brewItYourself').filter('stringLimit', function() {
    return function(str, len, method) {
        if (!str) {
            return '';
        }
        if (len >= str.length) {
            return str;
        }
        switch (method) {
            case 'middle':
                if (len < 4) {
                    len = 4;
                }
                var half = Math.ceil((len - 3)/2);
                return str.substr(0, half) + '...' + str.substr(-half);
            default:
                return str.substring(0, len);
        }
    };
});
;(function() {
    "use strict";

    var RandomCode = function(){};

    RandomCode.prototype = {

        LOWERCASE_CHARS : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

        // Return a random string of 5 lowercase characters
        get : function() {
            var self = this;
            return Array.apply(0, new Array(5)).map(function() {
                return self.LOWERCASE_CHARS[Math.floor(Math.random()*self.LOWERCASE_CHARS.length)];
            }).join('');
        }
    };

    exports.RandomCode = new RandomCode();
})();

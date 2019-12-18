"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * 
 * @name:       translatorjs
 * @version:    3.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/eo-translatorjs
 * 
 * A simple javascript library for translating web content.
 * 
 */
(function(obj) {
    /**
     * The translator class
     */
    var EOTranslator = function EOTranslator() {
        _classCallCheck(this, EOTranslator);

        console.log('EO TranslatorJS');
    };

    if (typeof exports !== 'undefined') {
        module.exports = EOTranslator;
    } else {
        obj.EOTranslator = EOTranslator;
    }
})(typeof window !== 'undefined' ? window : void 0);
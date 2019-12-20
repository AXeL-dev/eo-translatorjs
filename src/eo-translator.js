/**
 * 
 * @name:       eo-translatorjs
 * @version:    3.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/eo-translatorjs
 * 
 * A simple javascript library for translating web content.
 * 
 */

(function (obj) {

	/**
	 * The translator class
	 */
	class EOTranslator {

		//#region Properties

		/**
		 * @param {{ [x: string]: { [x: string]: any; }; }} dict The new dictionary value
		 */
		set dictionary(dict) {
			if (typeof dict === 'object' && !Array.isArray(dict)) {
				this._dictionary = dict;
			}
		}

		/**
		 * Gets the dictionary value
		 */
		get dictionary() {
			return this._dictionary;
		}

		/**
		 * @param {{ [x: string]: { [x: string]: any; }; }} language The new language value
		 */
		set language(language) {
			if (typeof language === 'string') {
				this._language = language;
			}
		}

		/**
		 * Gets the language value
		 */
		get language() {
			return this._language;
		}

		//#endregion

		//#region Constructor

		/**
		 * Instantiates a translator object
		 *
		 * @param {object} dict The translation dictionary
		 * @param {string} lang The default language
		 */
		constructor(dict, lang) {
			this.dictionary = dict || {};
			this.language = lang || document.documentElement.lang || 'en';
		}

		//#endregion

		//#region Methods

		/**
		 * Translates an input value
		 *
		 * @param {string} input The input value to translate
		 * @param {object} options The translation options
		 */
		translate(input = '', options = {}) {
			const language = options.lang || this.language;
			const fallback = options.fallback || input;
			const params = options.params || {};
			const frags = input.split('.');

			let output = this.dictionary.hasOwnProperty(this.language);

			const assignParams = (raw) => {
				Object.keys(params).forEach(key => {
					const pattern = new RegExp(`{${key}}`, 'g');
					raw = raw.replace(pattern, params[key]);
				});

				return raw;
			};

			if (output) {
				if (frags.filter(frag => frag.length > 0).length > 1) {
					let temp = this.dictionary[language];

					for (const frag of frags) {
						temp = temp[frag] || undefined

						if (!temp) {
							break;
						}
					}

					output = temp;
				} else {
					output = this.dictionary[language][input];
				}
			}

			return output ? assignParams(output) : fallback;
		}

		/**
		 * Translates the contents of a DOM elemnt
		 * 
		 * @param {HTMLElement} DOMElement The DOM element to translate the content of
		 * @param {string} lang The language to translate to
		 */
		translateElement(DOMElement, lang) {
			if (DOMElement) {
				const language = lang || this.language;
				const input = DOMElement.attributes['eo-translator'].value || DOMElement.textContent || DOMElement.innerText || DOMElement.innerHTML;
				const fallback = (DOMElement.attributes['eo-translator-fallback'] || { value: input }).value;
				const params = JSON.parse((DOMElement.attributes['eo-translator-params'] || { value: "{}" }).value) || {};

				DOMElement.textContent = this.translate(input, { lang: language, fallback, params });
			}
		}

		// Translates the DOM
		translateDOM(DOMContainer, lang) {
			const language = lang || this.language;
			const container = DOMContainer || document;
			const elements = container.querySelectorAll('[eo-translator]');

			elements.forEach((element) => this.translateElement(element, language));
		}

		//#endregion
	}

	if (typeof exports !== 'undefined') {
		module.exports = EOTranslator;
	} else {
		obj.EOTranslator = EOTranslator;
	}
})((typeof window !== 'undefined') ? window : this);

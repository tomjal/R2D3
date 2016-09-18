const i18n = require('i18next');
const XHR = require('i18next-xhr-backend');
const LanguageDetector = require('i18next-browser-languagedetector');

i18n
  .init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          'start': 'hello'
        }
      }
    }
  });

export default i18n;

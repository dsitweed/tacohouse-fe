import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, vi, ja } from '.';

const resources = {
  vi: {
    translation: vi,
  },
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
};

export const initLanguage: I18nType.Language = (localStorage.getItem(
  'language',
) || 'vi') as I18nType.Language;

i18n
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources: resources,
    debug: false,
    lng: 'vi',
    defaultNS: 'translation',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;

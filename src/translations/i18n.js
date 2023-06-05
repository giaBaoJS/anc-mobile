import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from './en.json';
import vietnam from './vn.json';

const resources = {
  vn: {
    translation: vietnam,
  },
  en: {
    translation: english,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'vn',
  resources,
  react: {
    useSuspense: false,
  },
});
export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './zh';
import en from './en';

i18n.use(initReactI18next).init({
  fallbackLng: 'zh',
  lng: navigator.language.startsWith('en') ? 'en' : 'zh',
  resources: {
    zh,
    en,
  },
});

export default i18n;

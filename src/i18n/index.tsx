import i18n from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from './en';
import zh from './zh';

export const I18nHandler: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  React.useState(() => {
    i18n.use(initReactI18next).init({
      fallbackLng: 'zh',
      lng: navigator.language.startsWith('en') ? 'en' : 'zh',
      resources: {
        zh,
        en,
      },
    });
  });
  return (
    <I18nextProvider i18n={i18n} defaultNS="translation">
      {children}
    </I18nextProvider>
  );
};

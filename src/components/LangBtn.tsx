import * as React from 'react';
import { useTranslation } from 'react-i18next';

declare interface LangBtnProps {}

const LangBtn: React.FunctionComponent<LangBtnProps> = ({}) => {
  const { i18n, t } = useTranslation();

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() =>
          i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')
        }
      >
        <i className="bi bi-translate" /> {t(`langs.switch`)}
      </button>
    </div>
  );
};

export default LangBtn;

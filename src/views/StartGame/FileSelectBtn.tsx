import * as React from 'react';
import { useTranslation } from 'react-i18next';

declare interface FileSelectBtnProps {
  onFileSelect: (file: File) => void;
}

const FileSelectBtn: React.FunctionComponent<FileSelectBtnProps> = ({
  onFileSelect,
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="btn btn-outline-secondary position-relative overflow-hidden w-100 mb-2"
    >
      <input
        type="file"
        className="position-absolute opacity-0"
        onChange={(evt) => {
          const file = evt.target.files?.[0];
          evt.target.files = null;
          if (file) {
            onFileSelect?.(file);
          }
        }}
        style={{
          right: 0,
          top: 0,
          bottom: 0,
          width: '300%',
          cursor: 'pointer',
        }}
      />
      <i className="bi bi-folder-symlink-fill" /> {t('startGame.selectFile')}
    </button>
  );
};

export default FileSelectBtn;

import * as React from 'react';
import { useTranslation } from 'react-i18next';

declare interface FileSelectBtnProps {
  onImagePaste: (blob: Blob) => void;
  onUrlPaste: (imageUrl: string) => void;
}

const PasteFromClipboardBtn: React.FunctionComponent<FileSelectBtnProps> = ({
  onImagePaste,
  onUrlPaste,
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="btn btn-outline-secondary position-relative overflow-hidden w-100 mb-2"
      onClick={async () => {
        const text = await navigator.clipboard.readText();
        if (text?.startsWith('https://')) {
          onUrlPaste?.(text);
          return;
        }
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find((type) =>
            type.startsWith('image/')
          );
          if (imageType) {
            const blob = await item.getType(imageType);
            onImagePaste?.(blob);
            return;
          }
        }
      }}
    >
      <i className="bi bi-clipboard-fill" /> {t('startGame.pasteImage')}
    </button>
  );
};

export default PasteFromClipboardBtn;

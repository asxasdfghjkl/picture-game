import React from 'react';
import { useTranslation } from 'react-i18next';
import LangBtn from '../../components/LangBtn';
import { GameConfig } from '../../defines/gameConfig';
import { readFileDataUrl } from '../../helpers/file.helper';
import FileSelectBtn from './FileSelectBtn';
import PasteFromClipboardBtn from './PasteFromClipboardBtn';
import './index.css';

type StartProps = {
  defaultConfig: GameConfig;
  onStartGame: (config: GameConfig) => void;
};

export const StartGame: React.FunctionComponent<StartProps> = ({
  defaultConfig,
  onStartGame,
}) => {
  const { t } = useTranslation();
  const [config, setConfig] = React.useState(defaultConfig);

  const imageRef = React.useRef<HTMLImageElement>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((c) => ({ ...c, [evt.target.name]: evt.target.value }));
  };

  const handleFileSelect = React.useCallback(
    async (blob: Blob) => {
      const imageUrl = await readFileDataUrl(blob);
      setConfig((c) => ({ ...c, imageUrl }));
    },
    [setConfig]
  );

  React.useEffect(() => {
    const onPaste = (evt: ClipboardEvent) => {
      const file = evt.clipboardData?.files?.[0];
      if (file) {
        return handleFileSelect(file);
      }
      const text = evt.clipboardData?.getData('text');
      if (text?.startsWith('https://')) {
        setConfig((c) => ({ ...c, imageUrl: text }));
      }
    };
    document.body.addEventListener('paste', onPaste);
    return () => {
      document.body.removeEventListener('paste', onPaste);
    };
  }, [handleFileSelect, setConfig]);

  const handleLoadUrl = () => {
    const url = prompt(t('startGame.imageUrl')!);
    if (url) {
      setConfig((c) => ({ ...c, imageUrl: url }));
    }
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    onStartGame(config);
  };

  const handleDragOver = (evt: React.DragEvent<HTMLImageElement>) => {
    evt.preventDefault();
    evt.dataTransfer.effectAllowed = 'copy';
    imageRef.current?.classList.add('dragover');
  };

  const handleFileDrop = async (evt: React.DragEvent<HTMLImageElement>) => {
    evt.preventDefault();
    const file = evt.dataTransfer.files?.[0];
    imageRef.current?.classList.remove('dragover');
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="container">
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 text-end mb-3">
            <LangBtn />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label>{t('startGame.cols')}</label>
              <input
                name="cols"
                className="form-control"
                type="number"
                defaultValue={config.cols}
                min={1}
                step={1}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label>{t('startGame.rows')}</label>
              <input
                name="rows"
                type="number"
                className="form-control"
                min={1}
                step={1}
                defaultValue={config.rows}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label>{t('startGame.image')}</label>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <img
                ref={imageRef}
                src={
                  config.imageUrl ||
                  `https://placehold.co/1280x720?text=Drop%20Image%20Here%20To%20Load`
                }
                onDragOver={handleDragOver}
                onDragLeave={() =>
                  imageRef.current?.classList.remove('dragover')
                }
                onDrop={handleFileDrop}
                onError={() => {
                  alert(t('startGame.loadFailed'));
                  setConfig((c) => ({ ...c, imageUrl: '' }));
                }}
                className="d-block w-100 border rounded"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <button
              className="btn btn-outline-secondary w-100 mb-2"
              type="button"
              onClick={handleLoadUrl}
            >
              <i className="bi bi-link" /> {t('startGame.fromUrl')}
            </button>
            <FileSelectBtn onFileSelect={handleFileSelect} />
            <PasteFromClipboardBtn
              onImagePaste={handleFileSelect}
              onUrlPaste={(imageUrl) => setConfig((c) => ({ ...c, imageUrl }))}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          disabled={!config.imageUrl}
        >
          {t('startGame.start')}
        </button>
      </form>
    </div>
  );
};

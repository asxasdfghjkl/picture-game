import React, { ChangeEvent } from 'react';
import { GameConfig } from '../../defines/gameConfig';
import { useTranslation } from 'react-i18next';
import LangBtn from '../../components/LangBtn';
import './index.css';

type StartProps = {
  defaultConfig: GameConfig;
  onStartGame: (config: GameConfig) => void;
};

function getDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (evt) => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (ex) => reject(ex);
    fileReader.readAsDataURL(file);
  });
}

export const StartGame: React.FunctionComponent<StartProps> = ({
  defaultConfig,
  onStartGame,
}) => {
  const { t } = useTranslation();
  const [config, setConfig] = React.useState(defaultConfig);

  const imageRef = React.useRef<HTMLImageElement>(null);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setConfig((c) => ({ ...c, [evt.target.name]: evt.target.value }));
  };

  const handleSelectFile = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    evt.target.files = null;
    if (file) {
      setConfig((c) => ({ ...c, await: getDataUrl(file) }));
    }
  };

  const handleLoadUrl = () => {
    const url = prompt(t('startGame.imageUrl'));
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
    const dataUrl = await getDataUrl(file);
    setConfig((c) => ({ ...c, imageUrl: dataUrl }));
    imageRef.current?.classList.remove('dragover');
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
                onDragLeave={(evt) =>
                  imageRef.current?.classList.remove('dragover')
                }
                onDrop={handleFileDrop}
                onError={() => {
                  alert(t('startGame.loadFailed'));
                  setConfig((c) => ({ ...c, imageUrl: '' }));
                }}
                className="ratio ratio-16x9 d-block w-100 border rounded"
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
            <button
              type="button"
              className="btn btn-outline-secondary position-relative overflow-hidden w-100"
            >
              <input
                type="file"
                className="position-absolute opacity-0"
                onChange={handleSelectFile}
                style={{
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '300%',
                  cursor: 'pointer',
                }}
              />
              <i className="bi bi-folder-symlink-fill" />{' '}
              {t('startGame.selectFile')}
            </button>
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

import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GameConfig } from '../../defines/gameConfig';
import './index.css';

type GameProps = {
  config: GameConfig;
  onEndGame: () => void;
};

export const Game: React.FunctionComponent<GameProps> = ({
  config,
  onEndGame,
}) => {
  const { t } = useTranslation();
  const [boxFs, setBoxFs] = React.useState(16);
  const [boxes, setBoxes] = React.useState(() =>
    new Array(config.cols * config.rows).fill(false)
  );

  const handleBoxClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const newArray = [...boxes];
    const index = parseInt(evt.currentTarget.dataset.index as string, 10);
    newArray[index] = true;
    setBoxes(newArray);
  };

  const handleShowAnswer = () => {
    if (confirm(t('game.confirmShowAnswer')!)) {
      setBoxes((arr) => arr.map(() => true));
    }
  };

  const handleEndGame = () => {
    if (confirm(t('game.confirmEndGame')!)) {
      onEndGame();
    }
  };

  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const calcFontSize = () => {
      const fs =
        Math.min(
          imageRef.current?.clientWidth || 800,
          imageRef.current?.clientHeight || 600
        ) /
        Math.min(config.cols, config.rows) /
        3;

      setBoxFs(fs);
    };
    window.addEventListener('resize', calcFontSize);
    calcFontSize();
    return () => {
      window.removeEventListener('resize', calcFontSize);
    };
  }, [setBoxFs, config.rows, config.cols]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center">
        <div className="card position-relative m-3 border rounded d-block overflow-hidden">
          <div
            className="boxContainer z-1"
            style={
              {
                gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
                gridTemplateRows: `repeat(${config.rows}, 1fr)`,
                '--box-font-size': `${boxFs}px`,
              } as any
            }
          >
            {boxes.map((box, index) => (
              <div
                key={index}
                className={clsx('box', box && 'selected')}
                data-index={index}
                onClick={handleBoxClick}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <img ref={imageRef} src={config.imageUrl} className="w-100 d-block" />
        </div>
      </div>
      <div className="text-end mt-2">
        <button
          type="button"
          className="btn btn-secondary mx-3"
          onClick={handleShowAnswer}
        >
          <i className="bi bi-eye-fill" /> {t('game.showAnswer')}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleEndGame}
        >
          <i className="bi bi-x" /> {t('game.endGame')}
        </button>
      </div>
    </div>
  );
};

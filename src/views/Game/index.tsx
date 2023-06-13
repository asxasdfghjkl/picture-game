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

  return (
    <div className="container-fluid">
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
          <i className="bi bi-eye-fill" /> {t('game.endGame')}
        </button>
      </div>
      <div className="position-relative m-3 border rounded">
        <div
          className="boxContainer z-1"
          style={{
            gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
            gridTemplateRows: `repeat(${config.rows}, 1fr)`,
          }}
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
        <img src={config.imageUrl} className="w-100" />
      </div>
    </div>
  );
};

import React from 'react';
import { GameConfig } from '../../defines/gameConfig';
import './index.css';
import clsx from 'clsx';

type GameProps = {
  config: GameConfig;
  onEndGame: () => void;
};

export const Game: React.FunctionComponent<GameProps> = ({
  config,
  onEndGame,
}) => {
  const [boxes, setBoxes] = React.useState(() =>
    new Array(config.cols * config.rows).fill(false)
  );

  const handleBoxClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const newArray = [...boxes];
    const index = parseInt(evt.currentTarget.dataset.index as string, 10);
    newArray[index] = true;
    setBoxes(newArray);
  };

  return (
    <div className="container-fluid">
      <div>
        <div
          className="boxContainer z-1"
          style={{
            gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
            gridTemplateRows: `repeat(${config.rows}, 1fr)`,
          }}
        >
          {boxes.map((box, index) => (
            <div
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

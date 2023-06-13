import { StartGame } from './StartGame';
import { Game } from './Game';
import type { GameConfig } from '../defines/gameConfig';
import React from 'react';

export default function App() {
  const [gaming, setGaming] = React.useState(false);
  const [config, setConfig] = React.useState<GameConfig>({
    cols: 9,
    rows: 6,
    imageUrl: '',
  });

  return (
    <div className="App">
      {!gaming ? (
        <StartGame
          defaultConfig={config}
          onStartGame={(c) => {
            setConfig(c);
            setGaming(true);
          }}
        />
      ) : (
        <Game config={config} onEndGame={() => setGaming(false)} />
      )}
    </div>
  );
}

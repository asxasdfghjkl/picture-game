import React from 'react';
import type { GameConfig } from '../defines/gameConfig';
import { I18nHandler } from '../i18n';
import { Game } from './Game';
import { StartGame } from './StartGame';

export default function App() {
  const [gaming, setGaming] = React.useState(false);
  const [config, setConfig] = React.useState<GameConfig>({
    cols: 9,
    rows: 6,
    imageUrl: '',
  });

  return (
    <I18nHandler>
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
    </I18nHandler>
  );
}

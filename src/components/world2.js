import React, { useState, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stats } from 'drei';
import { useMachine } from '@xstate/react';

import gameMachine from '../lib/machine';
import Camera from './camera';
import Background from './background';
import SpotLight from './spot-light';
import Box from './box';
import UI from './ui';

function useAutorun(game, send) {
  useEffect(() => {
    const i = setInterval(() => {
      const options = game.currentBox
        ? game.getOptions(game.currentBox)
        : game.boxes;
      if (options.length) {
        const box = options[Math.floor(Math.random() * options.length)];
        send({ type: 'NEXT', data: { key: box.k } });
      } else clearInterval(i);
    }, 500);
    return () => clearInterval(i);
  }, [game, send]);
}

function App() {
  const [state, send] = useMachine(gameMachine);
  const { game, renderer } = state.context;

  // useAutorun(game, send);

  if (!game) return <div>loading</div>;
  return (
    <div>
      <Canvas shadowMap={{ type: 'PCFSoftShadowMap', enabled: true }}>
        <Camera box={game.currentBox} renderer={renderer} />
        <SpotLight box={game.currentBox} renderer={renderer} />
        <Background />
        {game.boxes.map((box) => (
          <Box
            key={box.k}
            box={box}
            renderer={game.renderer}
            selected={game.isSelected(box)}
            available={game.isAvailable(box)}
            onClick={() => send({ type: 'NEXT', data: { key: box.k } })}
          />
        ))}
      </Canvas>
      {!state.matches('playing') && (
        <UI
          status={state.value}
          result={game.getResult()}
          restart={() => send('RESTART')}
        />
      )}
    </div>
  );
}

export default App;

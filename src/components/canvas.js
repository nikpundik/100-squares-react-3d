import React from 'react';
import { Canvas } from 'react-three-fiber';
// import { Stats } from 'drei';

import Camera from './camera';
import Background from './background';
import SpotLight from './spot-light';
import Box from './box';
import useRenderer from '../hooks/use-renderer';
// import useAutorun from '../hooks/use-autorun';

function WorldCanvas({ context: { game, currentBox }, send }) {
  const renderer = useRenderer(game);
  // useAutorun(game, send);

  return (
    <Canvas shadowMap={{ type: 'PCFSoftShadowMap', enabled: true }}>
      <Background />
      {renderer && <Camera box={currentBox} renderer={renderer} />}
      {renderer && <SpotLight box={currentBox} renderer={renderer} />}
      {renderer &&
        game.boxes.map((box) => (
          <Box
            key={box.k}
            box={box}
            renderer={renderer}
            selected={game.isSelected(box)}
            available={game.isAvailable(box)}
            onClick={() => send({ type: 'NEXT', data: { key: box.k } })}
          />
        ))}
    </Canvas>
  );
}

export default WorldCanvas;

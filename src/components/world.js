import React, { useState, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stats } from 'drei';

import Game from '../lib/game';
import Camera from './camera';
import Background from './background';
import SpotLight from './spot-light';
import Box from './box';
import UI from './ui';

function useGame() {
  const [game] = useState(new Game(10));
  const [currentKey, setCurrentKey] = useState(-1);
  const [currentBox, setCurrentBox] = useState(null);
  const [solution, setSolution] = useState({});
  const setNext = (box) => {
    const next = currentKey + 1;
    setCurrentKey(next);
    setCurrentBox(box);
    setSolution({ ...solution, [box.k]: next });
  };
  const isSelected = (box) => solution[box.k] !== undefined;
  const isAvailable = (box) =>
    !isSelected(box) && game.canBeSelected(currentBox, box);

  let status = 'PLAY';
  if (game.isComplete(solution)) status = 'COMPLETE';
  else if (game.isStuck(currentBox, solution)) status = 'STUCK';

  let restart;
  if (status !== 'PLAY') {
    restart = () => {
      setCurrentKey(-1);
      setCurrentBox(null);
      setSolution({});
    };
  }
  return [
    game,
    currentBox,
    isAvailable,
    isSelected,
    setNext,
    restart,
    status,
    currentKey + 1,
  ];
}

function useAutorun(game, setNext) {
  useEffect(() => {
    let index = 0;
    const i = setInterval(() => {
      setNext(game.boxes[index]);
      index += 1;
    }, 1000);
    return () => clearInterval(i);
  }, [game, setNext]);
}

function App() {
  const [
    game,
    current,
    isAvailable,
    isSelected,
    setNext,
    restart,
    status,
    result,
  ] = useGame();

  // useAutorun(game, setNext);

  return (
    <div>
      <Canvas shadowMap={{ type: 'PCFSoftShadowMap', enabled: true }}>
        <Stats />
        <Camera box={current} renderer={game.renderer} />
        <SpotLight box={current} renderer={game.renderer} />
        <Background />
        {game.boxes.map((box) => (
          <Box
            key={box.k}
            box={box}
            renderer={game.renderer}
            selected={isSelected(box)}
            available={isAvailable(box)}
            setNext={setNext}
            onClick={() => setNext(box)}
          />
        ))}
      </Canvas>
      {status !== 'PLAY' && (
        <UI status={status} result={result} restart={restart} />
      )}
    </div>
  );
}

export default App;

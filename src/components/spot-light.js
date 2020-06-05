import React, { useMemo } from 'react';
import { a, useSpring } from 'react-spring/three';

import { SpotLight } from 'three';

function Light({ box, renderer }) {
  const light = useMemo(() => {
    const l = new SpotLight(0xffffff);
    l.castShadow = true;
    l.penumbra = 0.2;
    return l;
  }, []);
  const lightPosition = renderer.getLightPosition(box);
  const { position1, position2 } = useSpring({
    position1: [...lightPosition, 0],
    position2: [...lightPosition, 1],
  });
  return [
    <a.primitive key="1" object={light} position={position2} />,
    <a.primitive key="2" object={light.target} position={position1} />,
  ];
}

export default Light;

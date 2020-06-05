import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { a, useSpring } from 'react-spring/three';

function Camera({ renderer, box }) {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera]);
  useFrame(() => ref.current.updateMatrixWorld());
  const { position } = useSpring({
    position: [...renderer.getCameraPosition(box), 15],
  });
  return <a.perspectiveCamera ref={ref} position={position} />;
}

export default Camera;

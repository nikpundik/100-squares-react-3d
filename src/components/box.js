import React, { useRef, useState } from 'react';
import { a, useSprings } from 'react-spring/three';

const getColor = (available, selected) => {
  if (available) return 'crimson';
  if (selected) return 'seagreen';
  return 'sandybrown';
};

const config = { mass: 10, tension: 1000, friction: 300, precision: 0.00001 };

function BoxMesh({ box, renderer, selected, available, onClick }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  const [{ color, ...props }, { scale }] = useSprings(2, [
    {
      color: getColor(available, selected),
      rotation: hovered
        ? available
          ? [Math.PI, 0, Math.PI * 0.5]
          : [0, 0, 0]
        : [0, 0, 0],
      config,
    },
    {
      to: available ? [{ scale: [1.2, 1.2, 1.2] }, { scale: [1, 1, 1] }] : [],
      from: { scale: [1, 1, 1] },
    },
  ]);

  const pointerHover = () => setHover(true);
  const pointerOut = () => setHover(false);

  return (
    <a.mesh
      ref={mesh}
      position={[...renderer.getBoxPosition(box), -12]}
      {...props}
      scale={scale}
      onClick={onClick}
      onPointerOver={pointerHover}
      onPointerOut={pointerOut}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={renderer.boxSize} />
      <a.meshLambertMaterial attach="material" color={color} roughness={0.75} />
    </a.mesh>
  );
}

export default BoxMesh;

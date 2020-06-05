import React from 'react';

function Background() {
  return (
    <mesh position={[0, 0, -13]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial attach="material" color="#111" roughness={1} />
    </mesh>
  );
}

export default Background;

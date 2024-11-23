import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function Star(props) {
  const { nodes, materials } = useGLTF('/assets/star15.glb'); 
  const starRef = useRef(); 

  // Spinning animation
  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.z += 0.025; // This adjusts the speed 
    }
  });

  return (
    <group ref={starRef} rotation={[Math.PI / 2, 0, 0]} scale={[2, 2, 2]} {...props} dispose={null}>
      <mesh geometry={nodes.Star.geometry} material={materials.GlowingStar} />
    </group>
  );
}

// Preload the model to improve performance
useGLTF.preload('/assets/star-transformed.glb');


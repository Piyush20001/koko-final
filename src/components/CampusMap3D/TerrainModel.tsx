import React from 'react';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

export function TerrainModel() {
  return (
    <group>
      {/* Main ground plane */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]} 
        receiveShadow
      >
        <planeGeometry args={[200, 200, 32, 32]} />
        <meshStandardMaterial 
          color="#4a9f45"
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Paths */}
      {[
        [0, 0.01, 0],
        [20, 0.01, 20],
        [-20, 0.01, 20],
        [-40, 0.01, -20]
      ].map((pos, index) => (
        <mesh
          key={index}
          position={pos as [number, number, number]}
          rotation={[-Math.PI / 2, 0, index * Math.PI / 4]}
          receiveShadow
        >
          <planeGeometry args={[8, 100]} />
          <meshStandardMaterial 
            color="#666666"
            roughness={0.9}
            metalness={0}
          />
        </mesh>
      ))}

      {/* Decorative elements */}
      {Array.from({ length: 100 }).map((_, i) => {
        const x = Math.random() * 180 - 90;
        const z = Math.random() * 180 - 90;
        const scale = 0.5 + Math.random() * 1.5;

        return (
          <mesh
            key={i}
            position={[x, scale / 2 - 0.1, z]}
            scale={[scale, scale, scale]}
            castShadow
          >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial
              color={new THREE.Color('#3a8c3a').multiplyScalar(0.8 + Math.random() * 0.4)}
              roughness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}
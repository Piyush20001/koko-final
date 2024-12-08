import React, { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Event } from '../../types/events';
import * as THREE from 'three';

interface EventMarkerProps {
  position: [number, number, number];
  event: Event;
  onClick: () => void;
}

export function EventMarker({ position, event, onClick }: EventMarkerProps) {
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  // Hover animation
  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    if (glowRef.current && hovered) {
      glowRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Marker mesh */}
      <mesh ref={markerRef}>
        <cylinderGeometry args={[0.5, 0, 2, 8]} />
        <meshStandardMaterial 
          color={event.category === 'academic' ? '#3b82f6' : '#10b981'}
          emissive={hovered ? '#ffffff' : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>

      {/* Glow effect */}
      <pointLight
        ref={glowRef}
        distance={5}
        intensity={hovered ? 1 : 0.5}
        color={event.category === 'academic' ? '#3b82f6' : '#10b981'}
      />

      {/* Label */}
      <Html
        position={[0, 3, 0]}
        center
        style={{
          opacity: hovered ? 1 : 0.8,
          transition: 'all 0.2s',
          transform: `scale(${hovered ? 1.1 : 1})`,
        }}
      >
        <div className="px-3 py-2 rounded-lg shadow-lg bg-white dark:bg-dark-800 text-sm">
          <p className="font-medium text-gray-900 dark:text-gray-100">{event.title}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{event.location}</p>
        </div>
      </Html>
    </group>
  );
}
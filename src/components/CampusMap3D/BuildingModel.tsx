import React from 'react';
import { Html, Box, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';
import { Event } from '../../types/events';
import { Calendar, Clock } from 'lucide-react';
import { BuildingType } from './buildingsData';

interface BuildingModelProps {
  id: string;
  name: string;
  type: BuildingType;
  event?: Event;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  dimensions?: [number, number, number];
  isHovered: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
}

export function BuildingModel({
  name,
  type,
  event,
  position,
  scale,
  rotation,
  dimensions = [8, 8, 8],
  isHovered,
  onHover,
  onHoverEnd
}: BuildingModelProps) {
  const material = React.useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: event ? (isHovered ? '#9333ea' : '#22c55e') : 
             isHovered ? '#9333ea' : '#6b7280',
      roughness: 0.7,
      metalness: 0.2,
    });
  }, [event, isHovered]);

  const BuildingGeometry = () => {
    switch (type) {
      case 'landmark':
        return <Cylinder args={[2, 2, 15, 8]} />;
      case 'library':
        return <Box args={[10, 8, 10]} />;
      case 'student-life':
        return (
          <group>
            <Box args={[15, 6, 15]} position={[0, 0, 0]} />
            <Cone args={[8, 4, 4]} position={[0, 5, 0]} />
          </group>
        );
      default:
        return <Box args={[8, 8, 8]} />;
    }
  };

  return (
    <group
      position={position}
      scale={scale}
      rotation={rotation}
      onPointerOver={onHover}
      onPointerOut={onHoverEnd}
    >
      <mesh castShadow receiveShadow material={material}>
        <boxGeometry args={dimensions} />
      </mesh>
      {isHovered && event && (
        <Html position={[0, 5, 0]}>
          <div className="bg-white dark:bg-dark-800 px-3 py-1.5 rounded-lg shadow-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              {name}
            </p>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              <p className="font-medium text-purple-600 dark:text-purple-400 mb-1">
                {event.title}
              </p>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{event.date}</span>
                <Clock className="w-3 h-3 ml-2" />
                <span>{event.time}</span>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
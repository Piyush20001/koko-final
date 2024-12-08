import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sky, Stars } from '@react-three/drei';
import { Buildings } from './Buildings';
import { TerrainModel } from './TerrainModel';
import { EventMarker } from './EventMarker';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { LoadingSpinner } from './LoadingSpinner';
import { EVENTS } from '../../data/events';

interface CampusMap3DProps {
  isOpen: boolean;
  onClose: () => void;
}

const getEventForLocation = (buildingId: string) => {
  return EVENTS.find(event => {
    const location = event.location.toLowerCase();
    return buildingId.split('-').some(part => location.includes(part));
  });
};

export function CampusMap3D({ isOpen, onClose }: CampusMap3DProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-4 md:inset-10 bg-white dark:bg-dark-800 rounded-xl shadow-2xl overflow-hidden">
        <MapControls onClose={onClose} />
        <MapLegend />
        
        <div className="absolute inset-0 pt-16">
          <Suspense fallback={<LoadingSpinner />}>
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[100, 80, 100]} />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                maxPolarAngle={Math.PI / 2}
                minDistance={50}
                maxDistance={150}
              />
              <ambientLight intensity={0.7} />
              <directionalLight
                position={[10, 20, 10]}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                intensity={1.5}
              />
              <Sky sunPosition={[100, 20, 100]} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
              
              <TerrainModel />
              <Suspense fallback={null}>
                <Buildings getEventForLocation={getEventForLocation} />
              </Suspense>
              
              {EVENTS.map((event) => (
                <EventMarker
                  key={event.id}
                  event={event}
                  position={[
                    Math.random() * 80 - 40,
                    2,
                    Math.random() * 80 - 40
                  ]}
                  onClick={() => console.log('Clicked event:', event.title)}
                />
              ))}
            </Canvas>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
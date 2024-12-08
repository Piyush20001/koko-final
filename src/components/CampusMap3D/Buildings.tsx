import React, { useState } from 'react';
import { BuildingModel } from './BuildingModel';
import { BUILDINGS_DATA } from './buildingsData';
import { Event } from '../../types/events';

interface BuildingsProps {
  getEventForLocation: (buildingId: string) => Event | undefined;
}

export function Buildings({ getEventForLocation }: BuildingsProps) {
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  return (
    <group>
      {BUILDINGS_DATA.map((building) => {
        const event = getEventForLocation(building.id);
        return (
          <BuildingModel
            key={building.id}
            {...building}
            event={event}
            isHovered={hoveredBuilding === building.id}
            onHover={() => setHoveredBuilding(building.id)}
            onHoverEnd={() => setHoveredBuilding(null)}
          />
        );
      })}
    </group>
  );
}
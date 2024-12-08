// Building Types
export type BuildingType = 'academic' | 'student-life' | 'library' | 'landmark' | 'sports' | 'residential';

interface BuildingDetails {
  id: string;
  name: string;
  type: BuildingType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  dimensions: [number, number, number];
  levels: number;
  yearBuilt?: number;
}

export const BUILDINGS_DATA = [
  {
    id: 'century-tower',
    name: 'Century Tower',
    type: 'landmark',
    position: [0, 7.5, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    dimensions: [8, 50, 8],
    levels: 1,
    yearBuilt: 1953
  },
  {
    id: 'reitz-union',
    name: 'J. Wayne Reitz Union',
    type: 'student-life',
    position: [20, 3, 20],
    rotation: [0, Math.PI / 6, 0],
    scale: [1, 1, 1],
    dimensions: [60, 24, 40],
    levels: 4,
    yearBuilt: 1967
  },
  {
    id: 'marston-library',
    name: 'Marston Science Library',
    type: 'library',
    position: [-20, 4, 20],
    rotation: [0, -Math.PI / 8, 0],
    scale: [1, 1, 1],
    dimensions: [45, 32, 45],
    levels: 6
  },
  {
    id: 'ben-hill-griffin',
    name: 'Ben Hill Griffin Stadium',
    type: 'sports',
    position: [-40, 5, -20],
    rotation: [0, Math.PI / 4, 0],
    scale: [1, 1, 1],
    dimensions: [120, 45, 120],
    levels: 8,
    yearBuilt: 1930
  }
] as BuildingDetails[];
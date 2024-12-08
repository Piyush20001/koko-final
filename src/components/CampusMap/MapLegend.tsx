export const categories = [
  { type: 'Academic', color: '#3b82f6' },
  { type: 'Social', color: '#10b981' },
  { type: 'Cultural', color: '#8b5cf6' },
  { type: 'Sports', color: '#f97316' },
  { type: 'Career', color: '#f43f5e' }
] as const;

export type CategoryType = typeof categories[number]['type'];
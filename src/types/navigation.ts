export type NavigationItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  onClick?: () => void;
};

export type NavigationState = {
  currentPath: string;
  showMap: boolean;
  showProfile: boolean;
  studyMode: boolean;
};
export const mapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: '#012621' }, { weight: 0.8 }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#002411' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#003D1C' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#002D0F' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#00382E' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#003D2E' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#001B1E' }]
  }
];
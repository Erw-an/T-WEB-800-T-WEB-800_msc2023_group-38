import L from 'leaflet';

import iconUrl from '../../../assets/pin.png';

const VenueLocationIcon = L.icon({
    iconUrl,
    iconRetinaUrl: iconUrl,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: 'leaflet-venue-icon',
});

export default VenueLocationIcon;

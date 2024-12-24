import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker icons directly
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MarathonRouteMap = () => {
  useEffect(() => {
    // Create map with dark theme and additional options
    const map = L.map('marathon-map', {
      center: [-17.8252, 30.8522],
      zoom: 12,
      zoomControl: false,  // Remove default zoom control
      attributionControl: false  // Remove attribution
    });

    // Dark mode tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Marathon route coordinates (easily editable)
    const marathonRoute = [
      [-17.8252, 30.8522],   // Start point
      [-17.8300, 30.8600],   // Route point 1
      [-17.8400, 30.8700],   // Route point 2
      [-17.8500, 30.8800],   // Route point 3
      [-17.8252, 30.8522]    // End point (back to start)
    ];

    // Draw polyline with more vibrant color for dark mode
    L.polyline(marathonRoute, {
      color: '#00ffff',  // Bright cyan for visibility
      weight: 6,
      opacity: 0.8
    }).addTo(map);

    // Add marker with custom icon
    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: #00ffff; 
        width: 20px; 
        height: 20px; 
        border-radius: 50%; 
        border: 3px solid white;
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker(marathonRoute[0], { icon: markerIcon }).addTo(map)
      .bindPopup('Start/Finish Line<br>Oliver Mtukudzi Memorial Half Marathon', {
        className: 'dark-popup'
      })
      .openPopup();

    // Add custom CSS for dark mode popup
    const style = document.createElement('style');
    style.innerHTML = `
      #marathon-map-container {
        position: sticky;
        top: 5rem;  /* Adjust this value to match navbar height */
        z-index: 10;
      }
      .dark-popup .leaflet-popup-content-wrapper {
        background-color: #333;
        color: #00ffff;
        border-radius: 10px;
      }
      .dark-popup .leaflet-popup-tip {
        background-color: #333;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      map.remove();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
      id="marathon-map-container"
      className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg"
    >
      <div 
        id="marathon-map" 
        className="w-full h-full"
      />
    </div>
  );
};

export default MarathonRouteMap;

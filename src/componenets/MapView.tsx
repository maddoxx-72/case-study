import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface MapViewProps {
  coordinates?: { lat: number; lng: number };
  address?: string;
  zoom?: number;
}

declare global {
  interface Window {
    initMap: () => void;
  }
}

const MapView: React.FC<MapViewProps> = ({ coordinates, address, zoom = 12 }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load Google Maps script
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBNyqUFkwLE09TpqSywAkm2fk_lqMNAprc&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onerror = () => setError('Failed to load Google Maps');
      document.head.appendChild(script);

      window.initMap = () => {
        setLoading(false);
        initializeMap();
      };
    } else {
      setLoading(false);
      initializeMap();
    }

    return () => {
      if (marker) marker.setMap(null);
    };
  }, []);

  // Initialize or update map when coordinates change
  useEffect(() => {
    if (!map || !coordinates) return;

    map.setCenter(new google.maps.LatLng(coordinates.lat, coordinates.lng));
    map.setZoom(zoom);

    if (marker) {
      marker.setPosition(new google.maps.LatLng(coordinates.lat, coordinates.lng));
    } else {
      const newMarker = new google.maps.Marker({
        position: new google.maps.LatLng(coordinates.lat, coordinates.lng),
        map: map,
        title: address || 'Location'
      });
      setMarker(newMarker);
    }

    if (address) {
      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${address}</h3>`
      });
      if (marker) {
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    }
  }, [coordinates, address, zoom]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const center = coordinates 
      ? new google.maps.LatLng(coordinates.lat, coordinates.lng)
      : new google.maps.LatLng(0, 0);

    const newMap = new google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true
    });

    setMap(newMap);

    if (coordinates) {
      const newMarker = new google.maps.Marker({
        position: center,
        map: newMap,
        title: address || 'Location'
      });
      setMarker(newMarker);
    }
  };

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '400px',
        borderRadius: '8px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default MapView;
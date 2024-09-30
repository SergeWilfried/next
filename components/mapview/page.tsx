"use client";

import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { School } from '@prisma/client';

interface MapOptions {
  style?: string;
  center?: [number, number];
  zoom?: number;
  schools: School[];
}

export function MapView({ 
  style = "mapbox://styles/mapbox/satellite-v9",
  center = [-1.46389, 53.296543],
  zoom = 13,
  schools
}: MapOptions) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const initializeMap = useCallback(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: center,
      zoom: zoom
    });
  }, [style, center, zoom]);

  useEffect(() => {
    initializeMap();
    return () => map.current?.remove();
  }, [initializeMap]);

  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each school
    schools.forEach((school) => {
      if (school?.longitude && school.latitude) {
        const marker = new mapboxgl.Marker()
          .setLngLat([school.longitude, school.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${school.name}</h3><p>Type: ${school.type}</p><p>Category: ${school.category}</p>`
            )
          )
          .addTo(map.current!);
        markersRef.current.push(marker);
      }
    });
  }, [schools]);

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
      <Badge variant="outline" className="absolute right-3 top-3">
        Map
      </Badge>
      <div ref={mapContainer} className="map-container" style={{ height: '400px' }} />
    </div>
  );
}
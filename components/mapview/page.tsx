"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Badge } from '@/components/ui/badge';
import { School } from '@prisma/client';

interface MapViewProps {
  style: string;
  center: [number, number];
  zoom: number;
  schools: School[]; // Replace 'any' with your school type
  accessToken: string;
}

export function MapView({ 
  style = "mapbox://styles/mapbox/satellite-v9",
  center = [-1.46389, 53.296543],
  zoom = 13,
  schools,
  accessToken
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    mapboxgl.accessToken = accessToken;
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: style,
      center: center,
      zoom: zoom
    });
  }, []);

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
"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { env } from "@/env.mjs";
interface MapOptions {
  style?: string;
  center?: [number, number];
  zoom?: number;
}

export default function MapView({ 
  style = "mapbox://styles/mapbox/satellite-v9",
  center = [-1.46389, 53.296543],
  zoom = 13 
}: MapOptions = {}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapboxAccessToken = env.MAPBOX_ACCESS_TOKEN;
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return;

    mapboxgl.accessToken = mapboxAccessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style,
      center,
      zoom,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, [style, center, zoom]);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    map.current.setStyle(style);
    map.current.setCenter(center);
    map.current.setZoom(zoom);
  }, [style, center, zoom, mapLoaded]);

  return (
    <div id="map" className="h-[500px] w-full">
      <div ref={mapContainer} className="size-full" />
    </div>
  );
}
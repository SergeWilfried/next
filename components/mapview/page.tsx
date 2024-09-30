"use client";

import Map, { Marker } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { env } from "@/env.mjs";
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MapOptions {
  style?: string;
  center?: [number, number];
  zoom?: number;
}

export function MapView({ 
  style = "mapbox://styles/mapbox/satellite-v9",
  center = [-1.46389, 53.296543],
  zoom = 13 
}: MapOptions) {
  const mapboxAccessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
      <Badge variant="outline" className="absolute right-3 top-3">
        Map
      </Badge>
      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: center[0],
          latitude: center[1],
          zoom: zoom
        }}
        style={{width: '100%', height: '100%'}}
        mapStyle={style}
      >
        <Marker longitude={center[0]} latitude={center[1]} color="red">
          <MapPin className="text-red-500" />
        </Marker>
      </Map>
    </div>
  );
}
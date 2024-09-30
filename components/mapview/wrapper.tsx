"use client";

import { useState } from "react";
import {MapView} from "@/components/mapview/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function MapClientWrapper() {
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/satellite-v9");
  const [center, setCenter] = useState([-1.46389, 53.296543]);
  const [zoom, setZoom] = useState(13);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Map Settings</legend>
            <div className="grid gap-3">
              <Label htmlFor="mapStyle">Map Style</Label>
              <Select onValueChange={(value) => setMapStyle(value)}>
                <SelectTrigger id="mapStyle">
                  <SelectValue placeholder="Select a map style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mapbox://styles/mapbox/satellite-v9">Satellite</SelectItem>
                  <SelectItem value="mapbox://styles/mapbox/streets-v11">Streets</SelectItem>
                  <SelectItem value="mapbox://styles/mapbox/outdoors-v11">Outdoors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="zoom">Zoom Level</Label>
              <Input 
                id="zoom" 
                type="number" 
                value={zoom} 
                onChange={(e) => setZoom(Number(e.target.value))}
              />
            </div>
            {/* Add more controls for center coordinates if needed */}
          </fieldset>
        </form>
      </div>
      <div className="md:col-span-2">
        <MapView style={mapStyle} center={center as [number, number]} zoom={zoom} />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { MapView } from "@/components/mapview/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MapClientWrapper({ initialCenter = [-1.46389, 53.296543] }) {
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/satellite-v9");
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(13);
  const [schoolCategory, setSchoolCategory] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [schools, setSchools] = useState([]);

  const fetchSchools = async () => {
    try {
      const response = await fetch(`/api/schools?category=${schoolCategory}&type=${schoolType}&search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch schools');
      }
      const data = await response.json();
      setSchools(data);
    } catch (error) {
      console.error('Error fetching schools:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="md:col-span-1">
        <form className="grid w-full items-start gap-6" onSubmit={(e) => { e.preventDefault(); fetchSchools(); }}>
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
                min="0"
                max="22"
                step="0.1"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 0 && value <= 22) {
                    setZoom(value);
                  }
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="schoolCategory">School Category</Label>
              <Select onValueChange={(value) => setSchoolCategory(value)}>
                <SelectTrigger id="schoolCategory">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="CHARTER">Charter</SelectItem>
                  <SelectItem value="RELIGIOUS">Religious</SelectItem>
                  <SelectItem value="NON_PROFIT">Non-Profit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="schoolType">School Type</Label>
              <Select onValueChange={(value) => setSchoolType(value)}>
                <SelectTrigger id="schoolType">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                  <SelectItem value="MIDDLE_SCHOOL">Middle School</SelectItem>
                  <SelectItem value="ELEMENTARY_SCHOOL">Elementary School</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="searchTerm">Search Schools</Label>
              <Input 
                id="searchTerm" 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter school name"
              />
            </div>
            <Button type="submit">Apply Filters</Button>
          </fieldset>
        </form>
      </div>
      <div className="md:col-span-2">
        <MapView 
          style={mapStyle} 
          center={center as [number, number]} 
          zoom={zoom} 
          schools={schools}
        />
      </div>
    </div>
  );
}

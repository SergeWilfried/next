"use client";

import { useState } from "react";
import { MapView } from "@/components/mapview/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { Checkbox } from "@/components/ui/checkbox";

export function MapClientWrapper({ initialCenter = [-1.46389, 53.296543] }) {
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(13);
  const [schoolCategory, setSchoolCategory] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [city, setCity] = useState("");
  const [schools, setSchools] = useState([]);
  const [facilityProperties, setFacilityProperties] = useState<string[]>([]);

  const fetchSchools = async () => {
    try {
      const response = await fetch(`/api/schools?category=${schoolCategory}&type=${schoolType}&city=${city}&properties=${facilityProperties.join(',')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch schools');
      }
      const data = await response.json();
      setSchools(data);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="md:col-span-1">
        <form className="grid w-full items-start gap-6" onSubmit={(e) => { e.preventDefault(); fetchSchools(); }}>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Réglages</legend>
            <div className="grid gap-3">
              <Label htmlFor="schoolCategory">Catégorie d&apos;école</Label>
              <Select onValueChange={(value) => setSchoolCategory(value)}>
                <SelectTrigger id="schoolCategory">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRIVATE">Privée</SelectItem>
                  <SelectItem value="PUBLIC">Publique</SelectItem>
                  <SelectItem value="CHARTER">Charter</SelectItem>
                  <SelectItem value="RELIGIOUS">Religieuse</SelectItem>
                  <SelectItem value="NON_PROFIT">Non-Profit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="schoolType">Type d&apos;école</Label>
              <Select onValueChange={(value) => setSchoolType(value)}>
                <SelectTrigger id="schoolType">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH_SCHOOL">Lycée</SelectItem>
                  <SelectItem value="MIDDLE_SCHOOL">Collège</SelectItem>
                  <SelectItem value="ELEMENTARY_SCHOOL">Ecole</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="city">Ville</Label>
              <Select onValueChange={(value) => setCity(value)}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Choisir une ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OUAGADOUGOU">Ouagadougou</SelectItem>
                  <SelectItem value="BOULKIEME">Boulkiemé</SelectItem>
                  <SelectItem value="KOUDOUGOU">Koudougou</SelectItem>
                  <SelectItem value="BOBO-DIOULASO">Bobo-Dioulasso</SelectItem>
                  <SelectItem value="KOKOLOGO">Kokologo</SelectItem>
                  {/* Add more cities as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label>Propriétés</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Salle de sport', 'Bibliothèque', 'Cantine', 'Bus', 'Laboratoire de sciences', 'Salle d\'informatique'].map((property) => (
                  <div key={property} className="flex items-center space-x-2">
                    <Checkbox
                      id={property.toLowerCase().replace(' ', '-')}
                      onCheckedChange={(checked) => {
                        setFacilityProperties(prev =>
                          checked
                            ? [...prev, property]
                            : prev.filter(p => p !== property)
                        );
                      }}
                    />
                    <Label htmlFor={property.toLowerCase().replace(' ', '-')}>{property}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit">Apply Filters</Button>
          </fieldset>
        </form>
      </div>
      <div className="md:col-span-2">
        <MapView 
          style="mapbox://styles/mapbox/streets-v12" 
          center={center as [number, number]} 
          zoom={zoom} 
          schools={schools}
          accessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        />
      </div>
    </div>
  );
}

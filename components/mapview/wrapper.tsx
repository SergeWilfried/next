"use client";

import { useState, useEffect } from "react";
import { MapView } from "@/components/mapview/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { Checkbox } from "@/components/ui/checkbox";
import { School } from "@prisma/client";

// Add this mock data near the top of the file, after the imports
const mockSchools: School[] = [
  {
    id: "1",
    name: "Lycée Philippe Zinda Kaboré",
    category: "PUBLIC",
    type: "HIGH_SCHOOL",
    city: "OUAGADOUGOU",
    properties: ["Bibliothèque", "Laboratoire de sciences"],
    coordinates: [-1.5196, 12.3714]
  },
  {
    id: "2",
    name: "Collège Notre-Dame de Kologh-Naba",
    category: "PRIVATE",
    type: "MIDDLE_SCHOOL",
    city: "OUAGADOUGOU",
    properties: ["Salle de sport", "Cantine", "Bus"],
    coordinates: [-1.5335, 12.3657]
  },
  {
    id: "3",
    name: "École primaire de Kokologo",
    category: "PUBLIC",
    type: "ELEMENTARY_SCHOOL",
    city: "KOKOLOGO",
    properties: ["Cantine"],
    coordinates: [-1.8845, 12.1925]
  },
  {
    id: "4",
    name: "Lycée Privé Newton",
    category: "PRIVATE",
    type: "HIGH_SCHOOL",
    city: "BOBO-DIOULASO",
    properties: ["Laboratoire de sciences", "Informatique", "Bibliothèque"],
    coordinates: [-4.2979, 11.1757]
  },
  {
    id: "5",
    name: "Collège d'Enseignement Général de Koudougou",
    category: "PUBLIC",
    type: "MIDDLE_SCHOOL",
    city: "KOUDOUGOU",
    properties: ["Salle de sport", "Bibliothèque"],
    coordinates: [-2.3639, 12.2525]
  }
];

export function MapClientWrapper({ initialCenter = [-1.46389, 53.296543] }) {
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(13);
  const [schoolCategory, setSchoolCategory] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [city, setCity] = useState("");
  const [schools, setSchools] = useState(mockSchools);
  const [facilityProperties, setFacilityProperties] = useState<string[]>([]);

  const fetchSchools = () => {
    const filteredSchools = mockSchools.filter(school => {
      return (
        (!schoolCategory || school.category === schoolCategory) &&
        (!schoolType || school.type === schoolType) &&
        (!city || school.city === city) &&
        (facilityProperties.length === 0 || facilityProperties.some(prop => school.properties.includes(prop)))
      );
    });
    setSchools(filteredSchools as any);
  };

  // Use useEffect to fetch schools when filters change
  useEffect(() => {
    fetchSchools();
  }, [schoolCategory, schoolType, city, facilityProperties]);

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
                {['Salle de sport', 'Bibliothèque', 'Cantine', 'Bus', 'Laboratoire de sciences', 'Informatique'].map((property) => (
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

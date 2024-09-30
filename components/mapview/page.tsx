import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import styles from "../styles/index.module.scss";

export default function MapView() {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN ?? "";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-1.46389, 53.296543],
      zoom: 13,
    });
  }, []);

  return (
    <div id="map">
      <div className={styles.style1} ref={mapContainer} />
    </div>
  );
}
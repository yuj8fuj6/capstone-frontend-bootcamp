import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContext } from "../contexts/MapContext";

const zoomLevel = 17;

const MapDisplay = () => {
  // renaming done like so
  const { locationData: center, setLocationData } = useContext(MapContext);

  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const redIcon = new LeafIcon({
    iconUrl:
      "https://chart.googleapis.com/chart?chst=d_map_xpin_icon_withshadow&chld=pin_star|home|FF0000|FFFF00",
  });

  // set view, redundant comment
  function SetViewComponent() {
    const map = useMap();
    useEffect(() => {
      map.flyTo(locationData, 17);
    }, [locationData]);
  }

  return (
    <div className="text-darkgreen">
      <MapContainer
        center={center}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        className="w-[1100px] h-[700px] rounded-xl ml-20 mt-10"
      >
        <SetViewComponent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={redIcon}>
          <Popup>{locationData}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapDisplay;

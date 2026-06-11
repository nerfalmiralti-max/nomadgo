"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { PLACES, getPlacesByIds } from "@/lib/siteData";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

type NomadMapProps = {
  routePlaceIds?: string[];
  focusedPlaceId?: string;
  showAllConnections?: boolean;
};

type ImageImport = string | { src: string };

function getImageUrl(image: ImageImport) {
  return typeof image === "string" ? image : image.src;
}

const defaultIcon = L.icon({
  iconRetinaUrl: getImageUrl(markerIcon2x),
  iconUrl: getImageUrl(markerIcon),
  shadowUrl: getImageUrl(markerShadow),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Map({
  routePlaceIds = [],
  focusedPlaceId,
  showAllConnections = false,
}: NomadMapProps) {
  const routePlaces = getPlacesByIds(routePlaceIds);
  const activePlaces = routePlaces.length > 0 ? routePlaces : PLACES;
  const routeLine: LatLngExpression[] = routePlaces.map((place) => place.coordinates);
  const bounds: LatLngBoundsExpression = activePlaces.map((place) => place.coordinates);
  const hubPlace = PLACES.find((place) => place.id === "almaty") ?? PLACES[0];
  const connectionLines: LatLngExpression[][] = showAllConnections
    ? PLACES.filter((place) => place.id !== hubPlace.id).map((place) => [
        hubPlace.coordinates,
        place.coordinates,
      ])
    : [];

  return (
    <div className="h-[520px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/5">
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [46, 46] }}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {showAllConnections ? (
          connectionLines.map((positions, index) => (
            <Polyline
              key={`connection-${index}`}
              positions={positions}
              pathOptions={{
                color: index % 2 === 0 ? "#ffffff" : "#818cf8",
                opacity: 0.42,
                weight: 3,
                dashArray: index % 2 === 0 ? "8 10" : "2 9",
              }}
            />
          ))
        ) : routeLine.length > 1 ? (
          <Polyline
            positions={routeLine}
            pathOptions={{
              color: "#818cf8",
              opacity: 0.9,
              weight: 4,
            }}
          />
        ) : null}

        {PLACES.map((place) => {
          const isActive =
            showAllConnections ||
            routePlaceIds.length === 0 ||
            routePlaceIds.includes(place.id) ||
            focusedPlaceId === place.id;

          return (
            <Marker
              key={place.id}
              icon={defaultIcon}
              position={place.coordinates}
              opacity={isActive ? 1 : 0.45}
            >
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.desc}
                <br />
                Best time: {place.bestTime}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

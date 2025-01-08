import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";

import { Map, MapStyle, NavigationControl } from "react-map-gl/maplibre";
import { Marker } from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import mapStyle from "./styles/dark.json"; // Edit map style on [Maputnik](https://maputnik.github.io/editor)

import { lastCarAtom } from "../../state/msg";
import style from "./Nav.module.css";

export const Nav = () => {
  const car = useAtomValue(lastCarAtom);

  const [track, setTrack] = useState(true);

  const [viewState, setViewState] = useState({
    latitude: 35.61855046346434,
    longitude: 139.73201705274556,
    bearing: 0,
    zoom: 17,
    pitch: 60,
  });

  useEffect(() => {
    if (car && track) {
      setViewState((prevState) => ({
        ...prevState,
        latitude: car.geoloc.lat,
        longitude: car.geoloc.lng,
      }));
    }
  }, [car, track]);

  return (
    <Map
      {...viewState}
      onMove={(e) => {
        setViewState(e.viewState);
        setTrack(false);
      }}
      mapStyle={mapStyle as MapStyle}
    >
      {car && (
        <Marker latitude={car.geoloc.lat} longitude={car.geoloc.lng}>
          <div className={style.marker} />
        </Marker>
      )}
      <NavigationControl />
      <button className={style.button} onClick={() => setTrack(true)}>
        Track
      </button>
    </Map>
  );
};

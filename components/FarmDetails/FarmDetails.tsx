import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";

type Coordinate = { lat: number; lng: number };

type GeoJSONFeature = {
  type: string;
  properties: {
    projID: string;
    P_Area: string;
    Area_ha: number;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
};

const FarmDetails = () => {
  const selectedFarm = useSelector((state: RootState) => state.farm.selectedFarm);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const calculateCenterFromBounds = (coordinates: Coordinate[]) => {
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
  
    for (const { lat, lng } of coordinates) {
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    }
  
    return {
      lat: (minLat + maxLat) / 2,
      lng: (minLng + maxLng) / 2,
    };
  };

  let managementAreas = [];
  if (selectedFarm) {
    if (typeof selectedFarm.managementAreasGeoJSON === 'string') {
      managementAreas = JSON.parse(selectedFarm.managementAreasGeoJSON);
    } else if (Array.isArray(selectedFarm.managementAreasGeoJSON)) {
      managementAreas = selectedFarm.managementAreasGeoJSON;
    }
  }

  const defaultFallbackCenter = useMemo(() => {
    return {
      lat: selectedFarm?.latitude || 0,
      lng: selectedFarm?.longitude || 0
    };
  }, [selectedFarm]); // Fallback to a default location

  const allCoordinates: Coordinate[] = managementAreas.flatMap((area: GeoJSONFeature) =>
    area.geometry.coordinates[0].map(([lng, lat]) => ({ lat, lng }))
  );

  const center = useMemo(() => {
    if (allCoordinates.length === 0) {
      // console.error('Invalid or empty coordinates, using fallback center.');
      return defaultFallbackCenter;
    }
    const calculatedCenter = calculateCenterFromBounds(allCoordinates);
    if (isNaN(calculatedCenter.lat) || isNaN(calculatedCenter.lng)) {
      // console.error('Invalid calculated center, using fallback center.');
      return defaultFallbackCenter;
    }
    return calculatedCenter;
  }, [allCoordinates, defaultFallbackCenter]);

  const mapOptions = {
    fullscreenControl: false,
    mapTypeId: 'satellite',
    keyboardShortcuts: false,
    disableDefaultUI: true,
    styles: [
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                { "visibility": "off" }
            ]
        }
    ]
  };

  if (!selectedFarm) {
    return <div>No Farms Found</div>;
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-bold '> Farm {selectedFarm.id} Details </h1>
      <h2 className='font-bold '>Management Areas</h2>
      <div className='w-full aspect-video border rounded-md'>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "inherit" }}
            zoom={13}
            center={center}
            options={mapOptions}
          >
            {managementAreas.map((area: { geometry: { coordinates: [any, any][][]; }; }, index: React.Key | null | undefined) => {
              const coordinates = area.geometry.coordinates[0].map(([lng, lat]) => ({ lat, lng }));
              return (
                <Polygon
                  key={index}
                  paths={coordinates}
                  options={{ strokeColor: "#FF0000", fillColor: "#FF0000" }}
                />
              );
            })}
          </GoogleMap>
        )}
      </div>
      <div>
      <ul className='grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-3 gap-2'>
        {managementAreas.map((area: { properties: { projID: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; P_Area: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; Area_ha: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }, index: React.Key | null | undefined) => (
          <li key={index} className='mb-4 border rounded-md p-2 hover:bg-slate-200'>
            <strong>Project ID:</strong> {area.properties.projID}<br />
            <strong>Planting Area:</strong> {area.properties.P_Area}<br />
            <strong>Area in ha:</strong> {area.properties.Area_ha}
          </li>
        ))}
      </ul>
      </div>

    </div>
  );
};

export default FarmDetails;

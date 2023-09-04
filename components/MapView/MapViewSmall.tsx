import React, { useMemo } from 'react'
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

interface Props {
    farm: Farm;
}

const MapViewSmall = ({farm}: Props) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });

    const center = useMemo(() => {
        return {
            lat: farm.latitude,
            lng: farm.longitude
        }
    }, [ ]);

    const mapOptions = {
        fullscreenControl: false,
        mapTypeId: 'satellite', 
        keyboardShortcuts: false, 
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

  return (
    <div className='h-40 w-40 rounded-md pointer-events-none cursor-pointer'>
        {isLoaded && (
            <GoogleMap
                mapContainerStyle={{width: "100%", height: "100%", borderRadius: "inherit"}}
                zoom={10}
                center={center}
                options={mapOptions}
            >
            </GoogleMap>
        )}
    </div>
  )
}

export default MapViewSmall
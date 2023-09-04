import React, { useMemo } from 'react'
import { GoogleMap, Polygon, useLoadScript, Marker } from "@react-google-maps/api";

interface Props {
    farm: Farm;
}
const MapViewLarge = ({farm}: Props) => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });

    const center = useMemo(() => {
        return {
            lat: farm.latitude,
            lng: farm.longitude
        }
    }, [farm.latitude, farm.longitude]);



  return (
    <div>MapViewLarge</div>
  )
}

export default MapViewLarge
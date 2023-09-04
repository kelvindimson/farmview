// import React from 'react'
"use client"
import Link from "next/link";
import useHandleFarmClick from "@/hooks/useHandleFarmClick";
import { useRouter } from 'next/navigation'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import MapViewSmall from "../MapView/MapViewSmall";
import { useAutoAnimate } from '@formkit/auto-animate/react'


interface Props {
    farms: Farm[];
}

const FarmsGrid = ({farms}: Props ) => {
    const [animateRef] = useAutoAnimate<HTMLElement>();

    const handleFarmClick = useHandleFarmClick();
    const router = useRouter()

    const navigateToDetails = (farmId: number) => {
        // Navigate to the farm details page
        router.push(`/farms/${farmId}`);
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });

    if(!isLoaded) return <div>Loading...</div>

  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" ref={animateRef}>
        {farms.map((farm) => (
            <div key={farm.id} className="cursor-pointer h-fit flex flex-row items-center gap-4 border border-green-800 rounded-md p-4 bg-teal-50 hover:bg-[#09342e] hover:text-white"
            onClick={() => {
                handleFarmClick(farm.id, farms);
                navigateToDetails(farm.id);
              }}
            >
                
                <MapViewSmall farm={farm} />
                

                <div className="">
                    <h2 className="font-bold text-xl mb-2">{farm.name}</h2>
                    <p>Address: {farm.address}</p>
                    <p>Email: {farm.email}</p>
                    <p>Website: {farm.website}</p>
                </div>
            </div>
            ))}
        </div>
    </>
  )
}

export default FarmsGrid
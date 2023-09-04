"use client"
import Link from "next/link";
import useHandleFarmClick from "@/hooks/useHandleFarmClick";
import { useRouter } from 'next/navigation'
import { useLoadScript } from "@react-google-maps/api";
import MapViewSmall from "../MapView/MapViewSmall";

interface Props {
    farms: Farm[];
}

const FarmsGrid = ({farms}: Props ) => {

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
        <div className="grid grid-cols-1 sm:grid-cols-1 tb:grid-cols-2 lg:grid-cols-3 gap-4">
        {farms.map((farm) => (
            <div key={farm.id} className="cursor-pointer h-fit flex flex-row items-center gap-4 border border-green-800 rounded-md p-4 bg-teal-50 hover:bg-[#09342e] hover:text-white"
            onClick={() => {
                handleFarmClick(farm.id, farms);
                navigateToDetails(farm.id);
              }}
            >
                
                <MapViewSmall farm={farm} />
                <div className="">
                    <div className="mb-2">
                    <h3 className="font-bold text-xl mb-2">{farm.name}</h3>
                    <p>Address: {farm.address}</p>
                    <p>Email: {farm.email}</p>
                    <p>Website: {farm.website}</p>
                    </div>
                    <button className="p-2 rounded-md bg-green-800 text-white hover:bg-green-600" >
                        <Link href={`/farms/${farm.id}`}>
                           View Details
                        </Link>
                    </button>
                </div>
            </div>
            ))}
        </div>
    </>
  )
}

export default FarmsGrid
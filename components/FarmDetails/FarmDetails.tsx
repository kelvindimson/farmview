import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import MapViewLarge from '../MapView/MapViewLarge';
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react';

const FarmDetails = () => {
  const router = useRouter()
  const selectedFarm = useSelector((state: RootState) => state.farm.selectedFarm);

  let managementAreas = [];
  if (selectedFarm) {
    if (typeof selectedFarm.managementAreasGeoJSON === 'string') {
      managementAreas = JSON.parse(selectedFarm.managementAreasGeoJSON);
    } else if (Array.isArray(selectedFarm.managementAreasGeoJSON)) {
      managementAreas = selectedFarm.managementAreasGeoJSON;
    }
  }
  if (!selectedFarm) {
    return <div>No Farms Found</div>;
  }

  const goBack = () => {
    router.back();
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold '> Farm {selectedFarm.id} Details </h1>
          <h2 className='font-bold '>Management Areas</h2>
        </div>

        <div className=''>
          <button className='p-2 rounded-md bg-green-800 text-white hover:bg-green-600 flex items-center'
          onClick={() => router.back()}
          >
           <ChevronLeft /> Back
          </button>
        </div>
      </div>
      <MapViewLarge farm={selectedFarm} />
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

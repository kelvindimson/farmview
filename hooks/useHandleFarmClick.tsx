// useHandleFarmClick.ts
"use Client"
import { useDispatch } from 'react-redux';
import { setFarms, setSelectedFarm } from '@/store/slice/farmSlice';

const useHandleFarmClick = () => {
  const dispatch = useDispatch();

  const handleFarmClick = (farmId: number, farms: Farm[]) => {
    // Set all the farms first
    dispatch(setFarms(farms));

    // Then find and set the selected farm by ID
    const selectedFarm = farms.find((f) => f.id === farmId);

    if (selectedFarm) {
      dispatch(setSelectedFarm(selectedFarm));
    } else {
      // Handle the case where the farm is not found, perhaps set selectedFarm to null
      dispatch(setSelectedFarm(null));
    }
  };

  return handleFarmClick;
};

export default useHandleFarmClick;

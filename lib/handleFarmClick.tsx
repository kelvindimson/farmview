import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFarm } from '@/store/slice/farmSlice';
import { RootState } from '@/store/store';

const FarmClick = (farmId: number) => {
  const dispatch = useDispatch();
  
  const farms = useSelector((state: RootState) => state.farm.farms); // Assumes your slice is named 'farm' in the store
  const farm = farms.find((f) => f.id === farmId);

  if (farm) {
    dispatch(setSelectedFarm(farm));
  } else {
    // Handle the case where the farm is not found, perhaps set selectedFarm to null
    dispatch(setSelectedFarm(null));
  }
};

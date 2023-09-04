// farmSlice.ts
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FarmState {
  farms: Farm[];
  selectedFarm: Farm | null;
}

const initialState: FarmState = {
  farms: [],
  selectedFarm: null,
};

const farmSlice = createSlice({
  name: 'farm',
  initialState,
  reducers: {
    setFarms: (state, action: PayloadAction<Farm[]>) => {
      state.farms = action.payload;
    },
    setSelectedFarm: (state, action: PayloadAction<Farm | null>) => {
      state.selectedFarm = action.payload;
    },
    // Add more reducers here as needed
  },
});

export const { setFarms, setSelectedFarm  } = farmSlice.actions;

export default farmSlice.reducer;


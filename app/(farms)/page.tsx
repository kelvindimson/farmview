
import Link from 'next/link'
import getAllFarms from '@/lib/getAllFarms' 
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import React from 'react'
import FarmsGrid from '@/components/FarmsGrid/FarmsGrid'
// import  { RootState } from '@/store/store'
import { setFarms } from '@/store/slice/farmSlice'

const HomePage = async () => {
  // const dispatch = useDispatch()

  const farmsData: Promise<Farm[]> = getAllFarms()
  const farms = await farmsData
  

  return (
    <div className=''>
      <h1 className="mb-3 text-3xl text-bold"> Welcome to Farm View </h1>
      <FarmsGrid farms={farms}/>
    </div>
  )
}

export default HomePage
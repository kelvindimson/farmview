
import getAllFarms from '@/lib/getAllFarms' 
import React from 'react'
import FarmsGrid from '@/components/FarmsGrid/FarmsGrid'


const HomePage = async () => {

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
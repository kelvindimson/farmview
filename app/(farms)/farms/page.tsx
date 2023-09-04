import FarmsGrid from '@/components/FarmsGrid/FarmsGrid'
import React from 'react'

import getAllFarms from '@/lib/getAllFarms' 
const FarmsPage = async () => {
  const farmsData: Promise<Farm[]> = getAllFarms()
  const farms = await farmsData

  return (
    
    <div>
      <div className=''>
        <h1 className="mb-3 text-3xl text-bold"> Welcome to Farm View </h1>
        <FarmsGrid farms={farms}/>
    </div>
    </div>
  )
}

export default FarmsPage
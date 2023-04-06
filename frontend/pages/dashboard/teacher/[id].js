import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import Card from '@/components/common/Card'

function Teacher() {

  const router = useRouter()
  useEffect(() => {
    console.log(router.query['id'])
  }, [])
  
  const cardData = [
    {
      name: ""
    }
  ]

  return (
    <div className='h-screen'>
      <div className='w-[300px]'>
        <Card />
      </div>
    </div>
  )
}

export default Teacher
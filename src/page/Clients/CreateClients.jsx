import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateClients() {




  return (
    <div>
      <div className='flex justify-between items-center py-5 px-7'>
        <h1>
          Edit client
        </h1>
        <Link to={"/clients"} className=' py-[7px] px-5 bg-button text-aside rounded-md'>
          back
        </Link>
      </div>
      <input type="text" />
    </div>
  )
}

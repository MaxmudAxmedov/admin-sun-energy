import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateClients() {

  const [state, setstate] = React.useState(1)
  return (
    <div>
      <div className='flex justify-between items-center py-5 px-7'>
        <h1>
          Edit client
        </h1>
        <Link to={"/clients"} className=' py-[7px] px-5 bg-button  text-aside rounded-md'>
          back
        </Link>
      </div>
      <div className='w-[500px] flex py-2 px-4  bg-shadows justify-between gap-2 rounded-md mb-5'>
        <button onClick={() => setstate(1)} className={`w-[240px] transform-all duration-300 text-center p-1 m-0  ${state == 1 ? `bg-red text-bll` : "bg-shadows "}  border-none  rounded-md`}>For Individuals</button>
        <button onClick={() => setstate(2)} className={`w-[240px] transform-all duration-300 text-center p-1 m-0   ${state == 1 ? "bg-shadows " : `bg-red`}  border-none  rounded-md `}>For legal clients</button>
      </div>
      {state == 1 && <form>
        <Input type="text" />
        <Input type="text" />
        <Input type="text" />
      </form>}
      {state == 2 && <form>
        <div>
          <Input type={"text"} />
        </div>
      </form>
      }

    </div>
  )
}

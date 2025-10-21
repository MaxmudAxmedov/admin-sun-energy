import React from 'react'
import useQueryEmploys from './service/useQueriyEmploys';

export default function Employees() {
  const {data, isLoading, isError, error} = useQueryEmploys()
  // if(isError){
  //   return <h1>{error.message}</h1>
  // }
  // if(isLoading){
  //   return <h1>LOADING...</h1>
  // }

  console.log(data);
  
  return (
    <div>Employees</div>
  )
}

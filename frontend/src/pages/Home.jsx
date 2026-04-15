import React from 'react'
import SideeBar from "../components/SideeBar"
import MessageArea from "../components/MessageArea"
import getMessage from '../customHooks/getMessage'

function Home() {
  getMessage()
  return (
    <div className=' flex w-[full] h-[100vh] overflow-hidden'>
      <SideeBar/>
     <MessageArea/>
  
      
  
    </div>
  )
}

export default Home

import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

function ReceiverMessage({image,message}) {
  let scroll= useRef()
  let {selectUser}= useSelector(state=>state.user)
  useEffect(()=>{
scroll.current.scrollIntpView({behavior:"smooth"})
  },[message,image])

 const handleImageScroll=()=>{
scroll.current.scrollIntpView({behavior:"smooth"})
 }
  return (
    
     <div className=' flex items-start gap-[10px]' >
          <div className=' w-[40px]  h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg '  onClick={()=>navigate("/profile")}> 
               <img src={selectUser.image || dp} className=' h-[full] ' />
               </div>
               <div ref={scroll} className='w-fit max-w-[500px] px-[20px] py-[10px] bg-blue-600 text-white text-[19px]   rounded-tl-none rounded-2xl  relative left-0   shadow-gray-500 shadow-lg flex flex-col gap-[10px]'>
         {image && <img src={image}   className=' w-[150px] rounded-lg' onLoad={handleImageScroll}/>}
   
        {message && <span >{message}</span>}
        </div>
       
       </div>
  )
}

export default ReceiverMessage

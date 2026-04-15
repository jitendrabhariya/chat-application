import React, { useEffect, useState } from 'react'
import  dp  from "../assets/image1.webp"
import { IoIosSearch } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";

import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../main';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice.js';
import { useNavigate, useNavigation } from 'react-router-dom';


function SideeBar() {
  let navigate =useNavigate()
    let {userData,otherUsers,selectUser,onlineUsers,searchData} = useSelector(state=>state.user)
    let [search,setSearch]= useState( false)
    let dispatch = useDispatch()
    let [input,setInput] =useState("")

    const handleLogOut = async ()=>{
      try {
        let result= await axios.get( `${serverUrl}/api/auth/logout` , { withCredentials:true})
         dispatch(setUserData(null))
         dispatch(setOtherUsers(null))
      } catch (error) {
        
        
      }
    }
     const handleSearch = async ()=>{
      try {
        let result= await axios.get( `${serverUrl}/api/user/search?query=${input}` , { withCredentials:true})
         dispatch(setSearchData(result.data))
         console.log(result.data)
        
      } catch (error) {
        console.log(error)
        
        
      }
    }
   useEffect(()=>{
  const delay = setTimeout(()=>{
    if(input){
      handleSearch()
    }
  },500)

  return ()=> clearTimeout(delay)
},[input])
  return (
    <div className={`lg:w-[30%] w-full lg:block overflow-visible  bg-white h-full    ${!selectUser?"block":" hidden"}`}>
      <div className=' w-[60px]  h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-blue-500 shadow-gray-500 shadow-lg fixed bottom-[20px] left-[10px]' onClick={handleLogOut}> 
         <RiLogoutCircleLine className='w-[25px] h-[25px]' />
      </div>
        <div className=' w-full min-h-[350px] bg-blue-500   rounded-b-[30%] shadow-gray-400 shadow-lg flex  flex-col  justify-center px-[20px] relative  '>
       
         <h1 className='text-white font-bold text-[25px]'> Chatly</h1>  
<div className='w-full  flex justify-between  items-center'>
    <h1 className='text-gray-800 font-bold text-[25px]'> Hii, {userData?.userName} </h1>
      <div className=' w-[60px]  h-[60px] rounded-full overflow-hidden flex justify-center items-center '  onClick={()=>navigate("/profile")}> 
      <img src={userData?.image || dp} className=' h-[full] ' />
      </div>
      </div>
      <div className="w-full flex items-center gap-[20px] overflow-y-auto">
        {!search &&
        <div className=' w-[50px]  h-[50px]   rounded-full overflow-hidden flex justify-center items-center  bg-white shadow-gray-500  mt-[10px] cursor-pointer' onClick={()=>setSearch(true)}>
          <IoIosSearch  className=' w-[25px] h-[25px]' />
        </div>
         }

         {search && 
         <form  className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg mt-[10px] rounded-full overflow-hidden px-[20px] flex items-center gap-[10px] relative '>
           <IoIosSearch  className=' w-[25px] h-[25px]  ' />
           <input type="text" placeholder='search users...' className=' w-full h-[full] p-[10px] outline-none border-0 text-[17px]' onChange={(e)=>setInput(e.target.value)} value={input}/>
           <RxCross2 className=' w-[25px] h-[25px] cursor-pointer'  onClick={ ()=> setSearch(false)} />
           
         </form>
         }

         { !search && otherUsers?.map((users)=>(
          onlineUsers?.includes(users._id) &&
         
          <div className=' w-[50px]  flex-shrink-0 h-[50px] rounded-full overflow-hidden flex justify-center items-center '  onClick={()=>{dispatch(setSelectedUser(users)) ; setInput("") ;setSearch(false)}}> 
          <img src={users.image || dp} className=' w-full  h-full object-cover ' />
         
         </div>
         
         
         ))}


      </div> 

    </div>
  
     {/* <div className='flex w-full h-[500px] overflow-y-auto flex-col gap-[10px] absolute top-[250px] bg-white z-[150] items-center pt-[20px]'>
             {searchData?.map((user)=>(
              <div>

                <div className=' w-[95%] h-[70px]  flex   items-center gap-[20px]  rounded-full  border-b-2 border-gray-400  px-[10px]' onClick={()=>dispatch(setSelectedUser(user))}>
          <div className=' w-[60px]  h-[60px] rounded-full overflow-hidden flex justify-center items-center '> 
          <img src={user.image || dp} className=' h-[full] ' />
         </div>
         <h1 className='text-gray-800  font-medium text-[20px]'> {user.userName}</h1>
         </div>
              </div>

             ))}
            </div> */}

           {input.length>0 &&  <div  className=' w-full h-[50%]  overflow-scroll flex  flex-col gap-[20px] mt-4 ml-2 '> 
       {searchData?.map((users)=>(
        <div className=' w-[95%] h-[60px]  flex   items-center gap-[20px]  bg-white  rounded-full  ' onClick={()=>{dispatch(setSelectedUser(users)) ; setInput("") ;setSearch(false)}}>
          <div className=' w-[60px]  h-[60px] rounded-full overflow-hidden flex justify-center items-center  '> 
          <img src={users.image || dp} className=' h-[full] ' />
         </div>
         <h1 className='text-gray-800  font-medium text-[20px]'> {users.userName}</h1>
         </div>
         ))}
    </div>
}






   {input.length==0 &&<div  className=' w-full h-[50%]  overflow-auto flex  flex-col gap-[20px] mt-4 ml-2 pb-10 '> 
     { otherUsers?.map((users)=>(
      <div className=' w-[95%] h-[60px]  flex   items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full  ' onClick={()=>dispatch(setSelectedUser(users))}>
          <div className=' w-[60px]  h-[60px] rounded-full overflow-hidden flex justify-center items-center  '> 
          <img src={users.image || dp} className=' h-[full] ' />
         </div>
         <h1 className='text-gray-800  font-medium text-[20px]'> {users.userName}</h1>
         </div>
         ))}
       

    </div>
}
    </div>
  )
}

export default SideeBar

import React from 'react'
import  dp  from "../assets/image1.webp"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useRef } from 'react'
import { serverUrl } from '../main'
import { setUserData } from '../redux/userSlice.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function Profile() {
  let navigate = useNavigate()
  let {userData}=useSelector( state=>state.user)
  let [name,setName] =useState(userData.name || " ")
  let [frontendImage,setFrontendImage] = useState(userData.image|| dp)
  let [backendImage,setBackendImage]=useState(null)
  let dispatch=useDispatch()
  let [loading, setLoading] = useState(false)
  let image=useRef()
 
 const handleImage=(e)=>{
  let file = e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))
}
 

 
  const handleProfile=async (e)=>{
  
    e.preventDefault()
      setLoading(true)
    try {
      let formData = new FormData()
      formData.append("name",name)
      if(backendImage){
        formData.append("image",backendImage)
      }
      
      let result = await axios.put(`${serverUrl}/api/user/profile`,formData, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate("/")
      setLoading(false)
      console.log(result)
    } catch (error) {
  console.log(error)
  setLoading(false)
      
    }

  }
  return(
    <div className=' w-[full]  h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]' >
      <div className=' w-[200px]  h-[200px] rounded-full overflow-hidden flex justify-center items-center' onClick={()=>image.current.click()}> 
      <img src={frontendImage}  className='h-[full]'/>
      </div>
      <form  className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center' onSubmit={handleProfile}>
   <input type="file" accept='image/*'  ref={image} hidden onChange={handleImage}/>

     <input type="text"  className=" w-[90%] h-[60px] outline-none border-2 border-blue-500 px-[10px] py-[10px]" onChange={(e)=>setName(e.target.value)} value={name}/>
     <input type="text"    className="w-[90%] h-[60px] outline-none border-2 border-blue-500 px-[10px] py-[10px]" readOnly value={userData.userName}/>
    <input type="text"   className="w-[90%] h-[60px] outline-none border-2 border-blue-500 px-[10px] py-[10px]" readOnly value={userData.email}/>
     <button className='px-[20px] py-[10px] bg-blue-500 rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner'>{loading?"saving...":"save"}</button>
      </form>

    </div>

  )
}
export default Profile
 
import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { serverUrl } from '../main'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function SignUp() {
  let navigate=useNavigate()
  let [show,setShow]=useState(false)
  let [userName,setUserName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [loading, setLoading] =useState(false)
  let [err,setErr]=useState("")
  let dispatch=useDispatch()
 
  
  

  const handleSignUp = async (e)=>{
    
    setLoading(true)
    e.preventDefault()
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`,{
         userName,
          email,
          password

    },{ withCredentials:true})
    dispatch(setUserData(result.data))
    navigate("/profile")
    console.log( result)
     
      setLoading(false)
      setErr("")
      
    } catch (error) {
      console.log( "errororo")
      console.log( error.response.data.message)
      setLoading(false)
      setErr( error.response.data.message )

      
    }

  }

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex  flex-col gap-[30px]'>
     <div className=' w-full h-[200px] bg-blue-500 rounded-b-[30%] flex items-center justify-center'> 
         <h1 className=" text-[40px] "> Chat karo <span className='text-white'>Bhaiya</span></h1>
           </div>
          
            <form  className=" flex flex-col  items-center justify-center  gap-[20px] " onSubmit={handleSignUp}>
                <input type="text"  placeholder='username' className=" w-[90%] h-[60px] outline-none border-2 border-blue-500 px-[10px] py-[10px]" onChange={(e)=>setUserName(e.target.value)} value={userName}/>
                <input type="text"  placeholder='email' className=" w-[90%] h-[60px] outline-none border-2 border-blue-500 px-[10px] py-[10px]" onChange={(e)=>setEmail(e.target.value)} value={email} />
                <div className='w-[90%] h-[60px] border-2 border-blue-500 relative'>
                <input type={`${show?"text":"password"}`}  placeholder='password' className="  w-full h-full outline-none  px-[10px] py-[10px]" onChange={(e)=>setPassword( e.target.value)} value={password}/>
                <span className=' text-blue-800 font-semibold absolute  right-[10px] top-[14px] cursor-pointer' onClick={()=>setShow( prev=>!prev)}> { `${show?"hidden":"show" }`} </span>
 
                </div>
                {err?<p className='text-red-700'>{err}</p>:" "}
                


                <button className='px-[20px] py-[10px] bg-blue-500 rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner'>{loading?"Loading":"Sign up"} </button>
                <p className=' cursor-pointer' onClick={ ()=>navigate("/login")}> Already have an acount ? <span className=' text-blue-800 text-[20px]'>Login</span></p>
            </form>
          
      
        </div>
     
    </div>
  )
}

export default SignUp

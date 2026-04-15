import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { serverUrl } from '../main'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSelectedUser, setUserData } from '../redux/userSlice.js'

 function LogIn() {
   let navigate=useNavigate()
    let [show,setShow]=useState(false)
    let [email,setEmail] = useState("")
    let [password,setPassword] =useState("")
    let dispatch = useDispatch()
     let [err,setErr]=useState("")

    const handleLogIn = async (e)=>{
      e.preventDefault()

      try {
        let result = await axios.post(`${serverUrl}/api/auth/login`,{
          email,
          password
        },{ withcredentials:true})
      
        dispatch(setUserData(result.data))
        dispatch(setSelectedUser(null))
        navigate("/")
        
      } catch (error) {
        setErr( error.response.data.message )
        console.log(error.response.data.message)
      }

    }
  return (
   <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex  flex-col gap-[30px]'>
     <div className=' w-full h-[200px] bg-blue-500 rounded-b-[30%] flex items-center justify-center'> 
         <h1 className=" text-[40px] "> Login to <span className='text-white'>Chat</span></h1>
           </div>
          
            <form action="" className=" flex flex-col  items-center justify-center  gap-[20px]  " onSubmit={handleLogIn}>
               
                <input type="text"  placeholder='email' className=" w-[90%] h-[60px] outline-none border-2 border-blue-500 px-[10px] py-[10px]  "  onChange={(e)=>setEmail( e.target.value)} value={email} />
                <div className='w-[90%] h-[60px] border-2 border-blue-500 relative'>
                <input type={`${show?"text":"password"}`}  placeholder='password' className="  w-full h-full outline-none  px-[10px] py-[10px]  " onChange={(e)=>setPassword( e.target.value)} value={password} />
                <span className=' text-blue-800 font-semibold absolute  right-[10px] top-[14px] cursor-pointer' onClick={()=>setShow( prev=>!prev)}> { ` ${show?"hidden":"show" }`} </span>
 
                </div>
                 {err?<p className='text-red-700'>{err}</p>:" "}
                
                <button className='px-[20px] py-[10px] bg-blue-500 rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner'>Login</button>
                <p className=' cursor-pointer' onClick={ ()=>navigate("/signup")}> Want to create a new account <span className=' text-blue-800 text-[20px]'>Signup</span></p>
            </form>
          
      
        </div>
     
    </div>
  )
}

export default LogIn

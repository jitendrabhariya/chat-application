import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/image1.webp"
import { IoMdArrowRoundBack } from "react-icons/io";
import { setSelectedUser } from '../redux/userSlice.js';
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage.jsx';
import ReceiverMessage from './ReceiverMessage.jsx';
import axios from "axios"
import { serverUrl } from '../main.jsx';
import { setMessages } from '../redux/messageSlice.js';


function MessageArea() {
  let dispatch = useDispatch()
  let [showPicker,setShowPicker] = useState(false)
  let {selectUser,userData,socket}=useSelector( state=>state.user)
  let [input,setInput] =useState("")
  let [frontendImage,setFrontendImage] = useState(null)
  let [backendImage,setBackendImage] = useState(null)
  let {messages} = useSelector(state=>state.message)
  let image=useRef()
  

  const handleSendMessage = async (e)=>{
    e.preventDefault()
    if( input.length==0 && backendImage==null){
      return 
    }
    try {
      let formData=new FormData()
      formData.append("message",input)
      if(backendImage){
        formData.append("image",backendImage)
      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectUser._id}`,formData,{withCredentials:true})
      dispatch(setMessages([...messages,result.data]))
      setInput("")
      setBackendImage(null)
      setFrontendImage(null)
      
      
    } catch (error) {
       console.log(error)
      
    }
  }
  

  const onEmojiClick = (emojidata)=>{
    setInput( prev=>prev+emojidata.emoji)
    setShowPicker(false)
  }
  const handleImage = (e)=>{
    let file= e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))

  }
  useEffect(()=>{
    socket.on("newMessage",(mess)=>{
      dispatch(setMessages([...messages,mess]))
    })
    return ()=>socket.off("newMessage")

  },[messages,setMessages])
  return (
    <div className={`lg-w-[70%]  ${selectUser?"flex":"hidden"} lg:flex w-full bg-slate-200 border-l-2 border-gray-300 relative`}>


         { selectUser &&
          <div className='w-full h-[100vh]  bg-white flex  flex-col '>
         
         <div className=' w-full h-[100px] bg-blue-500  rounded-b-[30px]   flex  items-center px-[20px] gap-[20px] '>
          <IoMdArrowRoundBack className=' text-[50px]'  onClick={()=>dispatch(setSelectedUser(null))}/>

        < div className=' w-[50px]  h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg'  onClick={()=>navigate("/profile")}> 
         
              <img src={selectUser?.image || dp} className=' h-[full] ' />
              </div>
         <h1 className='text-white font-bold text-[25px]'>{selectUser?.userName || "User" }</h1>
       
      </div>

       <div className='w-full h-[70%] bg-white py-[20px] px-[20px] flex flex-col  overflow-auto gap-[20px]' >
        <div className=' absolute bottom-[120px] left-[20px]  '> {showPicker && <EmojiPicker width={250} height={350} onEmojiClick={onEmojiClick}/>
}      </div>

        {messages?.map((mess)=>(
          mess.sender==userData._id?<SenderMessage image={mess.image} message={mess.message}/>:<ReceiverMessage image={mess.image} message={mess.message} />

        ))}
        

        

      </div>
      </div>
      
      
      }
      { !selectUser && 
       <div className=' w-full h-full flex items-center justify-center flex-col' >
    <h1 className=' text-[30px]'>Welcome to chatly </h1>
    <span className='text-[20px]'> Chat karo bindass..</span>
       </div>
      
      }

 { selectUser &&<div className=' w-full lg:w-[70%] h-[100px] fixed bottom-[20px]  flex items-center  justify-center' >
  <img src={frontendImage}  className='absolute  w-[80px] bottom-[100px] right-[20%]  rounded-s-lg'  />
<form className='w-[95%]  lg:w-[70%] h-[60px] bg-blue-500  shadow-gray-500 shadow-lg rounded-full flex items-center gap-[20px] px-[20px]  cursor-pointer' onSubmit={handleSendMessage} >
  <div onClick={ ()=>setShowPicker(prev=>!prev)}> 
<MdOutlineEmojiEmotions className='w-[25px] h-[25px] text-black z-[100]'  />
  </div>
  <input type="file"  hidden accept="image/*" ref={image} onChange={handleImage} />
  <input type="text"  placeholder='Message'  className=' w-full h-full outline-none border-0 text-[19px] text-black placeholder-black  bg-blue-500' onChange={(e)=>setInput( e.target.value)} value={input}/>
  <div>
<FaImages  className=' h-[25px] w-[25px] text-balack' onClick={()=>image.current.click()}/>
  </div>
{(input.length > 0 || frontendImage != null) ? (
  <button>
    <IoMdSend className='w-[25px] h-[25px] text-black'/>
  </button>
) : null}


</form>
</div>
}
    
    </div>
    
          

  )
}

export default MessageArea

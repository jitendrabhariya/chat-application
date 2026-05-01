import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice.js"
import axios from "axios"
import { setMessages } from "../redux/messageSlice.js"

const getMessage = ()=>{
    let dispatch=useDispatch()
    let {userData,selectUser} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchMessages=async ()=>{
            try {
                let result= await axios.get(`${serverUrl}/api/message/get/${selectUser?._id}`,{withCredentials:true})
                     console.log(result.data)
                      dispatch(setMessages(result.data))
                
            } catch (error) {
                console.log(error)
            }

        }
        fetchMessages()


    } ,[selectUser])
}
export default getMessage

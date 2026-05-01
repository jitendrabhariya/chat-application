import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice.js"
import axios from "axios"

const getCurrentUser = ()=>{
    let dispatch=useDispatch()
    let {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result= await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
                 
                
                      dispatch(setUserData(result.data))
                      
                
                     console.log(userData)
                
            } catch (error) {
                dispatch(setUserData(null))
                console.log(error)
                
            }

        }
        fetchUser()


    } ,[])
}
export default getCurrentUser

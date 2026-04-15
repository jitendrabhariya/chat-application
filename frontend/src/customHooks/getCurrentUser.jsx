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
                 if (JSON.stringify(result.data) !== JSON.stringify(userData))
                     {
                      dispatch(setUserData(result.data))
                      }
                
                     console.log(userData)
                
            } catch (error) {
                console.log(error)
            }

        }
        fetchUser()


    } ,[userData])
}
export default getCurrentUser
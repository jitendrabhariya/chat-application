import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice.js"
import axios from "axios"

const getOtherUsers = ()=>{
    let dispatch=useDispatch()
    let {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result= await axios.get(`${serverUrl}/api/user/others`,{withCredentials:true})
                 if (JSON.stringify(result.data) !== JSON.stringify(userData))
                     {
                      dispatch(setOtherUsers(result.data))
                      }
                
                     console.log(userData)
                
            } catch (error) {
                console.log(error)
            }

        }
        fetchUser()


    } ,[])
}
export default getOtherUsers
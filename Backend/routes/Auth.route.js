import express from "express"
import { logIn, logOut, signUp } from "../controllers/Auth.controllers.js"
const authrouter=express.Router()
authrouter.post("/signup" ,signUp)
authrouter.post("/login" ,logIn)
authrouter.get("/logout" ,logOut)
export default authrouter

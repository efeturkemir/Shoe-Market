import { defineStore } from 'pinia'
import router from '../router'
import axios from "axios"
import { ref } from 'vue'

export const useAuthStore = defineStore('auth',  {
 state: () =>({
   error: false,
   message: ref(""),
    token: "",
    user: {
        username: "",
        role: ""
    }
 }),
 persist: {
   paths: ["token", "user.username", "user.role"]
 },
 actions:{
   
    async login(temp_username, password){
      const URL = "https://marketserver.onrender.com/login"
      try{
      const res = await axios.post(URL,{
        username: temp_username,
        password: password
       })
       
       console.log(res);
       const {message, username, role} = res.data
       this.token = message
       this.user.username = username
       this.user.role = role
       
       localStorage.setItem('token', this.token)
       
       router.push("/")}catch(err){
         this.error = true
         
       }
      
    },
    async register(temp_username, password, confirmPassword){
      const URL = "https://marketserver.onrender.com/register"
      try{
      const res = await axios.post(URL,{
         username: temp_username,
         password: password,
         confirmPassword: confirmPassword
        })
        const {token, username, role} = res.data
        this.token = token
        this.user.username = username
        this.user.role = role
        localStorage.setItem('token', this.token)
        router.push("/")
      }catch(err){
         this.error = true
         this.message = err.response.data.message
      }
    },
    async logout(){
       await router.push("/login")
       localStorage.removeItem('auth')
       localStorage.removeItem('token')
    }
   
 }
})

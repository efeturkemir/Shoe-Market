const express = require('express')
const router = express.Router()
const User  = require('../models/user')
const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = router

router.post("/", express.json(), async (req, res) =>{
   
    try {
      const {username, password} = req.body
      let user = await User.findOne({username})
      
      
      if(!user){
        return res.status(400).json({message: "Invalid user"})
      }
      const isMatch = await bcyrpt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({message: "Invalid password"})
      }
      const token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET_KEY, {expiresIn: "15m"} )
      return res.status(200).json({message: token, username})
      
    } catch (error) {
        console.log(error);
    }
})
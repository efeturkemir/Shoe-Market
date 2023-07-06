const express = require('express')
const router = express.Router()
const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = router
const User = require('../models/user')
router.post('/', express.json(), async (req, res) =>{
    const {username, password, confirmPassword} = req.body
    
    try {
        let user = await User.findOne({username})
        if(user){
            return res.status(400).json({message: "Username already exist"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message: "Passwords do not match"})
        }
        const salt = await bcyrpt.genSalt(10)
        const hashedPassword = await bcyrpt.hash(password, salt)
        user = {username, password: hashedPassword, role:'user'}
        const createdUser =  await User.create(user)
        const token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET_KEY, {expiresIn: "15m"} )
        
        return res.status(200).json({username: user.username, token, role: user.role})
    } catch (error) {
        
      console.log(error);
    }
})
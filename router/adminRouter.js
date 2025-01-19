const express = require("express");
const jwt=require('jsonwebtoken');
const adminRouter = express.Router();

const admin = {
  email: "admin@login.com",
  password: "admin123"
};
adminRouter.post("/login",(req,res)=>
{
  const {email,password} = req.body // from frontend form

// checking the front end email password with backend 
    if(email !== admin.email || password !== admin.password)
    {
        return res.status(401).json({message : 'Invalid Email or Password'})
    }
//create a jwt if email and password was correct
const token= jwt.sign({email : admin.email}, 'your_secret_key', {expiresIn:'7d'})

res.json({token}) //send token to browser that is frontend form
})

adminRouter.post("/logout", (req, res) => {
  // Invalidate the token on the client-side
  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = adminRouter;

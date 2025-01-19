const express=require('express');
const router=express.Router();
const bcrypt = require("bcrypt");
const userModel=require('../model/userModel')

router.post('/signup',async(req,res)=>
{ 
    try
    {
    const {name,email,password,contact,age,city}=req.body 
    const existingUser = await userModel.findOne({email})
    console.log(existingUser)
    if(existingUser)
    {
        return res.status(400).json({error:"User already Exist"})
    }
    const hashedpassword=await bcrypt.hash(password,10)
    const newUser=new userModel({name,email,password:hashedpassword,contact,age,city});
    const savedUser= await newUser.save()
    res.status(201).json(savedUser)
    console.log("User saved successfully")
    }
    catch(error)
    {
        return res.status(500).json({error:error.message})
    }   
});

router.post("/login",async(req,res)=>
{
    try
    {
    const { email, password } = req.body;
    const checkUser = await userModel.findOne({ email });
    if (checkUser) 
    {
    const checkPassword = await bcrypt.compare(password,checkUser.password);
        if (checkPassword) 
        {
            res.json("success");
        } 
        else 
        {
            res.json("Notmatch");
        }
    } 
    else 
    {
        res.status(404).json("No user found!Please register before login!");
    }
    }
    catch(err)
    {
        res.status(500).json({err:err.message});
    }

})

router.get("/userview", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Edit User
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, email, contact },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

module.exports = router;

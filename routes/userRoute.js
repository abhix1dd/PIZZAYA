const express = require("express");

const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    newUser.save();
    res.send("User Register Successfully");
  } catch (error) {
    return res.status(404).json({ message: error });
  }
})



router.post("/login", async (req, res) => {
 
  User.find({email:req.body.email,password:req.body.password},(err,docs)=>{
    if(docs.length>0)
    {
      const user={
        name:docs[0].name,
        email:docs[0].email,
        _id:docs[0]._id,
        isAdmin:docs[0].isAdmin
      }
      res.send(user);
    }
    else{
      return res.status(400).json({message: 'Invalid Credintials'})
    }
  })
});

router.get("/getallusers",async(req,res)=>{
  try {
     const users=await User.find({})
     res.send(users);
  } catch (error) {
    return res.status(400).json({message: error})
  }
})


router.post("/deleteuser",async(req,res)=>{
const {userid}=req.body
try {
   await User.findOneAndDelete({_id:userid})
   res.send('User Deleted Successfully');
} catch (error) {
  return res.status(400).json({message: error})
}
})


module.exports = router;

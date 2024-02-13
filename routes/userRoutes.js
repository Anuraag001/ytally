const express=require('express')
const mongoose=require('mongoose')
const DOTENV=require('dotenv')
const uri=DOTENV.config().parsed.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    
    },
    lastName:{
        type:String,
        required:true
    },
    emailID:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    joinedAT:{
        type:Date,
        default:Date.now
    
    }
});

const User = mongoose.model('users', userSchema);
const Route=express.Router()


Route.get('/all',async (req,res)=>{
    const allUsers=await User.find({})
    res.json(allUsers)
})

Route.post('/get',async (req,res)=>{
    const data=req.body
    const user=await User.findOne({emailID:data.emailID,password:data.password})
    if(user){
        res.status(200).json({message:"Sign IN success",color:"text-lime-500"})
    }
    else if(User.findOne({emailID:data.emailID})){
        res.status(400).json({message:"Incorrect Password try again !",color:"text-orange-900"})
    }
    else{
        res.status(404).json({message:"No User Found",color:"text-orange-900"})
    }
})

Route.post('/add',async (req,res)=>{
    const data=req.body

    const existingUser = await User.findOne({ emailID: data.emailID })
    if(existingUser) { 
        return res.status(400).json({message:"Already Exists",color:"text-orange-900"})
    }

    const newUser=new User({
        firstName:data.firstName,
        lastName:data.lastName,
        emailID:data.emailID,
        password:data.password
    })
    try{

        const user=await newUser.save()
        res.status(200).json({message:"Sign UP Successful",color:"text-lime-500"})
    }
    catch(err){
        res.status(200).json({message:err.message,color:"text-orange-900"})
    }
})

Route.delete('/delete/:first_name', async (req, res) => {
    const name = req.params.first_name;

    try {
        const user = await User.findOne({ firstName: name });

        if (user) {
            await User.findOneAndDelete({ firstName: name });
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

Route.patch('/update', async (req, res)=>{
    const email=req.query.email
    console.log(email)
    const data=req.body
    const updatedUser=await User.findOneAndUpdate(
        {emailID:email},
        {$set:data},
        {new:false}
    )
    if(updatedUser){
        res.send({message:"User Updated",user:updatedUser})
    }
    else{
        res.status(404).json({message:"User not found"})
    }
})

module.exports=Route
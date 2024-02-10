const express=require('express')
const mongoose=require('mongoose')
const uri="mongodb+srv://ytally:ytally101@ytally.zsvxrz0.mongodb.net/ytallyDB?retryWrites=true&w=majority"
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
        required:true
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
    const user=await User.findOne({emailID:data.emailID})
    if(user){
        res.json(user)
    }
    else{
        res.status(404)
    }
})

Route.post('/add',async (req,res)=>{
    const data=req.body
    const newUser=new User({
        firstName:data.firstName,
        lastName:data.lastName,
        emailID:data.emailID
    })
    try{
        const user=await newUser.save()
        res.json(user)
    }
    catch(err){
        res.json({message:err})
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
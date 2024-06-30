const express=require('express')
const mongoose=require('mongoose')
const DOTENV=require('dotenv')
const axios = require('axios');
const uri=DOTENV.config().parsed.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS:5000000 });

const editorSchema=new mongoose.Schema({
    emailID:{
        type:String,
        required:false
    }
})

const playListSchema=new mongoose.Schema({
    PlaylistId:{
        type:String,
        required:true,
        editors:[editorSchema]
    }
})
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:false
    
    },
    lastName:{
        type:String,
        required:false
    },
    emailID:{
        type:String,
        required:false,
        unique:true
    },
    password:{
        type:String,
        required:false,
    },
    joinedAT:{
        type:Date,
        default:Date.now
    
    },
    allPlaylists:{
        type:[playListSchema],
        default:[]
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    channelID:{
        type:String,
        required:false
    },
    channelName:{
        type:String,
        required:false
    },
    playlistCount:{
        type:String,
        required:false,
    },
});

const User = mongoose.model('users', userSchema);
const Route=express.Router()


Route.get('/all',async (req,res)=>{
    const allUsers=await User.find({})
    res.json(allUsers)
})
Route.post('/get', async (req, res) => {
    try {
        const data = req.body;
        const userdetails = await User.findOne({ emailID: data.emailID });

        if (userdetails) {
            res.status(200).json({  user: userdetails });
        } else {
            res.status(404).json({ message: "User not found", color: "text-orange-900" });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal Server Error", color: "text-red-500" });
    }
});
Route.post('/editors/search', async (req, res) => {
    try {
        const { email } = req.body;
        console.log(`req.BODYIS${req.body}`);
        const user = await User.findOne({ emailID: email });
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error searching for editor:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
Route.post('/check',async (req,res)=>{
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

Route.post('/setPlaylists', async (req, res) => {
    const email = req.query.emailId
    const channelId = req.query.channelId
    const username = req.query.username
    console.log(email);
    try {
        const user = await User.findOne({ emailID: email });
        if (user) {
            console.log(user);
            res.send({ message: { user } });
        } else {
            const playlistsarray= await axios.post('http://localhost:3001/Youtube/playlistsarray',{},{params:{channelId:channelId}})
            const playlistIds = playlistsarray.data.array;
            const playlists = playlistIds.map(id => ({ PlaylistId: id }));
            const newUser = new User({
                emailID: email,
                channelID: channelId,
                firstName: username,
                joinedAT: new Date(),
                lastLogin: new Date(),
                allPlaylists: playlists,
                channelName:playlistsarray.data.channelName,
                playlistCount:playlists.length
            });
            console.log(playlistsarray.array)
            const savedUser = await newUser.save();
            console.log(`new is ${savedUser.id}`);
            res.send({ message: { user: savedUser } });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})

module.exports=Route
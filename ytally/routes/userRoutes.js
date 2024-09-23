const express=require('express')
const mongoose=require('mongoose')
const DOTENV=require('dotenv')
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { type } = require('os');
const { ConnectionClosedEvent } = require('mongodb');
const uri=DOTENV.config().parsed.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS:5000000 });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original filename
    }
});

const upload = multer({ storage: storage });

const editorSchema=new mongoose.Schema({
    emailID:{
        type:String,
        required:false
    }
})
const connections=new mongoose.Schema({
    editoremail:{
        type:String,
        required:true,
        unique:true,
    },
    creatorname:{
        type:String,
        required:true,
        unique:true,
    },
    creatoremail:{
        type:String,
        required:true,
    }
})
const editorandadmin=new mongoose.Schema({

    editoremail:{
        type:String,
        required:true,
        unique:true,
    },
    playlistId:{
        type:String,
        required:true,
        // unique:true,
    },
    creatoremail:{
        type:String,
        required:true,
    },
    joinedAT:{
        type:Date,
        default:Date.now
    
    }
})
const playListSchema=new mongoose.Schema({
    PlaylistId:{
        type:String,
        required:true,

    },
    editorsreq:[editorSchema],
    editors:[editorSchema]
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
    fileId:{
        type:String,
        required:false,
    }
});

const fileSchema =new mongoose.Schema({
    userId:{
        type:String,
        required:false
    },
    profileImage:{
        type:Buffer,
        required:false,
    },

});
const User = mongoose.model('users', userSchema);
const Req=mongoose.model('req',editorandadmin);
const ApprovedCreator=mongoose.model('conns',editorandadmin);
const userFiles=mongoose.model('userFiles',fileSchema);
const Route=express.Router()
Route.get('/all',async (req,res)=>{
    const allUsers=await User.find({})
    res.json(allUsers)
}); 
Route.get('/allconn',async (req,res)=>{
    const allUsers=await ApprovedCreator.find({})
    res.json(allUsers);
}); 

Route.get('/allreqs',async (req,res)=>{
    const allUsers=await Req.find({})
    res.json(allUsers)
}); 
Route.post('/creatorsrequests', async (req, res) => {
    const editoremail = req.body.emailID;
    // console.log(creatoremail);
    const requests = await Req.find(
        { editoremail }
    );

    res.status(200).json({ requests });
});
Route.post('/connections', async (req, res) => {
    const editoremail= req.body.email;
    // console.log(creatoremail);
    const connections = await ApprovedCreator.find(
        { editoremail}
    );

    res.status(200).json({ connections });
});


Route.post('/getById', async (req, res) => {
    try {
        const data = req.body;
        const userdetails = await User.findById(data.id);

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

// ?????fix 

// Route.get('/api/requests',async(req,res)=>{
//     const response=await Req.fi
// })
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
});
// Route.post('/addEditorToPlaylist', async (req, res) => {
//     const {emailId,playlistId ,editorEmail } = req.body;
//     const existingreq=await Req.findOne({editoremail:emailId});
//     if(existingreq){
//         existingreq.playlistId.push(playlistId);
//         existingreq.creatoremail.push(emailId);

//     }else{
//         const newreq=new Req({
//             editoremail:emailId,
//             playlistId:playlistId,
//             creatoremail:editorEmail
//         })
//     }
    

//     await newreq.save();


// });
Route.post('/addEditorToPlaylist', async (req, res) => {
    const { emailId, playlistId, editorEmail } = req.body;
    console.log(playlistId);
    try {
        const user = await User.findOne({ emailID:emailId });
        console.log(user);    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const playlist = user.allPlaylists.find(playlist => playlist.PlaylistId === playlistId);
        console.log(`sksjkcsk${playlist}`);
  
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        if (!Array.isArray(playlist.editorsreq)) {
            playlist.editorsreq = [];
        }
        const existingEditor = playlist.editorsreq.find(editor => editor.emailID === editorEmail);
        console.log(`ajhhjshjsjh${existingEditor}`);
  
        if (existingEditor) {
            // return res.redirect('http://localhost:3000/home');
             return res.status(400).json({ message: 'Already sent a request to the editor' });
        }

        playlist.editorsreq.push({ emailID: editorEmail });
        console.log(`akjscjasnclkanklcSSSSSSSSSSSSSS${editorEmail}${playlistId}${user.emailID}`);
        const newreq=new Req({
            editoremail:editorEmail,
            playlistId:playlistId,
            creatoremail:emailId
        });
        await newreq.save();

        await user.save();
  
        res.status(200).json({ message: 'Editor added successfully' });
    } catch (error) {
        console.error('Error adding editor to playlist:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
Route.post('/approvecreator', async (req, res) => {
    const { requestId } = req.body;
  
    if (!requestId) {
      return res.status(400).json({ error: 'Request ID is required' });
    }
  
    try {
      // Find the request
      const request = await Req.findById(requestId);
  
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
  
      await Req.findByIdAndDelete(requestId);
        await ApprovedCreator.create({
        creatoremail: request.creatoremail,
        editoremail: request.editoremail,
        playlistId:request.playlistId
      });
  
      res.status(200).json({ message: 'Request approved successfully' });
    } catch (error) {
      console.error('Error approving request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


Route.post('/rejectcreator', async (req, res) => {
    const { requestId } = req.body;
  
    if (!requestId) {
      return res.status(400).json({ error: 'Request ID is required' });
    }
  
    try {
      // Find and remove the request from the requests collection
      const result = await Request.findByIdAndDelete(requestId);
  
      if (!result) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      res.status(200).json({ message: 'Request rejected successfully' });
    } catch (error) {
      console.error('Error rejecting request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

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
Route.post('/uploadprofile', upload.single('file'), async (req, res) => {
    try {
        const { userId } = req.body; // Assuming userId is sent in req.body
        const imagePath = path.join(__dirname, '../uploads/', req.file.filename);

        // Read the image file
        const profileImage = fs.readFileSync(imagePath);
        // Check if a userFile with the given userId already exists
        let userFile = await userFiles.findOneAndUpdate(
            { userId: userId },
            {
                profileImage: profileImage
            },
            { new: true, upsert: true }
        );

        let userupdate= await User.findByIdAndUpdate(
            userId,
            {fileId:userFile._id},
            {new: true}
        )
        

        // Delete the file after saving to MongoDB (optional)
        fs.unlinkSync(imagePath);

        console.log('Image saved:', userFile); // Log the saved image document to console

        // Send the ID of the saved image document as a response
        res.status(200).json({ id: userFile._id });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
    }
});
Route.get('/getProfile',async (req,res) =>{
    try {
        const fileId = req.query.id;
        const file = await userFiles.findById(fileId);

        if (!file) {
            return res.status(404).send('File not found.');
        }

        // Send the image data as a response
        res.set('Content-Type', 'image/jpeg'); // Adjust content type based on your image format
        res.send(file.profileImage);
    } catch (error) {
        console.error('Error retrieving file:', error);
        res.status(500).send('Error retrieving file.');
    }
});
module.exports=Route,{User}
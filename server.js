const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const userRoutes=require('./routes/userRoutes')
const youtubeRoutes=require('./routes/youtubeRoutes')
const port=3001

app.get('/',(req,res)=>{
    res.json('Hello World')
})

app.use(bodyParser.json())
app.use('/Youtube',youtubeRoutes)
app.use('/Users',userRoutes)
app.post('/send',(req,res)=>{
    const data=req.body
    try{
        if(!data.firstName || !data.lastName){
            throw 'Invalid data'
        }
        res.send(`Hello ${data.firstName} ${data.lastName}`)
    }
    catch(err){
        res.json({message:err})
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
// models/User.js
const mongoose = require('mongoose');
const DOTENV=require('dotenv')
const uri=DOTENV.config().parsed.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS:5000000 });
const editorSchema = new mongoose.Schema({
  emailID: String,
  firstName: String,
  lastName: String
                    });

const userSchema = new mongoose.Schema({

  username: { type: String, required: true },
  channelId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  editors:[editorSchema]

});

const Adminuser = mongoose.model('User', userSchema);

module.exports = Adminuser;

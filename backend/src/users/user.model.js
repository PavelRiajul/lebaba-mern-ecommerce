const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username:{type:String, require:true, unique:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    profileImage: String,
    bio:{type:String, maxLength: 200},
    profession:String,
    role:{type:String, default:'user'},
    createAt:{type:Date, default:Date.now}          // ke kokhon account create korse sei time ta janar jonno

  });
  const User = model('User', userSchema);
  module.exports= User;
const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

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
  //hash password (jate onnon keo password ta bojte na pare)
  userSchema.pre('save',async function(next){
    const user =this;
    if(!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password=hashedPassword;

    next()
  })

  const User = model('User', userSchema);
  module.exports= User;
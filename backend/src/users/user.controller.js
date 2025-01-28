const generateToken = require("../middleware/generateToken");
const User = require("./user.model");

//user registration
const userRegistration = async (req,res)=>{
    try {
        const {username,email ,password}= req.body
        const user = new User({username, email,password})
        await user.save() //kono akta data amara database a save korte ae save() method use korbo
        res.status(200).send({message:"Registration successful"})

    } catch (error) {
        console.log("Error registering a user",error)
        res.status(500).send({message:"Registration failed"})
    }
}

//user login
const userLoggedIn = async(req,res)=>{
    try {

        const {email,password}=req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).send({message:"User not found!"})
        }
        //match password
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).send({message:"Invalid Password!"})
        }
        //token create password verify korar jonno
        const token = await generateToken(user._id)
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"None"
        })
        res.status(200).send({message:"Logged in successful",
            token,
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role,
                profileImage:user.profileImage,
                bio:user.bio,
                profession:user.profession

            }
        })
    } catch (error) {
        console.log('Error Login user',error)
        res.status(500).send({message:"Login failed"})
    } 
}
// user logout
const userLogout = async(req,res)=>{
  try {
     res.clearCookie("token")
     res.status(200).send({message:"Logged out successful"})
  } catch (error) {
    console.error('Error logged out a user',error)
        res.status(500).send({message:"Logged out failed"})
  }
}


module.exports ={
    userRegistration,
    userLoggedIn,
    userLogout
}
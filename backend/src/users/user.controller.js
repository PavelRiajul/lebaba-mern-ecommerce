const generateToken = require("../middleware/generateToken");
const { successResponse, errorResponse } = require("../utils/responseHandler");
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
     successResponse(res,200,"Logged out successfully!")
  } catch (error) {
    errorResponse(res,500,"Logged out failed!",error)
  }
}
//get all users
 const getAllUsers = async(req,res)=>{
  try {
    const users = await User.find({},'email role').sort({createAt: -1});
    successResponse(res,200,"All users fetched successfully!",data=users)
  } catch (error) {
    errorResponse(res,500,"Failed to fetch all users!",error)
  }
 }

 //delete user
 const deleteUser =async(req,res)=>{
    const {id} = req.params
   try {
    const user = await User.findByIdAndDelete(id)
    if(!user){
       return  errorResponse(res,404,"User not found!")
    }
    return successResponse(res,200,"Users deleted successfully!")
   } catch (error) {
    errorResponse(res,500,"Failed to delete users!",error)
   }
 }
 //update user role
 const updateUserRole=async(req,res)=>{
    const {id} = req.params
    const {role}=req.body
   try {
    const updateUser= await User.findByIdAndUpdate(id,{role},{new:true})
    if(!updateUser){
        return  errorResponse(res,404,"User not found!")
     }
     return successResponse(res,200,"User role update successfully!", data=updateUser)
   } catch (error) {
    errorResponse(res,500,"Failed to update user role!",error)

   }
 }

 //edit user profile
 const editUserProfile=async(req,res)=>{
   const {id}=req.params;
   const {username,profileImage,bio,profession} = req.body
   try {
    const updateFields={
        username,
        profileImage,
        bio,
        profession
    }
    const updateUser = await User.findByIdAndUpdate(id,updateFields,{new:true})
    if(!updateUser){
        return errorResponse(res,404,"User not found!",error)
    }
    return  successResponse(res,200,"User profile update successfully!", updateUser)
   } catch (error) {
        errorResponse(res,500,"Failed to update user profile!",error)

   }
 }

module.exports ={
    userRegistration,
    userLoggedIn,
    userLogout,
    getAllUsers,
    deleteUser,
    updateUserRole,
    editUserProfile
}
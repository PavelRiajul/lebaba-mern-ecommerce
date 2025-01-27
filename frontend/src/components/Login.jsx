import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useLoginUserMutation } from "../redux/features/auth/authApi"

const Login = () => {
  const [message ,setMessage]=useState('')
  const {register,handleSubmit,formState: { errors },} = useForm()


  //******************* login frontend
//jokhon query releted kaj korbo tokhon {} use korbo
//jokhon mutation releted kaj korbo tokhon [] use korbo
  const [loginUser,{isLoading,error}] = useLoginUserMutation()
  const navigate = useNavigate()

  const onSubmit =  async (data) => {
    //console.log(data)
    try {
      const response = await loginUser(data).unwrap();
      console.log(response)
      alert("Login successful!")
      navigate('/')
    } catch (error) {
      setMessage("Please Provide a valid email and password!")
      
    }
  }
  return (
    <section className="h-screen flex items-center justify-center p-2">
      <div className="bg-white shadow p-8 max-w-sm">
        <h2 className="text-2xl font-semibold pt-5">Please Login!</h2>
        <form  onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-3 mx-auto pt-6">
          <input
          {...register("email", { required: true })} 
           type="email" placeholder="Email" required className="w-full bg-gray-100 focus:outline-none px-5  py-3"/>
           {errors.email && <p className="text-red-500">Email  is required</p>}
          <input
          {...register("password", { required: true })} 
           type="password" placeholder="Password" required className="w-full bg-gray-100 focus:outline-none px-5  py-3"/>
           {errors.password && <p className="text-red-500">Password is required</p>}
          
          {
            message && <p className="text-red-500">{message}</p>
          }
          <button className="w-full mt-2 text-white bg-[#ed3849] hover:bg-[#ed3849]/90 font-medium py-3 rounded-md ">Login</button>
        </form>
        <div className="my-5 text-center italic text-sm">Don't have an account? <Link to={'/register'} className="text-red-700 px-1 cursor-pointer underline">Register</Link>here.</div>
      </div>
    </section>
  )
}
export default Login
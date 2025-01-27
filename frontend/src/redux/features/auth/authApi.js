import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/getBaseUrl';


//query: get methods
//mutation: put, patch, delete
const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/auth`,
        credentials:'include'
    }),
    //end points
    endpoints: (builder) =>({
        registerUser:builder.mutation({
            query:(newUser)=>({
                url:"/register",
                method:"POST",
                body:newUser
            })
        }),
        loginUser:builder.mutation({
            query:(credentials)=>({
                url:"/login",
                method:"POST",
                body:credentials
            })
        })
    })
})
export const {useLoginUserMutation,useRegisterUserMutation} = authApi
export default authApi;
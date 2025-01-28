import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/getBaseUrl';
import { logout } from './authSlice';


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
        }),
        logoutUser: builder.mutation({
            query:()=>({
                url:"/logout",
                method:"POST"
            })
        })

    })
})
export const {useLoginUserMutation,useRegisterUserMutation,useLogoutUserMutation} = authApi
export default authApi;
import { shopSlice } from './shopSlice'

export const usershopSlice = shopSlice.injectEndpoints({
    endpoints: (builder) => (
        {
            logIn: builder.mutation({
                query: (data) => ({
                    url: '/shop/user/login',
                    method: 'POST',
                    body: data,

                })
            }),
            logout:builder.mutation({
                query:()=>({
                    url:'/shop/user/logout',
                    method:'POST'
                })
            }),
            signUp:builder.mutation({
                query:(data)=>({
                    url:`/shop/user/signup`,
                    method:'POST',
                    body:data
                })
            })
        })
})

export const { useLogInMutation,useSignUpMutation,useLogoutMutation} = usershopSlice


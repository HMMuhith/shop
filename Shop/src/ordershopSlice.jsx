import { shopSlice } from "./shopSlice";

export const ordershopSlice = shopSlice.injectEndpoints({


    endpoints: (builder) => ({

        createOrder: builder.mutation({
            query: ({order,token}) => ({
                url: '/shop/order',
                method: 'POST',
                body: order,
                headers:{
                    authorization:token
                }
            }),

        }),
        getOrderDetails: builder.query({
            query: (orderID) => ({
                url: `/shop/order/${orderID}`,

            })
        }),
        payOrder:builder.mutation({
            query:(orderID,details)=>({
                url:`/shop/order/${orderID}/deliver`,
                method:'PUT',
                body:{...details}
            })
        }),
        getPaypalClientID:builder.query({
            query:()=>({
                url:`/shop/payment/paypal`,

            })
        }),
        getAdminOrders:builder.query({
            query:()=>({
                url:`/shop/order/`,

            })
        }),
        deliverOrder:builder.mutation({
            query:(orderID)=>({
                url:`/shop/order/${orderID}/deliver`,
                method:'PUT'
            })
        })
    })
})

export const { useCreateOrderMutation,useGetOrderDetailsQuery,usePayOrderMutation ,useGetPaypalClientIDQuery, useDeliverOrderMutation} = ordershopSlice
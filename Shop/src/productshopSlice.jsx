import {shopSlice} from './shopSlice'


 export const productshopSlice=shopSlice.injectEndpoints({

    endpoints:(builder)=>(
        {
        getProducts:builder.query({
            query:({keyword,pagenumber})=>({
                url:'/shop/product',
                params:{
                    keyword,
                    pagenumber
                }
            }),
            keepUnusedDataFor:5,
            
        }),
        getTopProducts:builder.query({
            query:()=>({
                url:`/shop/product/top`
            }),
            keepUnusedDataFor:5
        }),
        getProductsDetails:builder.query({
            query:(productID)=>({
                url:`/shop/product/${productID}`,
            }),
            
        }),
        productDetails:builder.mutation({
            query:(data)=>({
                url:'/shop/product',
                method:'POST',
                body:data, 
            })
        }),
        updateProduct:builder.mutation({
            query:(data,productID)=>({
                url:`/shop/product/${productID}`,
                method:'PUT',
                body:data
            })
        }),
        deleteProduct:builder.mutation({
            query:(productID)=>({
                url:`/shop/product/${productID}`,
                method:'DELETE'
            })
        }),
        deleteProducts:builder.mutation({
            query:()=>({
                url:'/shop/product/delete',
                method:'DELETE'
            })
        }),
        createReview:builder.mutation({
            query:(data)=>({
                url:`/shop/product/${data.productID}/reviews`,
                method:'POST',
                body:data
            })
    }),
    
})
 })

export const {useGetProductsQuery,useGetTopProductsQuery,useGetProductsDetailsQuery,useProductDetailsMutation,useUpdateProductMutation,useDeleteProductMutation,useCreateReviewMutation,useDeleteProductsMutation}=productshopSlice

 
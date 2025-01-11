import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./signup";
import LogIn from "./LogIn";
import About from "./about";
import Error from "./error";
import ProductParams from "./product_params";
import Cart from "./cart";
import Shipping from "./shipping";
import Payment from "./payment";
import OrderItems from "./Orderitem";
import Orderdetails from "./orderdetails";
import Seller from "./seller";
import RootLayOut from "./rootlayout";
import Header from "./Header";
import EditProduct from "./editproduct";
import Main from "./Mainpart";
import Footer from "./Footer";
import PrivateRoute from "./privateroute";
import UpdateProfile from "./updateprofile";
import Orders from "./orders";
import AdminRoute from "./Adminroute";
import MyOrders from "./Myorder";
import ProductApproval from "./productapproval";
import User from "./user";
import UpdateUser from "./updateuser";

const Route = () => {

    const Router = createBrowserRouter([
        {
            path: '/',
            element:<RootLayOut />,
            errorElement: <Error />,
        },
        {
            path:'/search/keyword/page/:pagenumber',
            element:<><Header/><Main/><Footer/></>
        },
        {
            path:'/page/:pagenumber',
            element:<><Header/><Main/><Footer/></>
        },
        {
            path:'/search/:keyword',
            element:<><Header/><Main/><Footer/></>
        },
        { 
            path: '/signup',
            element:<><Header/><SignUp /><Footer/></> 
        },
        {
            path: '/login',
            element: <><Header/><LogIn /><Footer/></>
        },
        {
            path: '/about',
            element:<><Header/><About /><Footer/></>
        },

        {
            path: '/product/:productID',
            element: <><Header /><ProductParams /><Footer/></>
        },
        {
            path:'',
            element:<PrivateRoute/>,
            children:[
                {
                    path: '/shipping',
                    element:<><Header/><Shipping /><Footer/></>
                },
                {
                    path: '/payment',
                    element:<><Header/><Payment /><Footer/></>
                },
                {
                    path: '/order',
                    element:<><Header/><OrderItems /><Footer/></>
                },
                {
                    path: '/order/:orderID',
                    element: <><Header/><Orderdetails /><Footer/></>
                },
                {
                    path:'/updateprofile',
                    element:<><Header/><UpdateProfile/><Footer/></>
                },
                {
                    path:'/myorders',
                    element:<><Header/><MyOrders/><Footer/></>
                },
            ]
        },
        {
            path: '/cart',
            element:<><Header/><Cart /><Footer/></>
        },
        {
            path:'',
            element:<AdminRoute/>,
            children:
            [
            {
                path:'/admin/orders',
                element:<><Header/><Orders/><Footer/></>
            },
            {
                path:'/admin/products',
                element:<><Header/><ProductApproval/><Footer/></>
            },
            {
                path:'/admin/users',
                element:<><Header/><User/><Footer/></>
            },
            {
                path:'/admin/updateuser/:id',
                element:<><Header/><UpdateUser/><Footer/></>
            }
            ]
        },
        {
            path: '/seller',
            element: <><Header/><Seller /><Footer/></>
        },
        {
            path:'/product/:productID/edit',
            element:<><Header/><EditProduct/><Footer/></>
        }
    ])
    return (
        <>
            <RouterProvider router={Router} />

        </>
    )
}
export default Route 
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'


const MyOrders = () => {
  const { userinfo } = useSelector(state => state.auth)
  const [Data, setData] = useState()
  useEffect(() => {
    const request = async () => {
      const orders = await axios({
        url: `${VITE_BACKEND_URL}/shop/order/myorders`,
        method: 'GET',
        headers: {
          Authorization: userinfo.token
        }
      })

      const data = await orders.data

      setData(data)

    }
    request()
  }, [axios])
  console.log(Data)
  return (
    <>
      orders

      <div className='flex items-center justify-center'>
      {
        Data?.map(data => {


          return (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Total Price</th>
                    <th>Payment Status</th>
                    <th>Date</th>
                    <th>Delivery Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td><Link to={`/order/${data._id}`}>{data?._id}</Link></td>
                    {data?.orderItems?.map(order => 
                    {
                      return (
                      <> 
                      
                      <td>{order.product_name}</td>
                      <td>{order.description}</td>
                      </>)
                    }
                    )
                    }
                    <td>{data?.total_price}</td>
                    <td>{data?.isPaid===false?<p>Not Paid</p>:<p>Paid</p>}</td>
                    <td>{data?.date.substring(0,10)}</td>
                    <td>{data?.isDelivered===false?<p>Not delivered</p>:<p>Delivered</p>}</td>
                    
              </tr>
                </tbody>
              </table>
            </>
          )

        }
        )}
</div>
    </>
  )
}

export default MyOrders  
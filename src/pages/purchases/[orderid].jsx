import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import axios from 'axios'
import { useRouter } from 'next/router'

function OrderId() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  const [order, setOrder] = useState({})
  useEffect(() => {
    if (router.isReady) {
      getPurchaseById(router.query.orderid)
    }
  }, [])

  const getPurchaseById = async (id) => {
    let request = await axios(`/api/purchase/${id}`)
    if (request.data.status === 'success') {
      setOrder(request.data)
    }
  }

  return (
    <div className='container__purchase'>
      <div className='purchase-header'>
        <p>Order Number</p>
        {/* <span className='order-id'>#{order.purchase.order_id}</span> */}
      </div>
    </div>
  )
}

export default OrderId
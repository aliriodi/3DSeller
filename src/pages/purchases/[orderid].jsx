import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { BsCheckCircle } from 'react-icons/bs'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

function OrderId() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  const [order, setOrder] = useState({})

  useEffect(() => {
    if (router.isReady && router.query) {
      getPurchaseById(router.query.orderid)
    }
  }, [router.isReady, router.query.orderid])

  const getPurchaseById = async (id) => {
    let request = await axios(`/api/purchase/${id}`)
    if (request.data.status === 'success') {
      setOrder(request.data)
    }
  }

  if (!order.purchase) {
    return (
      <div className='orderPage__container-purchase'>
        <h1>Loading...</h1>
      </div>
    )
  }
  if(user && order.purchase) return (
    <div className='orderPage__container-purchase'>
      <h1>Invoice</h1>
      <div className='orderPage__purchase-header'>
        <p>Order Number</p>
        <span># {order.purchase.order_id}</span>
      </div>
      <div className='orderPage__purchase-header'>
        <p>Issue Date</p>
        <span>{order.purchase.created_at.split("T")[0]}</span>
      </div>
      {/* BILLED TO */}
      <div className='orderPage__billedTo-container'>
        <h2 className='orderPage__header-title'>billed to</h2>
        <p style={{ fontWeight: "700" }}>{order.purchase.purchase.shipping.full_name}</p>
        <p>{order.purchase.purchase.shipping.address_line_1}</p>
        <p>{order.purchase.purchase.shipping.admin_area_1}</p>
        <p>{order.purchase.purchase.shipping.postal_code}</p>
        <p>{order.purchase.purchase.shipping.country_code}</p>
      </div>
      {/* DETAIL */}
      <div className='orderPage__detail-container'>
        <h2 className='orderPage__header-title'>Detail</h2>
        <div className='orderPage__detail-product'>
          <p>{order.purchase.product.name}</p>
          <p className='right'>
            <span className='money'>$ {order.purchase.product.price}</span>
            <span className='currency'>AR</span>
          </p>

        </div>
        <div className='orderPage__detail-product'>
          <p>Cantidad</p>
          <span>1</span>
        </div>
        {/* TOTAL */}
        <div className='orderPage__detail-product_total_left'>
          <p style={{ fontWeight: "700", alignSelf: "center" }}>Total</p>
          <div className='orderPage__detail-product_total_right'>
            <p>
              <span className='money'>$ {order.purchase.purchase.amount.value}</span>

              <span className='currency'>{order.purchase.purchase.amount.currency}</span>
            </p>
            <p>
              <span className='exchange'>
                (with an exchange rate of 300)
              </span>
              <span className='money'>$ {order.purchase.product.price}</span>

              <span className='currency'>AR</span>
            </p>
          </div>
        </div>
        {/* TOTAL ^^^ */}
      </div>
      {/* STATUS */}
      <div className='orderPage__status-container'>
        <h2 className='orderPage__header-title'>STATUS</h2>
        <p className='text'>
          <BsCheckCircle className='icon' />
          <span>
            Amount fully paid using bank card (Paypal)
          </span></p>
      </div>
    </div>
  )
}

export default withPageAuthRequired(OrderId)
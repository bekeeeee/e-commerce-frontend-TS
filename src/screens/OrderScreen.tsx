import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useSelector } from "../hooks/useTypedSelector";
import { Link, RouteComponentProps } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useActions } from "../hooks/useActions";
// import {
//   ORDER_DELIVER_RESET,
//   ORDER_PAY_RESET,
// } from '../constants/orderConstants';

export default function OrderScreen(
  props: RouteComponentProps<{ id: string }>
) {
  const orderId = props.match.params.id;
  const { detailsOrder, payOrder } = useActions();
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.order);
  const { data: order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userInfo?.data);
  const role = userSignin?.role;

  const currentCart = useSelector((state) => state.cart);
  const orderPay = useSelector((state) => state.orderPay);

  const { loading: loadingPay, error: errorPay, data: successPay } = orderPay;
  useEffect(() => {
    const getOrder = async () => {
      await detailsOrder(orderId);
    };

    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order?._id) {
      getOrder();
    } else {
      if (!order?.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }

    // console.log("order details", order);
  });
  //   const orderDeliver = useSelector((state) => state.orderDeliver);
  //   const {
  //     loading: loadingDeliver,
  //     error: errorDeliver,
  //     success: successDeliver,
  //   } = orderDeliver;
  //   useEffect(() => {
  //     const addPayPalScript = async () => {
  //       const { data } = await Axios.get('/api/config/paypal');
  //       const script = document.createElement('script');
  //       script.type = 'text/javascript';
  //       script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //       script.async = true;
  //       script.onload = () => {
  //         setSdkReady(true);
  //       };
  //       document.body.appendChild(script);
  //     };
  //     if (
  //       !order ||
  //       successPay ||
  //       successDeliver ||
  //       (order && order?._id !== orderId)
  //     ) {
  //       dispatch({ type: ORDER_PAY_RESET });
  //       dispatch({ type: ORDER_DELIVER_RESET });
  //       dispatch(detailsOrder(orderId));
  //     } else {
  //       if (!order?.isPaid) {
  //         if (!window.paypal) {
  //           addPayPalScript();
  //         } else {
  //           setSdkReady(true);
  //         }
  //       }
  //     }
  //   }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult: any) => {
    payOrder(order?._id!, paymentResult);
  };
  //   const deliverHandler = () => {
  //     dispatch(deliverOrder(order?._id));
  //   };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order?._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>{" "}
                  {order?.cart?.shippingAddress?.fullname} <br />
                  <strong>Address: </strong>{" "}
                  {order?.cart?.shippingAddress?.address},
                  {order?.cart?.shippingAddress?.city},{" "}
                  {order?.cart?.shippingAddress?.postalCode},
                  {order?.cart?.shippingAddress?.country}
                </p>
                {order?.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order?.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order?.cart?.paymentMethod}
                </p>
                {order?.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order?.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order?.cart?.orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order?.cart?.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order?.cart?.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order?.cart?.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order?.cart?.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order?.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order?.cart?.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {/* {userInfo.isAdmin && order?.isPaid && !order?.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li>
              )} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";

import { Link, RouteComponentProps } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useTypedSelector";

const CartScreen = (props: RouteComponentProps<{ id: string }>) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const { addToCart, deleteItemFromCart } = useActions();
  
  const cartItems = useSelector((state) => state.cart.orderItems);
  const removeFromCartHandler = (productId: string) => {
    deleteItemFromCart(productId);
  };
  const checkoutHandler = () => {
    props.history.push("/shipping");
  };

  useEffect(() => {
    if (productId) {
      addToCart(productId, qty);
    }
  }, [productId, qty]);

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) => addToCart(item._id, +e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}
                items): ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;

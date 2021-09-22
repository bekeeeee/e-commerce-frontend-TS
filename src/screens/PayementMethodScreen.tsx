import { useState } from "react";
import { RouteComponentProps } from "react-router";

import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "../hooks/useTypedSelector";

import { useActions } from "../hooks/useActions";
import { PaymentMethods } from "../state/state-types/paymentMethods";

export default function PaymentMethodScreen(props: RouteComponentProps) {
  const { savePaymentMethod } = useActions();

  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  if (!shippingAddress?.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.PayPal
  );
  const submitHandler = (e: any) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) =>
                setPaymentMethod(e.target.value as PaymentMethods)
              }
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) =>
                setPaymentMethod(e.target.value as PaymentMethods)
              }
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

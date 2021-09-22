import { cartItem } from "./cartItem";
import { ShippingAddress } from "./ShippingAddress";
import { PaymentMethods } from "./paymentMethods";

// import { State, initialState } from "../stateType";
export interface CartState {
  _id: string;
  orderItems: cartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethods | null;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

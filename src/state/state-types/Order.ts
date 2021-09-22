// import { cartItem } from "./cartItem";
import { CartState } from "./CartState";

interface UserOrder {
  _id: string;
  email: string;
  username: string;
}
export interface Order {
  _id?: string;
  cart: CartState;
  user?: UserOrder;
  seller?: UserOrder;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;

  status?: string;
  update_time?: string;
  email_address?: string;
}

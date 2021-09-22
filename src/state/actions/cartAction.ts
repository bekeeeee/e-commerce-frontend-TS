import { ActionTypeCart } from "../action-types/cartTypes";
import { cartItem } from "../state-types/cartItem";
import { PaymentMethods } from "../state-types/paymentMethods";
import { ShippingAddress } from "../state-types/ShippingAddress";

interface CartAddItemAction {
  type: ActionTypeCart.CART_ADD_ITEM;
  payload: cartItem;
}

interface CartRemoveItemAction {
  type: ActionTypeCart.CART_REMOVE_ITEM;
  payload: string;
}

interface CartSaveShippingAddress {
  type: ActionTypeCart.CART_SAVE_SHIPPING_ADDRESS;
  payload: ShippingAddress;
}

interface CartSavePayementMethod {
  type: ActionTypeCart.CART_SAVE_PAYEMENT_METHOD;
  payload: PaymentMethods;
}

interface CartAddCartId {
  type: ActionTypeCart.CART_ADD_CARTID;
  payload: string;
}

interface CartEmpty {
  type: ActionTypeCart.CART_EMPTY;
}
export type CartAction =
  | CartAddItemAction
  | CartRemoveItemAction
  | CartSaveShippingAddress
  | CartSavePayementMethod
  | CartEmpty
  | CartAddCartId;
//   | CartAddSuccessAction
//   | CartAddFailAction;

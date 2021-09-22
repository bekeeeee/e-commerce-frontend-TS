import { CartAction } from "../actions/cartAction";
import { ActionTypeCart } from "../action-types/cartTypes";
import { CartState } from "../state-types/CartState";
const initialState: CartState = {
  orderItems: localStorage.getItem("orderItems")
    ? JSON.parse(localStorage.getItem("orderItems") as string)
    : [],

  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress") as string)
    : {},
  paymentMethod: null,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  _id: localStorage.getItem("cartId")
    ? JSON.parse(localStorage.getItem("cartId") as string)
    : "",
};

console.log("initialState", initialState);

const reducer = (
  state: CartState = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case ActionTypeCart.CART_ADD_ITEM:
      const item = action.payload;
      console.log("item reducer", item);
      const existItem = state.orderItems?.find((x) => x._id === item._id);

      if (existItem && state.orderItems) {
        return {
          ...state,
          orderItems: state.orderItems.map((x) =>
            x._id === existItem._id ? item : x
          ),

          // orderItems: state.orderItems.ma
        };
      } else {
        return { ...state, orderItems: [...state.orderItems, item] };
      }
    case ActionTypeCart.CART_REMOVE_ITEM:
      return {
        ...state,
        orderItems: state.orderItems.filter((x) => x._id !== action.payload),
      };

    case ActionTypeCart.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case ActionTypeCart.CART_SAVE_PAYEMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case ActionTypeCart.CART_ADD_CARTID:
      return {
        ...state,
        _id: action.payload,
      };
    case ActionTypeCart.CART_EMPTY:
      return {
        ...state,
        orderItems: [],
      };
    default:
      return state;
  }
};

export default reducer;

/*
// import { cartItem } from "./state-types/cartItem";
// import { product } from "./state-types/product";
// interface ProductListState {
//   loading: boolean;
//   error: string | null;
//   data: product[];
// }

// interface ProductDetailsState {
//   loading: boolean;
//   error: string | null;
//   data: product | null;
// }
// interface CartState {
//   orderItems: cartItem[];

// }
// const initialStateProduct: ProductListState = {
//   loading: false,
//   error: null,
//   data: [],
// };

// const initialStateProductDetails: ProductDetailsState = {
//   loading: false,
//   error: null,
//   data: null,
// };

// const initialStateCart: CartState = {
//   data: [],
// };

// export interface State {
//   productList: ProductListState;
//   productDetails: ProductDetailsState;
//   orderItems: CartState;
// }

// export const initialState: State = {
//   productList: initialStateProduct,
//   productDetails: initialStateProductDetails,
//   orderItems: initialStateCart,
// };

*/

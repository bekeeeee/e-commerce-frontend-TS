import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productDetailsReducer from "./productDetailsReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import orderDetailsReducer from "./orderDetailsReducer";
import orderPayReducer from "./orderPayReducer";
const reducers = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userInfo: userReducer,
  
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

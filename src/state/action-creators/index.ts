import { Dispatch } from "redux";
import { ActionTypeRepositories } from "../action-types/repositoriesActionTypes";
import { RepositoriesAction } from "../actions/repositoriesAction";
import { ActionTypeProducts } from "../action-types/productsActioTypes";
import { ProductsAction } from "../actions/productsAction";
import axios from "axios";

import { ActionTypeProductDetails } from "../action-types/productDetailsTypes";
import { ProductDetailsAction } from "../actions/productDetailsAction";

import { ActionTypeCart } from "../action-types/cartTypes";
import { CartAction } from "../actions/cartAction";

import { ActionTypeUser } from "../action-types/userTypes";
import { UserAction } from "../actions/userAction";
import { ShippingAddress } from "../state-types/ShippingAddress";
import { PaymentMethods } from "../state-types/paymentMethods";
import { Order } from "../state-types/Order";
import { ActionTypeOrder } from "../action-types/orderActionTypes";
import { OrderAction } from "../actions/orderAction";
import { RootState } from "..";

export const searchRepositories = (term: string) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<RepositoriesAction>) => {
    dispatch({
      type: ActionTypeRepositories.SEARCH_REPOSITORIES,
    });

    try {
      const { data } = await instance.get(
        "https://registry.npmjs.org/-/v1/search",
        {
          params: {
            text: term,
          },
        }
      );
      const names = data.objects.map((result: any) => {
        return result.package.name;
      });

      dispatch({
        type: ActionTypeRepositories.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypeRepositories.SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};

export const listProducts = () => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({
      type: ActionTypeProducts.PRODUCT_LIST_REQUEST,
    });

    try {
      const { data } = await instance.get("/api/v1/product");
      // console.log("data", data);
      dispatch({
        type: ActionTypeProducts.PRODUCT_LIST_SUCCESS,
        payload: data.products,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypeProducts.PRODUCT_LIST_FAIL,
        payload: err.message,
      });
    }
  };
};

export const productDetails = (productId: string) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<ProductDetailsAction>) => {
    dispatch({
      type: ActionTypeProductDetails.PRODUCT_DETAILS_REQUEST,
    });

    try {
      const { data } = await instance.get(`/api/v1/product/${productId}`);
      // console.log("data", data);

      dispatch({
        type: ActionTypeProductDetails.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
      // console.log("product details");
    } catch (err: any) {
      console.log("err", err);
      dispatch({
        type: ActionTypeProductDetails.PRODUCT_DETAILS_FAIL,
        payload: err.message,
      });
    }
  };
};

export const addToCart = (productId: string, qty: number) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
    try {
      let cart;
      const { data: orderItem } = await instance.get(
        `/api/v1/product/${productId}`
      );
      // console.log("userInfo", getState().userInfo.data);
      if (getState().userInfo.data) {
        console.log("there is a user");
        const { data } = await instance.post("/api/v1/cart/addToCart", {
          itemId: productId,
          qty,
        });
        cart = data.cart;
        console.log("cart index", { ...data });

        // console.log("cart index", cart);
        dispatch({
          type: ActionTypeCart.CART_ADD_CARTID,
          payload: cart._id,
        });

        localStorage.setItem("cartId", JSON.stringify(getState().cart._id));
      }
      dispatch({
        type: ActionTypeCart.CART_ADD_ITEM,
        payload: {
          ...orderItem,
          qty,
        },
      });
      // console.log("getState", getState());
      localStorage.setItem(
        "orderItems",
        JSON.stringify(getState().cart.orderItems)
      );
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const deleteItemFromCart = (productId: string) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
    try {
      const { data } = await instance.get(`/api/v1/product/${productId}`);
      if (getState().userInfo.data) {
        await instance.post(`/api/v1/cart/deleteItemFromCart`, {
          itemId: data._id,
        });
      }
      // console.log("data", data);

      dispatch({
        type: ActionTypeCart.CART_REMOVE_ITEM,
        payload: data._id,
      });
      // console.log("getState", getState());
      localStorage.setItem(
        "orderItems",
        JSON.stringify(getState().cart.orderItems)
      );
    } catch (err) {
      console.log("err", err);
    }
  };
};
export const saveShippingAddress = (data: ShippingAddress) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionTypeCart.CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
      });
      localStorage.setItem("shippingAddress", JSON.stringify(data));
      if (getState().userInfo.data) {
        await instance.post("/api/v1/cart/saveShippingAddress", {
          ...data,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const savePaymentMethod = (data: PaymentMethods) => {
  console.log("PaymentMethods", data);
  const instance = axios.create({
    withCredentials: true,
  });
  console.log("data", data);
  return async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
    try {
      if (getState().userInfo.data) {
        await instance.post("/api/v1/cart/updatePaymentMethod", {
          paymentMethod: data,
        });
      }
      dispatch({
        type: ActionTypeCart.CART_SAVE_PAYEMENT_METHOD,
        payload: data,
      });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const sigin = (email: string, password: string) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
    dispatch({
      type: ActionTypeUser.USER_SIGNIN_REQUEST,
      payload: { email, password },
    });
    try {
      const { data } = await instance.post("/api/v1/user/signin", {
        email,
        password,
      });
      // console.log("data", data);

      dispatch({
        type: ActionTypeUser.USER_SIGNIN_SUCCESS,
        payload: data,
      });
      // console.log("getState", getState());
    } catch (err: any) {
      console.log("err signin", err.response);
      dispatch({
        type: ActionTypeUser.USER_SIGNIN_FAIL,
        payload: err.response.data.errors,
      });
    }
  };
};

export const currentUser = () => {
  const instance = axios.create({
    withCredentials: true,
  });

  return async (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
    try {
      const { data } = await instance.get("/api/v1/user/currentUser", {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      // console.log("data", data);

      dispatch({
        type: ActionTypeUser.CURRENT_USER,
        payload: data,
      });
      // console.log("getState", getState());
    } catch (err: any) {
      console.log("err", err);
      dispatch({ type: ActionTypeUser.USER_SIGNIN_FAIL, payload: err.message });
    }
  };
};

export const register = (username: string, email: string, password: string) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
    dispatch({
      type: ActionTypeUser.USER_SIGNUP_REQUEST,
      payload: { email, username, password },
    });
    try {
      const { data } = await instance.post("/api/v1/user/signup", {
        email,
        username,
        password,
      });
      // console.log("data", data);

      dispatch({
        type: ActionTypeUser.USER_SIGNUP_SUCCESS,
        payload: data,
      });
      // console.log("getState", getState());
    } catch (err: any) {
      console.log("err signUp", err.response);
      dispatch({
        type: ActionTypeUser.USER_SIGNUP_FAIL,
        payload: err.response.data.errors,
      });
    }
  };
};

export const signout = () => {
  const instance = axios.create({
    withCredentials: true,
  });

  return async (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
    try {
      await instance.get("/api/v1/user/signout", {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      console.log("getState", getState());

      // dispatch({
      //   type: ActionTypeUser.USER_SIGNOUT,
      // });

      // console.log("getState", getState());
    } catch (err: any) {
      console.log("err", err);
      dispatch({ type: ActionTypeUser.USER_SIGNIN_FAIL, payload: err.message });
    }
  };
};

export const createOrder = (cartId: string) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<OrderAction | CartAction>) => {
    dispatch({
      type: ActionTypeOrder.ORDER_CREATE_REQUEST,
    });
    try {
      const { data } = await instance.post(`/api/v1/order`, {
        cartId,
      });

      dispatch({
        type: ActionTypeOrder.ORDER_CREATE_SUCCESS,
        payload: data.order,
      });
      // console.log("getState", getState());
      dispatch({
        type: ActionTypeCart.CART_EMPTY,
      });
      localStorage.removeItem("orderItems");
    } catch (err: any) {
      console.log("err", err);
      dispatch({
        type: ActionTypeOrder.ORDER_CREATE_FAIL,
        payload: err.message,
      });
    }
  };
};

export const detailsOrder = (orderId: string) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<OrderAction | CartAction>) => {
    dispatch({
      type: ActionTypeOrder.ORDER_DETAILS_REQUEST,
    });
    try {
      const { data } = await instance.get(`/api/v1/order/${orderId}`);

      dispatch({
        type: ActionTypeOrder.ORDER_DETAILS_SUCCESS,
        payload: data.order,
      });
    } catch (err: any) {
      console.log("err", err);
      dispatch({
        type: ActionTypeOrder.ORDER_DETAILS_FAIL,
        payload: err.message,
      });
    }
  };
};

export const payOrder = (orderId: string, paymentResult: any) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<OrderAction | CartAction>) => {
    dispatch({
      type: ActionTypeOrder.ORDER_PAY_REQUEST,
    });
    try {
      const { data } = await instance.put(
        `/api/v1/order/${orderId}/pay`,
        paymentResult
      );

      dispatch({
        type: ActionTypeOrder.ORDER_PAY_SUCCESS,
        payload: data.order,
      });
    } catch (err: any) {
      console.log("err", err);
      dispatch({
        type: ActionTypeOrder.ORDER_PAY_FAIL,
        payload: err.message,
      });
    }
  };
};

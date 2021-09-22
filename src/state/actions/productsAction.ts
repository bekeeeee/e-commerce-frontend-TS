import { ActionTypeProducts } from "../action-types/productsActioTypes";
import { Product } from "../state-types/product";

interface ProductListRequestAction {
  type: ActionTypeProducts.PRODUCT_LIST_REQUEST;
}
interface ProductListSuccessAction {
  type: ActionTypeProducts.PRODUCT_LIST_SUCCESS;
  payload: Product[];
}
interface ProductListFailAction {
  type: ActionTypeProducts.PRODUCT_LIST_FAIL;
  payload: string;
}

export type ProductsAction =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailAction;

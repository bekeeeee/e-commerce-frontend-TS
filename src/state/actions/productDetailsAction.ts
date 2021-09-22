import { ActionTypeProductDetails } from "../action-types/productDetailsTypes";
import { Product } from "../state-types/product";

interface ProductDetailsRequestAction {
  type: ActionTypeProductDetails.PRODUCT_DETAILS_REQUEST;
}
interface ProductDetailsSuccessAction {
  type: ActionTypeProductDetails.PRODUCT_DETAILS_SUCCESS;
  payload: Product;
}
interface ProductDetailsFailAction {
  type: ActionTypeProductDetails.PRODUCT_DETAILS_FAIL;
  payload: string;
}

export type ProductDetailsAction =
  | ProductDetailsRequestAction
  | ProductDetailsSuccessAction
  | ProductDetailsFailAction;

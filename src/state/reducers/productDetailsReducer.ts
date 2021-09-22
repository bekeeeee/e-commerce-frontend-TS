import { ProductDetailsAction } from "../actions/productDetailsAction";
import { ActionTypeProductDetails } from "../action-types/productDetailsTypes";
import { Product } from "../state-types/product";
// import { State, initialState } from "../stateType";
interface ProductState {
  loading: boolean;
  error: string | null;
  data: Product | null;
}
const initialState = {
  loading: false,
  error: null,
  data: null,
};

const reducer = (
  state: ProductState = initialState,
  action: ProductDetailsAction
): ProductState => {
  switch (action.type) {
    case ActionTypeProductDetails.PRODUCT_DETAILS_REQUEST:
      return { loading: true, error: null, data: null };
    case ActionTypeProductDetails.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case ActionTypeProductDetails.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload, data: null };

    default:
      return state;
  }
};

export default reducer;

import { ProductsAction } from "../actions/productsAction";
import { ActionTypeProducts } from "../action-types/productsActioTypes";
import { Product } from "../state-types/product";
// import { State, defaultState } from "../stateType";
interface ProductState {
  loading: boolean;
  error: string | null;
  data: Product[];
}
const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: ProductState = initialState,
  action: ProductsAction
): ProductState => {
  switch (action.type) {
    case ActionTypeProducts.PRODUCT_LIST_REQUEST:
      return { loading: true, error: null, data: [] };
    case ActionTypeProducts.PRODUCT_LIST_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case ActionTypeProducts.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload, data: [] };

    default:
      return state;
  }
};

export default reducer;

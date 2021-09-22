import { OrderAction } from "../actions/orderAction";
import { ActionTypeOrder } from "../action-types/orderActionTypes";
import { Order } from "../state-types/Order";
// import { State, defaultState } from "../stateType";
interface OrderState {
  loading: boolean;
  error: string | null;
  data: Order | null;
}
const initialState = {
  loading: false,
  error: null,
  data: null,
};

const reducer = (
  state: OrderState = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case ActionTypeOrder.ORDER_CREATE_REQUEST:
      return { loading: true, error: null, data: null };

    case ActionTypeOrder.ORDER_CREATE_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case ActionTypeOrder.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload, data: null };

    
    default:
      return state;
  }
};

export default reducer;

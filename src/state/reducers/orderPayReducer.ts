import { OrderAction } from "../actions/orderAction";
import { ActionTypeOrder } from "../action-types/orderActionTypes";
import { OrderState } from "../state-types/OrderState";
import { initialState } from "../state-types/initialState";
const reducer = (
  state: OrderState = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
      case ActionTypeOrder.ORDER_PAY_REQUEST:
      return { loading: true, error: null, data: null };

    case ActionTypeOrder.ORDER_PAY_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case ActionTypeOrder.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

export default reducer;

import { ActionTypeOrder } from "../action-types/orderActionTypes";
import { Order } from "../state-types/Order";
import { PaymentResult } from "../state-types/PaymentResult";

interface OrderRequestAction {
  type: ActionTypeOrder.ORDER_CREATE_REQUEST;
}
interface OrderSuccessAction {
  type: ActionTypeOrder.ORDER_CREATE_SUCCESS;
  payload: Order;
}
interface OrderFailAction {
  type: ActionTypeOrder.ORDER_CREATE_FAIL;
  payload: string;
}

interface OrderDetailsRequestAction {
  type: ActionTypeOrder.ORDER_DETAILS_REQUEST;
}
interface OrderDetailsSuccessAction {
  type: ActionTypeOrder.ORDER_DETAILS_SUCCESS;
  payload: Order;
}
interface OrderDetailsFailAction {
  type: ActionTypeOrder.ORDER_DETAILS_FAIL;
  payload: string;
}

interface OrderPayRequestAction {
  type: ActionTypeOrder.ORDER_PAY_REQUEST;
}
interface OrderPaySuccessAction {
  type: ActionTypeOrder.ORDER_PAY_SUCCESS;
  payload: Order;
}
interface OrderPayFailAction {
  type: ActionTypeOrder.ORDER_PAY_FAIL;
  payload: string;
}

export type OrderAction =
  | OrderRequestAction
  | OrderSuccessAction
  | OrderFailAction
  | OrderDetailsRequestAction
  | OrderDetailsSuccessAction
  | OrderDetailsFailAction
  | OrderPayRequestAction
  | OrderPaySuccessAction
  | OrderPayFailAction;

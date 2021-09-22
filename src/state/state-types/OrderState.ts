import { Order } from "./Order";

// import { State, defaultState } from "../stateType";
export interface OrderState {
    loading: boolean;
    error: string | null;
    data: Order | null;
}

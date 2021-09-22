import { UserAction } from "../actions/userAction";
import { ActionTypeUser } from "../action-types/userTypes";
import { CurrentUser } from "../state-types/currentUser";
import { Error } from "../state-types/Error";
interface CurrentUserctState {
  loading: boolean;
  error: Error | null;
  data: CurrentUser | null;
}
const initialState = {
  loading: false,
  error: null,
  data: null,
};

const reducer = (
  state: CurrentUserctState = initialState,
  action: UserAction
): CurrentUserctState => {
  switch (action.type) {
    case ActionTypeUser.USER_SIGNIN_REQUEST:
      return { loading: true, error: null, data: null };
    case ActionTypeUser.USER_SIGNIN_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionTypeUser.USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload, data: null };

    case ActionTypeUser.USER_SIGNUP_REQUEST:
      return { loading: true, error: null, data: null };
    case ActionTypeUser.USER_SIGNUP_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionTypeUser.USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload, data: null };

    case ActionTypeUser.USER_SIGNOUT:
      return { loading: false, error: null, data: null };

    case ActionTypeUser.CURRENT_USER:
      return { loading: false, error: null, data: action.payload };

    default:
      return state;
  }
};

export default reducer;

import { ActionTypeUser } from "../action-types/userTypes";
import { LoginInputs } from "../state-types/loginInputs";
import { CurrentUser } from "../state-types/currentUser";
import { Error } from "../state-types/Error";
import { RegisterInputs } from "../state-types/RegisterInputs";
interface UserSigninRequest {
  type: ActionTypeUser.USER_SIGNIN_REQUEST;
  payload: LoginInputs;
}

interface UserSigninSuccess {
  type: ActionTypeUser.USER_SIGNIN_SUCCESS;
  payload: CurrentUser;
}

interface UserSigninFail {
  type: ActionTypeUser.USER_SIGNIN_FAIL;
  payload: Error;
}

interface UserSignupRequest {
  type: ActionTypeUser.USER_SIGNUP_REQUEST;
  payload: RegisterInputs;
}

interface UserSignupSuccess {
  type: ActionTypeUser.USER_SIGNUP_SUCCESS;
  payload: CurrentUser;
}

interface UserSignupFail {
  type: ActionTypeUser.USER_SIGNUP_FAIL;
  payload: Error;
}

interface UserLogout {
  type: ActionTypeUser.USER_SIGNOUT;
}

interface UserCurrent {
  type: ActionTypeUser.CURRENT_USER;
  payload: CurrentUser | null;
}
export type UserAction =
  | UserSigninRequest
  | UserSigninSuccess
  | UserSigninFail
  | UserLogout
  | UserCurrent
  | UserSignupRequest
  | UserSignupSuccess
  | UserSignupFail;
//   | CartAddSuccessAction
//   | CartAddFailAction;

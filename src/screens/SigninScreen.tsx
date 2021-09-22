import { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { useSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const SigninScreen = (props: RouteComponentProps) => {
  const { sigin } = useActions();
  const {
    loading,
    error,
    // data: userInfo,
  } = useSelector((state) => state.userInfo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const redirect = props.location.search
  //   ? props.location.search.split("=")[1]
  //   : "/";

  const submitHandler = async (e: any) => {
    e.preventDefault();
    // console.log("err", error?.message);

    await sigin(email, password);
    // console.log("err message", error?.message);

    // if (!error?.message) props.history.push(redirect);
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign in</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error?.message && (
          <MessageBox variant="danger">{error.message}</MessageBox>
        )}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Login
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;

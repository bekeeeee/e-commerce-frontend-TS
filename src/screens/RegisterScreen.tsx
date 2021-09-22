import { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { useSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const RegisterScreen = (props: RouteComponentProps) => {
  const { register } = useActions();
  const {
    loading,
    error,
    // data: userInfo,
  } = useSelector((state) => state.userInfo);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const redirect = props.location.search
  //   ? props.location.search.split("=")[1]
  //   : "/";

  const submitHandler = async (e: any) => {
    e.preventDefault();

    await register(username, email, password);
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?
            <Link to="/signin">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;

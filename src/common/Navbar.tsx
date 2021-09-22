import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
// import { useAppSelector } from "../hooks/useAppSelector";
const Navbar = (props: any) => {
  const cartItems = useSelector((state) => state.cart.orderItems);
  // console.log("carItems navbar", cartItems);
  const { data: currentUser } = useSelector((state) => state.userInfo);

  const { currentUser: currentUserFn, signout } = useActions();
  // console.log("curretUser", currentUser);

  const useSignout = async (e: any) => {
    e.preventDefault();
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    await signout();
    // props.history.reload();
    window.location.reload();
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await currentUserFn();
    };
    fetchCurrentUser();
  }, []);

  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          amazona
        </Link>
      </div>
      <div>
        <Link to="/cart">
          Cart
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>

        {currentUser ? (
          <div className="dropdown">
            <Link to="/me">
              {currentUser.username}
              <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <Link to="#signout" onClick={useSignout}>
                Sign Out
              </Link>
            </ul>
          </div>
        ) : (
          <Link to="/signin">Sing In</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;

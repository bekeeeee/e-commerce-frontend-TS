import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Navbar from "./common/Navbar";
import SigninScreen from "./screens/SigninScreen";
import ProtectedRoute from "./common/ProtectedRoute";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PayementMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
function App() {
  // const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <Navbar />
        <Switch>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/products/:id" component={ProductScreen}></Route>

          {/* <Route path="/signin" component={SigninScreen} exact></Route> */}
          <ProtectedRoute
            exact
            path="/signin"
            component={SigninScreen}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/register"
            component={RegisterScreen}
          ></ProtectedRoute>
          <Route
            path="/shipping"
            component={ShippingAddressScreen}
            exact
          ></Route>

          <Route path="/payment" component={PaymentMethodScreen} exact></Route>
          <Route path="/placeorder" component={PlaceOrderScreen} exact></Route>
          <Route path="/order/:id" component={OrderScreen} exact></Route>

          <Route path="/" component={HomeScreen} exact></Route>
        </Switch>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

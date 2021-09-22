import { useState } from "react";
import { RouteComponentProps } from "react-router";
import CheckoutSteps from "../components/CheckoutSteps";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useTypedSelector";
import { ShippingAddress } from "../state/state-types/ShippingAddress";

export default function ShippingAddressScreen(props: RouteComponentProps) {
  let shippingAdress: ShippingAddress = {
    fullname: "",
    city: "",
    address: "",
    postalCode: 0,
    country: "",
  };

  const userInfo = useSelector((state) => state.userInfo);
  shippingAdress = useSelector((state) => state.cart.shippingAddress);
  // console.log("shippingAdress", shippingAdress);
  if (!userInfo.data) {
    props.history.push("/signin");
  }
  const [fullname, setFullname] = useState<string>(shippingAdress.fullname);
  const [address, setِAddress] = useState<string>(shippingAdress.address);
  const [city, setCity] = useState<string>(shippingAdress.city);
  const [postalCode, setPostalCode] = useState<number>(
    shippingAdress.postalCode
  );
  const [country, setCountry] = useState<string>(shippingAdress.country);

  const { saveShippingAddress } = useActions();
  const submitHandler = (e: any) => {
    e.preventDefault();
    saveShippingAddress({ fullname, address, city, postalCode, country });
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullname">Full Name </label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="address">Address </label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setِAddress(e.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="city">City </label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code </label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter full name"
            value={postalCode}
            onChange={(e) => setPostalCode(parseInt(e.target.value))}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="country">Country </label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary">Continue</button>
        </div>
      </form>
    </div>
  );
}

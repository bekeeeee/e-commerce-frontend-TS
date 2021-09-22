// import axios from "axios";
import { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { useSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const HomeScreen = () => {
  const { listProducts } = useActions();
  const {
    data: products,
    error,
    loading,
  } = useSelector((state) => state.productList);
  // console.log("products", products);

  // const { doRequest, errors, loading } = useRequest({
  //   url: "api/products",
  //   method: "get",
  //   onSuccess: (data: any) => setProducts(data),
  // });

  useEffect(() => {
    const fetchData = async () => {
      // doRequest();
      await listProducts();
    };

    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;

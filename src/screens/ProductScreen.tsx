import { useEffect, useState } from "react";
// import data from "../../../backend/data";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useTypedSelector";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductScreen = (props: any) => {
  const [qty, setQty] = useState<any>(1);
  const id = props.match.params.id;
  // const product = data.products.find((product) => product._id === id);
  // if (!product) return <div>Product Not Found</div>;
  const { productDetails } = useActions();
  const {
    data: product,
    error,
    loading,
  } = useSelector((state) => state.productDetails);

  //  const product = productt.product? productt.product : null;
  const addToCartHandler = () => {
    props.history.push(`/cart/${id}?qty=${qty}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      // doRequest();
      await productDetails(id);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : product ? (
        <div>
          <Link to="/">Back to results</Link>
          <div className="row top">
            <div className="col-2">
              <img src={product?.image} alt={product?.name} className="large" />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product?.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  Decription:<p>{product.description}</p>
                </li>
              </ul>
            </div>

            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div />
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    {product.countInStock > 0 && (
                      <>
                        <li>
                          <div className="row">
                            <div />
                            <div>
                              <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                          <button
                            onClick={addToCartHandler}
                            className="primary block"
                          >
                            Add To Cart
                          </button>
                        </li>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductScreen;

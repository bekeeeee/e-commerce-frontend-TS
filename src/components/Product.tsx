import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }: any) => {
  return (
    <div className="card" key={product._id}>
      <Link to={`/products/${product._id}`}>
        <img className="medium" src={product.image} alt="product" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
};

export default Product;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/ProductSlice";
import { updateCart } from "../store/CartSlice";

import styles from './ViewProduct.module.css'; 
import Layout from "../components/UI/Layout/Layout";

const ViewProduct = (props) => {
  const { products, hasLoaded } = useSelector(state => state.products);
  // const cartItems = useSelector(state => state.cart.addToCart);
  const [productData, setProductData] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(getProducts());
    } else {
      const product = products.find(item => item.id.toString() === params.productId);
      setProductData(product);
    }
  }, [dispatch, hasLoaded, products, params.productId]);

  const addToCart = () => {
    dispatch(updateCart(0));
  }

  let productEl = productData !== null
    ? (
        <div className={styles['product-container']}>
          <div className={styles['image-container']}>
            <img src={productData.image} alt="Product"/>
          </div>
          <h2>{productData.name}</h2>
          <br/>
          <p><b>Price: {productData.price}</b> </p>
          <p><b>Net Weight: {productData.net_weight}</b> </p>
          <p><b>Flavor: </b> {productData.flavor}</p>
          <p><b>Alcohol Content: </b> {productData.alcohol_content}</p>
          <p><b>Current Stock: </b> {productData.current_stock}</p>
          <p><b>Category: </b> {productData.category}</p>
        </div>
    ) : (<h2>No Product Found</h2>);

  return (
    <Layout title="View Product" isViewOnly>
      {productEl}
      <br/>
      {props.cartMode && 
        <button type="submit" className={`primary ${styles["btn-proceed"]}`} onClick={addToCart}>
          ADD TO CART
        </button>}
    </Layout>
  );
}

export default ViewProduct;
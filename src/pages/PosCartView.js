import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/ProductSlice';
import { updateCart, 
        increaseQuantity,
        reduceQuantity,
        clearCart } from '../store/CartSlice';
import { Modal } from 'rsuite';
import { useNavigate } from 'react-router-dom';

import styles from './PosCartView.module.css';
import Layout from "../components/UI/Layout/Layout";
import Scanner from "../components/Scanner/Scanner";
import SmallButton from '../components/UI/SmallButton/SmallButton';
import ProductItemCounter from '../components/Products/ProductItemCounter';

const PosCartView = () => {
  // **TEMPORARY**
  const [temporaryCartPointer, setTemporaryCartPointer] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentProduct, setCurrentProduct] = useState(0);
  const {products, hasLoaded} = useSelector(state => state.products);
  const cart = useSelector(state => state.cart.items);
  const cartTotalPrice = useSelector(state => state.cart.totalPrice);
  const [barcodes , setBarcodes] = useState([]);
  const [barcodeScanActive, setBarcodeScanActive] = useState(false);
  const [productPreviewActive, setProductPreviewActive] = useState(false);

  const navigateSearchProduct = () => {
    navigate('../product-search', {replace: false});
  }

  useEffect(()=> {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    let temp_barcodes = {};
    for (let i = 0; i < products.length; i++) {
      temp_barcodes[products[i].barcode] = [];
      temp_barcodes[products[i].barcode].push({
        'id': products[i].id,
        'index': i
      });
    }
    setBarcodes(temp_barcodes);
  }, [hasLoaded, products]);

  // Calculate TOTAL
  // useEffect(() => {
  //   let total = 0;
  //   for(const item of cart) {
  //     total += (products[item['index']].price * item['quantity']);
  //   }
  //   setCartTotal(formatPrice(total));
  // }, [cart, cartTotal, products]);

  const barcodeDetectedHandler = result => {
    document.querySelector('#interactive video').pause();
    setBarcodeScanActive(false);
    let barcode = result.codeResult.code;
    if (barcode in barcodes) {
    } else {
      setBarcodeScanActive(true);
      document.querySelector('#interactive video').play();
    }
  }

  const addToCart = (barcode) => {
    let currentProduct = products.find(el => el.barcode === barcode);
    dispatch(updateCart({
      ...currentProduct,
      quantity: 1
    }));
    openProductPreview(currentProduct);
  }

  const addQuantityHandler = (id) => {
    dispatch(increaseQuantity(id));
  }

  const reduceQuantityHandler = (id) => {
    dispatch(reduceQuantity(id));
  }

  const clearCartHandler = () => {
    dispatch(clearCart());
  }

  const formatPrice = (price) => {
    return ((Math.round(price * 100) / 100).toFixed(2))
  }

  const toggleBarcodeScan = () => {
    setBarcodeScanActive(prev => !prev);
  }

  const onProductPreviewClose = () => {
    setProductPreviewActive(false);
  }

  const openProductPreview = (currentProduct) => {
    setCurrentProduct(currentProduct);
    setProductPreviewActive(true);
    setTimeout(() => {
      setProductPreviewActive(false);
      setBarcodeScanActive(true);
    }, 3000);
  }

  // **TEMPORARY**
  const manualAddProduct = () => {
    let current_barcode = products[temporaryCartPointer].barcode;
    console.log(current_barcode);
    addToCart(current_barcode);
    setTemporaryCartPointer(prevState => prevState+1);
  }

  let productPreview = currentProduct !== 0 ? (
      <>
        <div className={styles['product-title-container']}>
          <img src={currentProduct.image} alt="product added preview"/>
          <h3>{currentProduct.name}</h3>
        </div>
        <br/>
        <p>Net Weight: <b>{currentProduct.net_weight}</b></p>
        <p>Price: <b>{currentProduct.price}</b></p>
      </>
   ) : 'No Product Found Yet.';

   let cartItems = (
      cart.map((item) => {
        return (
          <ProductItemCounter
            key={item.id}
            id={item.id}
            imgUrl={item.image}
            name={item.name}
            net={item.net_weight}
            flavor={item.flavor}
            price={item.price}
            quantity={item.quantity}
            increment={addQuantityHandler}
            decrement={reduceQuantityHandler}
          />
        );
      })
   );

  return (
    <Layout title="POS">
      <div className={styles['barcode-view']} onClick={toggleBarcodeScan}>
        <div className={styles['search-icon']}
          onClick={navigateSearchProduct}
          >
          <img src='/icons/search.png' alt="search"/>
        </div>
        <div className="scanner-container">
          {barcodeScanActive && <Scanner onDetected={barcodeDetectedHandler} />}
        </div>
      </div>
      <div className={styles["cart-container"]}>
        <p className="label">
          <b>CART</b>
        </p>
        <ul>
          {cartItems}
        </ul>
      </div>
      <div className={styles["cart-details"]}>
        <p className="label">
          <b>TOTAL</b>
        </p>
        <div className={styles["clear-button"]}>
          <SmallButton label="clear" onClick={clearCartHandler} />
        </div>
        <p className={`label ${styles["total-price"]}`}>
          <b>Php {formatPrice(cartTotalPrice)}</b>
        </p>
        <button type="submit" className={`primary ${styles["btn-proceed"]}`} onClick={manualAddProduct}>
          MANUAL ADD
        </button>
        <button type="submit" className={`primary ${styles["btn-proceed"]}`}>
          PROCEED
        </button>
      </div>

      <Modal open={productPreviewActive} className={styles['product-modal-wrapper']} onClose={onProductPreviewClose}>
        <Modal.Header>
          <Modal.Title>Product Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productPreview}
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default PosCartView;

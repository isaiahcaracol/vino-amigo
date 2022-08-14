import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/ProductSlice';
import { Modal } from 'rsuite';
import { useNavigate } from 'react-router-dom';

import styles from './PosCartView.module.css';
import Layout from "../components/UI/Layout/Layout";
import Scanner from "../components/Scanner/Scanner";
import SmallButton from '../components/UI/SmallButton/SmallButton';
import ProductItemCounter from '../components/Products/ProductItemCounter';

const PosCartView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const {products, hasLoaded} = useSelector(state => state.products);
  const [barcodes , setBarcodes] = useState([]);
  const [barcodeScanActive, setBarcodeScanActive] = useState(false);
  const [productPreviewActive, setProductPreviewActive] = useState(false);
  const [productPreviewIndex, setProductPreviewIndex] = useState(-1);

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

  useEffect(() => {
    let total = 0;
    for(const item of cart) {
      total += (products[item['index']].price * item['quantity']);
    }
    setCartTotal(formatPrice(total));
  }, [cart, cartTotal, products]);

  const barcodeDetectedHandler = result => {
    document.querySelector('#interactive video').pause();
    setBarcodeScanActive(false);
    let barcode = result.codeResult.code;
    if (barcode in barcodes) {
      addToCart(barcode);
    } else {
      setBarcodeScanActive(true);
      document.querySelector('#interactive video').play();
    }
  }

  const addToCart = (barcode) => {
    let productsRefSet = barcodes[barcode];

    if (productsRefSet.length === 1) {
      openProductPreview(productsRefSet[0].index);
      // if exists on cart
      if (cart.find(item => item['id'] === productsRefSet[0].id)) {
        let itemIndex = cart.findIndex(item => item['id'] === productsRefSet[0].id);
        let itemQuantity = cart[itemIndex].quantity;
        let tempCart = [...cart];
        tempCart[itemIndex] = {
          ...cart[itemIndex], 
          'quantity': (itemQuantity+1)
        }
        setCart(tempCart);
      } else {
        setCart([...cart, {
          ...productsRefSet[0],
          quantity: 1,
        }]);
      }
    } else {
      // multiple items
    }
  }

  const clearCart = () => {
    setCart([]);
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

  const openProductPreview = (index) => {
    setProductPreviewIndex(index);
    setProductPreviewActive(true);
    setTimeout(() => {
      setProductPreviewActive(false);
      setBarcodeScanActive(true);
    }, 3000);
  }

  const addQuantity = (id) => {
    let index = cart.findIndex(el => el['id'] === id);
    let temp_cart = [...cart];
    temp_cart[index].quantity += 1;
    setCart(temp_cart);
  }

  const reduceQuantity = (id) => {
    let index = cart.findIndex(el => el['id'] === id);
    let temp_cart = [...cart];
    if (temp_cart[index].quantity > 1) {
      temp_cart[index].quantity -= 1;
    } else {
      temp_cart.splice(index, 1);
    }
    setCart(temp_cart);
  }

  let productPreview = productPreviewIndex >= 0 ? (
      <>
        <div className={styles['product-title-container']}>
          <img src={products[productPreviewIndex].image} alt="product added preview"/>
          <h3>{products[productPreviewIndex].name}</h3>
        </div>
        <br/>
        <p>Net Weight: <b>{products[productPreviewIndex].net_weight}</b></p>
        <p>Price: <b>{products[productPreviewIndex].price}</b></p>
      </>
   ) : 'No Product Found Yet.';

   let cartItems = (
      cart.map((item) => {
        const product = products[item.index];
        return (
          <ProductItemCounter
            key={item.id}
            id={item.id}
            imgUrl={product.image}
            name={product.name}
            net={product.net_weight}
            flavor={product.flavor}
            price={product.price}
            quantity={item.quantity}
            increment={addQuantity}
            decrement={reduceQuantity}
          />
        );
      })
   );

  return (
    <Layout title="POS">
      <div className={styles['barcode-view']} onClick={toggleBarcodeScan}>
        <div className={styles['search-icon']} onClick={navigateSearchProduct}>
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
          <SmallButton label="clear" onClick={clearCart} />
        </div>
        <p className={`label ${styles["total-price"]}`}>
          <b>Php {formatPrice(cartTotal)}</b>
        </p>
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

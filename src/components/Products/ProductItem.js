import { useNavigate } from 'react-router-dom';
import styles from './ProductItem.module.css';

const ProductItem = (props) => {
  const { name, net, flavor, price, imgUrl, id, cartMode } = props;
  const navigate = useNavigate();

  const viewProductHandler = () => {
    if (cartMode) {
      navigate(`/products/${id}/cart`, {replace: false});
    } else {
      navigate(`/products/${id}`, {replace: false});
    }
  };

  return (
    <>
      <li className={styles['product-item']} onClick={viewProductHandler}>
        <img src={imgUrl} alt={name} className={styles['image']} />
        <div className={styles['details']}>
          <span className={styles['title']}>{name}</span>
          <span className={styles['flavor']}>{net} - {flavor}</span>
          <span className={styles['price']}>{price}</span>
        </div>
      </li>
    </>
  )
}

export default ProductItem;
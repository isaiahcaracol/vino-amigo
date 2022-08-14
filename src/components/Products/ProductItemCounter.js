import ButtonIcon from '../UI/ButtonIcon/ButtonIcon';
import styles from './ProductItemCounter.module.css';

const ProductItemCounter = (props) => {
  return (
    <li className={styles['product-item']}>
      <img className={styles['product-image']} src={props.imgUrl} alt={props.name} />
      <div className={styles['details']}>
        <span className={styles['title']}>{props.name}</span>
        <span className={styles['flavor']}>{props.net} - {props.flavor}</span>
        <span className={styles['price']}>{props.price} {props.quantity > 1 && `(${props.quantity})`}</span>
      </div>
      <div className={styles['counter-container']}>
        <ButtonIcon icon="remove" className={styles['button-counter']} onClick={() => props.decrement(props.id)} />
        <div className={styles['item-count']}>{props.quantity}</div>
        <ButtonIcon icon="add" className={styles['button-counter']} onClick={() => props.increment(props.id)} />
      </div>
    </li>
  )
}

export default ProductItemCounter;
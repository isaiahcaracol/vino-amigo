import styles from './ProductsFilter.module.css';
import { InputPicker } from 'rsuite';

const DUMMY_CATEGORIES = [
  {
    "label": "Wines",
    "value": "Wines",
  },
  {
    "label": "Liquor",
    "value": "Liquor",
  },
  {
    "label": "Tonic",
    "value": "Tonic",
  },
];

const ProductsFilter = () => {

  return (
    <div>
      <InputPicker data={DUMMY_CATEGORIES} className={styles['input-picker']} placeholder="Category"/>
    </div>
  )
}

export default ProductsFilter;
import styles from './PosAddBarcode.module.css';
import Layout from '../components/UI/Layout/Layout';
import ProductItemCounter from '../components/Products/ProductItemCounter';

const DUMMY_CART = [
  {
    id: "1",
    imgUrl: "/images/soju.png",
    name: "Yellow Tail",
    size: "1L",
    flavor: "Pink Moscato",
    price: "14,000.00",
  },
  {
    id: "1",
    imgUrl: "/images/soju.png",
    name: "Yellow Tail",
    size: "1L",
    flavor: "Pink Moscato",
    price: "14,000.00",
  },
];

const PosAddBarCode = () => {
  return (
    <Layout title="Add product" isViewOnly>
      <div className={styles['barcode-view']}></div>
      <div className={styles["items-container"]}>
        <p className="label">
          <b>ITEMS</b>
        </p>
        <ul>
          {DUMMY_CART.map((item) => {
            return (
              <ProductItemCounter
                key={item.id}
                id={item.id}
                imgUrl={item.imgUrl}
                name={item.name}
                size={item.size}
                flavor={item.flavor}
                price={item.price}
              />
            );
          })}
        </ul>
      </div>
      <button className='primary green'>ADD ITEMS</button>
    </Layout>
  )
}

export default PosAddBarCode;
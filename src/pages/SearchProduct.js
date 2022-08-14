import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/ProductSlice';

import styles from './SearchProduct.module.css';
import Layout from "../components/UI/Layout/Layout";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import ProductItem from '../components/Products/ProductItem';

const SearchProduct = () => {
  const { products, hasLoaded } = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  let productsList = hasLoaded && (
    <ul className={styles['products-list']}>
      {products.map(product => {
        return <ProductItem 
          key={product.id}
          id={product.id}
          name={product.name}
          net={product.net_weight}
          flavor={product.flavor}
          price={product.price}
          imgUrl={product.image}
          cartMode={true} />
      })}
    </ul>
  );

  return (
    <Layout title="Search Product" isViewOnly>
      <SearchInput/>
      <div className={styles['products-container']}>
        {productsList}
      </div>
    </Layout>
  )
}

export default SearchProduct;
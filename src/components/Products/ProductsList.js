import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../store/ProductSlice';
import Fuse from 'fuse.js';

import styles from "./ProductsList.module.css";
// import SearchInput from "../UI/SearchInput/SearchInput";
// import ProductsFilter from "./ProductsFilter";
import ProductBarcodeInput from './ProductBarcodeInput';
import ProductItem from "./ProductItem";
import Layout from "../UI/Layout/Layout";

const ProductsList = () => {
  const { products, hasLoaded } = useSelector(state => state.products);
  const [productsIndex, setProductsIndex] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [searchType, setSearchType] = useState();
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(getProducts());
    }
  }, [dispatch, hasLoaded]);

  useEffect(() => {
    console.log('indexing');
    setProductsIndex(new Fuse(products, {
      keys: [
        'name',
        'flavor',
        'category',
        'barcode',
      ],
      useExtendedSearch: true
    }));
  }, [products]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let results = [];
      if (searchType === 'text') {
        results = productsIndex.search(searchInput);
      } else {
        results = productsIndex.search(`=${searchInput}`);
      }
      setResults(results);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, productsIndex, searchType]);

  const onInputChangeHandler = (valueSet) => {
    const [value, type] = valueSet;
    setSearchType(type);
    setSearchInput(value);
  }

  let productsList = results.length !== 0
    && (results.map((item) => (
        <ProductItem
          key={item['item'].id}
          id={item['item'].id}
          imgUrl={item['item'].image}
          name={item['item'].name}
          net={item['item'].net_weight}
          flavor={item['item'].flavor}
          price={item['item'].price}
        />
      )));

  return (
    <Layout title="All Products">
      {/* <SearchInput value={searchInput} onSearchInput={onInputChangeHandler}/> */}
      <ProductBarcodeInput inputValue={searchInput} onInputValueChange={onInputChangeHandler} />
      <ul className={styles["products-list"]}>
        {productsList}
      </ul>
    </Layout>
  );
};

export default ProductsList;

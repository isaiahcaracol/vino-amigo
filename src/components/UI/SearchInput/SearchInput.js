import styles from './SearchInput.module.css';

const SearchInput = (props) => {
  const onInputChangeHandler = (e) => {
    props.onSearchInput(e.target.value);
  }

  return (
    <>
      <div className={styles['search-input-container']}>
        <input className={`${props.className} ${styles['search-input']} rounded`} 
          typeof="text" 
          placeholder="Search" 
          onChange={onInputChangeHandler}/>
      </div>
    </>
  );
};

export default SearchInput;

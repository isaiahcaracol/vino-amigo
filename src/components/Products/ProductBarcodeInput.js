import { useState } from 'react';
import { Modal } from 'rsuite';

import styles from './ProductBarcodeInput.module.css';
import Scanner from '../Scanner/Scanner';

const ProductBarcodeInput = (props) => {
  const [barcodeModalIsOpen, setBarcodeModalIsOpen] = useState(false);
  const [barcodeData, setBarcodeData] = useState('');

  const onBarcodeDetected = result => {
    setBarcodeData(result.codeResult.code);
    setBarcodeModalIsOpen(false);
    props.onInputValueChange([result.codeResult.code, 'barcode'])
  }

  const onInputChange = e => {
    props.onInputValueChange([e.target.value, 'text']);
  }

  const openModalHandler = () => {
    setBarcodeModalIsOpen(true);
  }

  const closeModalHandler = () => {
    setBarcodeModalIsOpen(false);
  }
  
  return <>
    <div className={styles['barcode-input-group']}>
      <input id="product_barcode" 
        name="barcode" 
        className={styles['barcode-input']} 
        value={props.inputValue}
        onChange={onInputChange} />
      <div id="scanBarcodeButton" onClick={openModalHandler} href="#" className={styles['barcode-image-button']}>
        <img src="/icons/qr_code_scanner.png" alt="scan barcode"/>
      </div>
    </div>

    <Modal open={barcodeModalIsOpen} onClose={closeModalHandler} className={styles['barcode-modal-wrapper']}>
      <Modal.Header>
        <Modal.Title>Barcode Scanner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="scanner-container">
          {barcodeModalIsOpen && <Scanner onDetected={onBarcodeDetected} />}
        </div>
        <p>{barcodeData}</p>
      </Modal.Body>
      <Modal.Footer>
        <p>This is Footer</p>
      </Modal.Footer>
    </Modal>
  </>
}

export default ProductBarcodeInput;
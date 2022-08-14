import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AutoComplete, Button, Modal } from 'rsuite';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../utils/canvasUtils';
import Scanner from "../Scanner/Scanner";

import styles from './AddNewProduct.module.css';
import Layout from "../UI/Layout/Layout";

const formInitialValues = {
  'image': '',
  'name': 'fsdf',
  'price': '16.09',
  'net_weight': 'sdfsd',
  'flavor': 'sdfsdf',
  'category': 'Something',
  'alcohol_content': 'dfsdf',
  'current_stock': '1',
  'barcode': '2352452'
}

const productCategories = [
  'Wine',
  'Beer',
  'Alcohol Free'
];

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [barcodeModalIsOpen, setBarcodeModalIsOpen] = useState(false);
  const [barcodeData, setBarcodeData] = useState('');
  const [productImage, setProductImage] = useState('');
  const [croppedImage, setCroppedImage] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onSuccessSaveHandler = () => {
    navigate('/products/all', {replace: false});
  }

  const onBarcodeDetected = result => {
    setBarcodeData(result.codeResult.code);
    setBarcodeModalIsOpen(false);
  };

  const readFile = file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    })
  }

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    let croppedImageBlob = await getCroppedImg(
      productImage,
      croppedAreaPixels
    );

    let blob = await fetch(croppedImageBlob).then(r => r.blob());

    let mimeType = blob.type;
    let reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.addEventListener("load", () => {
        let { result } = reader;
        let croppedFile = new File([result], "img.jpeg", { type: mimeType, lastModified:new Date().getTime() });
        setCroppedImage(croppedFile);
        console.log(croppedFile);
    }, false);
  }

  const setImagePreview = async (file) => {
    let imageDataUrl = await readFile(file);
    setProductImage(imageDataUrl);
  }

  const openModalHandler = (e) => {
    e.preventDefault();
    setBarcodeModalIsOpen(true);
  }

  const closeModalHandler = () => {
    setBarcodeModalIsOpen(false)
  }

  return (
    <Layout title="Add Product" isViewOnly>
      <div className={styles['image-cropper']}>
        <Cropper
          image={productImage}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{ containerStyle: {
            'borderRadius': '20px'
          }}}
        />
      </div>

      <div className={styles['image-button-container']}>
        <Button onClick={() => document.getElementById('product_image').click()}>Select Image</Button>
      </div>

      <Formik
        initialValues={formInitialValues}
        onSubmit={(values, { setSubmitting, setErrors, setFieldValue }) => {
          console.log('is submitting...')
          setSubmitting(true);
          values = {
            ...values, 
            'image': croppedImage,
            'barcode': barcodeData
          };

          let token = localStorage.getItem('vinoAmigoAuthToken');
          
          axios.post('http://127.0.0.1:8000/api/products/', values, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            onSuccessSaveHandler();
          }).catch(error => {
            console.log(error.response.data);
            setErrors(error.response.data);
          });
          
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className={styles['add-product-form']}>
            <input id="product_image" hidden type="file" name='image' onChange={event => {
              setFieldValue('image', event.currentTarget.files[0]);
              setImagePreview(event.currentTarget.files[0]);
            }}></input>

            <label htmlFor="product_name">Product Name</label>
            <Field id="product_name" name="name" />
            <ErrorMessage name="name" component="span" className='form-error' />

            <label htmlFor="product_price">Price</label>
            <Field id="product_price" name="price" />
            <ErrorMessage name="price" component="span" className='form-error' />

            <label htmlFor="product_barcode">Barcode</label>
            <div className={styles['barcode-input-group']}>
              <Field id="product_barcode" name="barcode" className={styles['barcode-input']} value={barcodeData} />
              <div id="scanBarcodeButton" onClick={openModalHandler} href="#">
                <img src="/icons/qr_code_scanner.png" alt="scan barcode"/>
              </div>
            </div>
            <ErrorMessage name="barcode" component="span" className='form-error' />

            <label htmlFor="product_net_weight">Net Weight</label>
            <Field id="product_net_weight" name="net_weight" />
            <ErrorMessage name="net_weight" component="span" className='form-error' />

            <label htmlFor="product_flavor">Flavor</label>
            <Field id="product_flavor" name="flavor" />
            <ErrorMessage name="flavor" component="span" className='form-error' />

            <label htmlFor="product_category">Category</label>
            <AutoComplete id="product_category" 
                data={productCategories}
                name="category"
                onChange={e => setFieldValue('category', e)}
              />
            <ErrorMessage name="category" component="span" className='form-error' />

            <label htmlFor="product_alcohol_content">Alcohol Content</label>
            <Field id="product_alcohol_content" name="alcohol_content" />
            <ErrorMessage name="alcohol_content" component="span" className='form-error' />

            <label htmlFor="product_current_stock">Current Stock</label>
            <Field id="product_current_stock" name="current_stock" />
            <ErrorMessage name="current_stock" component="span" className='form-error' />

            <button type="submit" disabled={isSubmitting} className={`primary ${styles['btn-primary']}`}>
              {isSubmitting ? 'Saving': 'Submit'}
            </button>
          </Form>
        )}
      </Formik>

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
      
    </Layout>
  );
};

export default AddNewProduct;

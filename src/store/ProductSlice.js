import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  products: [],
  hasLoaded: false,
}

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (arg, {rejectWithValue}) => {
    return axios({
      method: 'get',
      url: 'http://localhost:8000/api/products/',
      headers: {
        'Authorization': `Token ${localStorage.getItem('vinoAmigoAuthToken')}`,
      }
    })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log('Error on fetch products', error);
      return rejectWithValue(error)
    });
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getProducts.fulfilled]: (state, {payload, meta}) => {
      state.products = payload;
      state.status = 'success';
      state.hasLoaded = true;
    },
    [getProducts.rejected]: (state, action) => {
      state.status = 'failed';
    }
  }
});

export default productSlice.reducer;
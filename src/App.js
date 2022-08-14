import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import 'rsuite/dist/rsuite.min.css';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Pos from './pages/Pos';
import PosCartView from "./pages/PosCartView";
import Users from './pages/Users';
import ProductsList from "./components/Products/ProductsList";
import AddNewProduct from "./components/Products/AddNewProduct";
import ViewProduct from "./pages/ViewProduct";
import SearchProduct from "./pages/SearchProduct";
import AuthContext from "./store/AuthContext";
import UsersList from "./pages/UsersList";

function App() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx.verifyAuth()) {
      navigate('/', {replace: true});
    }
  }, [navigate, authCtx]);

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="login" element={<Login/>} />
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="products" element={<Products/>}>
        <Route path=":productId/" element={<ViewProduct/>}/>
        <Route path=":productId/cart" element={<ViewProduct cartMode={true}/>}/>
        <Route path="all" element={<ProductsList/>}/>
        <Route path="add" element={<AddNewProduct/>}/>
      </Route>
      <Route path="pos" element={<Pos/>}>
        <Route index element={<PosCartView/>} />
        <Route path="product-search" element={<SearchProduct/>} />
        {/* <Route path="add-barcode" element={<PosBarCode/>} />
        <Route path="add-search" element={<h1>Scanning</h1>} /> */}
      </Route>
      <Route path="users" element={<Users/>}>
        <Route index path="all" element={<UsersList/>}/>
        {/* <Route path="add" element={<AddUser/>}/> */}
      </Route>
    </Routes>
  );
}

export default App;

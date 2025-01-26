
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/home/Home.jsx'
import ShopPage from './pages/shop/ShopPage.jsx';
import CategoryPage from './pages/category/CategoryPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App/>}>
       <Route path='/' element={<Home/>}/>
       <Route path='/shop' element={<ShopPage/>}/>
       <Route path='/categories/:categoryName' element={<CategoryPage/>}/>  {/* single category route */}
       {/* error page */}
       <Route path='*' element={<ErrorPage/>}/>
      </Route>
      {/* authentication */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  </BrowserRouter>
   
 
)

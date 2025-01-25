
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/home/Home.jsx'
import ShopPage from './pages/shop/ShopPage.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App/>}>
       <Route path='/' element={<Home/>}/>
       <Route path='/shop' element={<ShopPage/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
   
 
)

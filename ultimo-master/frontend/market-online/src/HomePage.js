import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Login from "./pages/login";
import Register from "./pages/register";
import Market from "./pages/market";
import Success from "./components/success";
import Cancel from "./components/cancel";
import Search from './components/search';
import Shop from "./pages/cart";
import Liked from "./pages/liked";
import Aste from"./pages/aste";

export default function HomePage(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<Home/>}/>
        <Route path= "/login" element={<Login/>}/>
        <Route path= "/register" element={<Register/>}/>
        <Route path= "/Ortoshop" element={<Market/>}/>
        <Route path= "/success" element={<Success/>}/>
        <Route path= "/cancel" element={<Cancel/>}/>
        <Route path="/search" element={<Search />} />
        <Route path="/OrtoShop/shop" element={<Shop />} />
        <Route path="/Ortoshop/liked" element={<Liked />} />
        <Route path="/Ortoshop/aste" element={<Aste />} />
      </Routes>
    </BrowserRouter>

  )
}
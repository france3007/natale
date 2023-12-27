import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import './header.css';
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbGavel } from "react-icons/tb";
import Profile from "./profile";
import Carrello from "./carrello";
import Preferiti from "./preferiti";
import Search from "./search";

export default function Header({ userName, surname, email }) {
  // VARIABILI USESTATE
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isPreferitiOpen, setPreferitiOpen] = useState(false);
  const navigate = useNavigate();

  //DEFINISCO LA FUNZIONE CHE MI PERMETTE DI FARE LA RICERCA 
  const handleSearch = () => {
    // Naviga alla pagina di ricerca con il termine di ricerca come parametro
    navigate(`/search`, { state: { q: searchTerm } });
  };

  // FUNZIONI CHE MI PERMETTONO DI APRIRE IL CARRELLO, PROFILO, PREFERITI
  const openProfile = () => {
    setProfileOpen(true);
  };
  const closeProfile = () => {
    setProfileOpen(false);
  };

  const openCart = () => {
    setCartOpen(true);
  };
  const closeCart = () => {
    setCartOpen(false);
  };

  const openPreferiti = () => {
    setPreferitiOpen(true);
  };
  const closePreferiti = () => {
    setPreferitiOpen(false);
  };

  return (
    <div className="head">
      <h1 ><Link to="/Ortoshop" className="Ortoshop">OrtoShop</Link></h1>
      <div className="container-ricerca">
        <button onClick={handleSearch} className="search"><FaSearch/></button>
        <input type="text" placeholder="Cerca su OrtoShop" value={searchTerm} id="searchInput"  onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      <ul>
        <li><CgProfile style={{ width: 25, height: 25 }} onClick={openProfile} /></li>
        {isProfileOpen && (
          <Profile
            user={{ firstName: userName, lastName: surname, email: email }}
            onClose={closeProfile}
            onLogout={() => {
              // Aggiungi la logica di logout qui
              closeProfile();
            }}
          />
        )}
        <li><Link to="/OrtoShop/aste" className="shop"><TbGavel style={{ width: 25, height: 25 }} /></Link></li>
        <li><Link to="/OrtoShop/liked" className="shop" ><FaRegHeart style={{ width: 25, height: 25 }} /></Link></li>
        <li><Link to="/OrtoShop/shop" className="shop" ><MdOutlineShoppingCart  style={{ width: 25, height: 25, paddingRight: 5 }}/></Link></li>
        
      </ul>
    </div>
  );
}

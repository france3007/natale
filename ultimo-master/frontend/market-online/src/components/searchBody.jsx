import "./searchBody.css"
import React, { useState, useEffect } from "react";
import { FaRegHeart } from 'react-icons/fa';
import { FcLike } from "react-icons/fc";
import { getAllProducts } from "../utils/APIRoutes";
import { addToCartRoute } from "../utils/APIRoutes";
import {addToFavorites} from '../utils/APIRoutes';

export default function SearchBody({ ricerca }) {
  // Recupera i dati dell'utente dal localStorage
  const user = JSON.parse(localStorage.getItem('chat-app-user'));

  // Verifica se l'utente è loggato e ottieni l'id
  const id = user ? user._id : "Ospite";

  // DEFINISCO TUTTE LE VARIABILI USESTATE
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [likes, setLikes] = useState({});

  // DEFINISCO LA FETCH PER PRENDERE TUTTI I PRODOTTI
  const fetchData = async () => {
    try {
      const response = await fetch(getAllProducts);
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Errore durante il recupero dei prodotti:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // EFFETTUO IL FILTRAGGIO DEI PRODOTTI IN BASE ALLA RICERCA
  useEffect(() => {
    const filtered = allProducts.filter(product =>
      product.nome.toLowerCase().includes(ricerca.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [ricerca, allProducts]);

  //FUNZIONE CHE CI PERMETTE DI INSERIRE I PRODOTTI NEL CARRELLO
  const handleAddToCart = async (id, productId) => {
    try {
        // Chiamata alla funzione addToCart del backend
        const response = await fetch(addToCartRoute(id, productId, 1), { method: 'POST' }); // Assuming 1 as the quantity, adjust accordingly
        // Gestisci la risposta come preferisci
        const data = await response.json();
        console.log('Prodotto aggiunto al carrello:', data);
    } catch (error) {
        // Gestisci gli errori qui
        console.error('Errore durante l\'aggiunta al carrello:', error);
    }
  };
  //FUNZIONE CHE CI PERMETTE DI INSERIRE I PRODOTTI NEL LIKE
    const handleAddToFavorites = async (id, productId) => {
      try {
          // Chiamata alla funzione addToCart del backend
          const response = await fetch(addToFavorites(id, productId), { method: 'POST' }); // Assuming 1 as the quantity, adjust accordingly
          // Gestisci la risposta come preferisci
          const data = await response.json();
          console.log('Prodotto aggiunto ai preferiti:', data);
      } catch (error) {
          // Gestisci gli errori qui
          console.error('Errore durante l\'aggiunta ai preferiti:', error);
      }
    };

  return (
    <div className="ricerca">
      <p className="descrizione">Ecco i risultati della tua ricerca: {ricerca}</p>
      {filteredProducts.map(product => (
        <div key={product._id} className="product">
          <div className="img">
            <img src={product.image}></img>
          </div>
          <div className="like" onClick={() => { setLikes((prevLikes) => ({ ...prevLikes, [product._id]: !prevLikes[product._id] })); handleAddToFavorites(id, product._id); }}>
            {likes[product._id] ? <FcLike className="liked" /> : <FaRegHeart className="not-liked" />}
          </div>
          <div className="info">
          <p><b>Nome: </b>{product.nome}</p>
          <p><b>Prezzo: </b>{product.price.toFixed(2)}€/kg</p>
          <button onClick={() => handleAddToCart(id,product._id)}>Aggiungi al Carrello</button>
          </div>
        </div>
      ))}
    </div>
  );
}



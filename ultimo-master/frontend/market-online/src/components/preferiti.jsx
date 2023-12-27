import React, { useState, useEffect } from "react";
import { getFavoriteProducts } from "../utils/APIRoutes";
import { Link } from "react-router-dom";
import "./preferiti.css";
import { TbCircleArrowLeft } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { removeFavoriteProduct } from "../utils/APIRoutes";

export default function Preferiti({ onClose }) {
  // RECUPERA I DATI DELL'UTENTE DAL LOCALSTORAGE
  const user = JSON.parse(localStorage.getItem("chat-app-user"));

  // VERIFICO SE L'UTENTE è LOGGATO E PRENDO IL SUO USER ID
  const userid = user ? user._id : "Ospite";
  console.log(userid)

  // ELEMENTI DI TIPO USESTATE
  const [preferiti, setPreferiti] = useState([]);

  // FUNZIONE PER PRENDERE I DATI DEL CARRELLO PRESENTE ALL'UTENTE
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(getFavoriteProducts(userid));
        if (response.ok) {
          const data = await response.json();
          setPreferiti(data);
          console.log(data);
        } else {
          const errorData = await response.json();
          console.error(
            "Errore durante il recupero del carrello:",
            errorData.error
          );
        }
      } catch (error) {
        console.error("Errore durante il recupero del carrello:", error);
      }
    };
    fetchCartData();
  }, [userid]);
    //FUNZIONE PER RIMUOVE UN ELEMENTO DAI PREFERITI
    const handleRemoveFavoriteProduct = async (productId) => {
      try {
        const response = await fetch(removeFavoriteProduct(userid, productId), {
          method: "DELETE",
        });
  
        if (response.ok) {
          // Aggiorna lo stato dopo la rimozione dai preferiti
          const updatedCart = preferiti.filter(
            (prodotto) => prodotto._id !== productId
          );
          setPreferiti(updatedCart);
          console.log(setPreferiti)
        } else {
          const errorData = await response.json();
          console.error("Errore durante la rimozione dai preferiti:", errorData.error);
        }
      } catch (error) {
        console.error("Errore durante la rimozione dai preferiti:", error);
      }
    };
  return (
    <div className="preferiti">
      <h3>I tuoi preferiti</h3>
      <div className="lista">
        {preferiti.map((prodotto, index) => (
          <div key={index} className="prodotto">
            <MdOutlineDelete style={{color: 'red', width: 20, height: 20, cursor: "pointer"}} onClick={() => handleRemoveFavoriteProduct(prodotto._id)}/>
            <img src={prodotto.image} alt={prodotto.nome} />
            <p className="name">{prodotto.nome}</p>
            <p>
              <b>{prodotto.price.toFixed(2)}€</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


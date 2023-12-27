import React, { useState, useEffect } from "react";
import { getFromCart } from "../utils/APIRoutes";
import { Link } from "react-router-dom";
import "./carrello.css";
import { TbCircleArrowLeft } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { removeFromCart } from "../utils/APIRoutes";

export default function Carrello({ onClose }) {
  // RECUPERA I DATI DELL'UTENTE DAL LOCALSTORAGE
  const user = JSON.parse(localStorage.getItem("chat-app-user"));

  // VERIFICO SE L'UTENTE è LOGGATO E PRENDO IL SUO USER ID
  const userid = user ? user._id : "Ospite";

  // ELEMENTI DI TIPO USESTATE
  const [prodottiCarrello, setProdottiCarrello] = useState([]);

  // FUNZIONE PER PRENDERE I DATI DEL CARRELLO PRESENTE ALL'UTENTE
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(getFromCart(userid));
        if (response.ok) {
          const data = await response.json();
          setProdottiCarrello(data);
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

  const calcolaTotale = () => {
    const totaleCentesimi = prodottiCarrello.reduce(
      (totale, prodotto) => totale + prodotto.product.price * prodotto.quantity,
      0
    );
  
    // Utilizza toFixed(2) per ottenere solo due decimali
    const totaleEuro = (totaleCentesimi ).toFixed(2);
  
    return totaleEuro;
  };

  const checkout = async () => {
    try {
      const res = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          totalAmount: calcolaTotale() // Passa il totale calcolato invece della funzione
        })
      });
  
      const data = await res.json();
      console.log('checkout Response:', data);
  
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('URL di indirizzamento non definito');
      }
    } catch (error) {
      console.error('Errore', error);
    }
  };
   //FUNZIONE PER RIMUOVE UN ELEMENTO DAL CARRELLO
   const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(removeFromCart(userid, productId), {
        method: "DELETE",
      });

      if (response.ok) {
        // Aggiorna lo stato dopo la rimozione dal carrello
        const updatedCart = prodottiCarrello.filter(
          (prodotto) => prodotto.product._id !== productId
        );
        setProdottiCarrello(updatedCart);
      } else {
        const errorData = await response.json();
        console.error("Errore durante la rimozione dal carrello:", errorData.error);
      }
    } catch (error) {
      console.error("Errore durante la rimozione dal carrello:", error);
    }
  };

  return (
    <div className="carrello">
      <h3>Procedi all'acquisto!</h3>
      <div className="lista">
        {prodottiCarrello.map((prodotto, index) => (
          <div key={index} className="prodotto">
            <MdOutlineDelete className="delete" onClick={() => handleRemoveFromCart(prodotto.product._id)}/>
            <p className="quantity"><b>x{prodotto.quantity}</b></p>
            <img src={prodotto.product.image} alt={prodotto.product.nome} />
            <p className="name">{prodotto.product.nome}</p>
            <p><b>{(prodotto.product.price * prodotto.quantity).toFixed(2)}€</b></p>
          </div>
        ))}
      </div>
      <div className="totale">
        <p className="tot"><b>Totale:</b></p>
        <p><b>{calcolaTotale()}€</b></p>
      </div>
      <button onClick={checkout}>Acquista</button>
    </div>
  );
}



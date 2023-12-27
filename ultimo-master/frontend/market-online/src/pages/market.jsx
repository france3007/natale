import React from "react";
import Header from "../components/header";
import Shop from "../components/shop";
import "./market.css"

export default function Market() {
    // Recupera i dati dell'utente dal localStorage
    const user = JSON.parse(localStorage.getItem('chat-app-user'));

    // Verifica se l'utente è loggato e ottieni il nome
    const userName = user ? user.nome : "Ospite";
    const surname = user ? user.cognome : "Ospite";
    const email = user ? user.email : "Ospite";
    const id = user ? user._id : "Ospite";
    const carrello= user ? user.prodottiNelCarrello : "Ospite";

    return(
        <>
            <Header userName={userName} surname={surname} email={email} id={id}/>
            <Shop userName={userName} id={id} carrello={carrello}/>
        </>
    );
}
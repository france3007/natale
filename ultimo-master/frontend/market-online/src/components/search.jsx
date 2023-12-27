import React from "react";
import Header from "../components/header";
import SearchBody from "./searchBody"
import { useLocation } from "react-router-dom";

export default function Search() {
    // RECUPERO I DATI DALL'URL
    const { state } = useLocation();
    const q = state ? state.q : undefined;
  
    console.log(q);
    // Recupera i dati dell'utente dal localStorage
    const user = JSON.parse(localStorage.getItem('chat-app-user'));

    // Verifica se l'utente è loggato e ottieni il nome
    const userName = user ? user.nome : "Ospite";
    const surname = user ? user.cognome : "Ospite";
    const email = user ? user.email : "Ospite";
    const id = user ? user._id : "Ospite";
    return(
        <>
            <Header userName={userName} surname={surname} email={email} id={id}/>
            <SearchBody ricerca={q}/>
        </>
    );
}
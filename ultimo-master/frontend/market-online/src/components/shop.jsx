import React, { useRef, useState, useEffect } from "react";
import './shop.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from 'react-icons/fa';
import { FcLike } from "react-icons/fc";
import {getAllProducts} from "../utils/APIRoutes"
import { addToCartRoute } from '../utils/APIRoutes';
import {addToFavorites} from '../utils/APIRoutes';
import {getFavoriteProducts} from '../utils/APIRoutes'

const ELEMENTI_PER_PAGINA = 6;
const calculateElementWidth = (containerRef, itemsPerPage) => {
  if (containerRef.current) {
    const containerWidth = containerRef.current.offsetWidth;
    return containerWidth / itemsPerPage;
  }
  return 0;
};
export default function Shop({ userName, id}) {
  
  //inserisco tutte le variabili USESTATE che servono
  const [likesFrutta, setLikesFrutta] = useState({});
  const [likesVerdura, setLikesVerdura] = useState({});
  const [prodotti, setProdotti] = useState([]);
  const [preferiti,setPreferiti] = useState([]);
  const fruttaContainerRef = useRef(null);
  const verduraContainerRef = useRef(null);
  const [paginaFrutta, setPaginaFrutta] = useState(1);
  const [paginaVerdura, setPaginaVerdura] = useState(1);
  const quantity=1;
  // Aggiungi una variabile per la larghezza dinamica degli elementi
  const elementWidth = calculateElementWidth(fruttaContainerRef, ELEMENTI_PER_PAGINA);

  // Aggiorna la larghezza degli elementi in base alla larghezza dinamica calcolata
  const elementStyle = {
    width: `${elementWidth}px`,
  };
    //DEFINISCO LA FUNZIONE CHE MI PERMETTE DI PRENDERE I PRODOTTI PREFERITI
    const fetchFavoriteProducts = async () => {
      try {
        const response = await fetch(getFavoriteProducts(id));
        const data = await response.json();
        setPreferiti(data);
      } catch (error) {
        console.error('Errore durante il recupero dei prodotti preferiti:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
      fetchFavoriteProducts(); 
    }, [id]);

  //definisco la richiesta FETCH PER PRENDERE I PRODOTTI 
  const fetchData = async () => {
    try {
      // Chiamata alla funzione getAllProducts del backend
      const response = await fetch(getAllProducts);
      const data = await response.json();
      setProdotti(data);
    } catch (error) {
      console.error('Errore durante il recupero dei prodotti:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //funzione che serve per SCROLLARE A DESTRA E A SINISTRA i prodotti
  const scrollLeft = (containerRef, paginaStateSetter) => {
    if (containerRef.current) {
      const elementWidth = calculateElementWidth(containerRef, ELEMENTI_PER_PAGINA);
      const scrollAmount = elementWidth * ELEMENTI_PER_PAGINA;
  
      containerRef.current.classList.remove("scroll-container-continuous");
      containerRef.current.scrollLeft -= scrollAmount;
      paginaStateSetter((prevPagina) => Math.max(prevPagina - 1, 1));
  
      if (containerRef.current.scrollLeft <= 0) {
        containerRef.current.scrollLeft = 0;
        containerRef.current.classList.remove("scroll-container-continuous");
      }
    }
  };
  
  const scrollRight = (containerRef, paginaStateSetter, maxPagina) => {
    if (containerRef.current) {
      const elementWidth = calculateElementWidth(containerRef, ELEMENTI_PER_PAGINA);
      const scrollAmount = elementWidth * ELEMENTI_PER_PAGINA;
  
      containerRef.current.classList.remove("scroll-container-continuous");
      containerRef.current.scrollLeft += scrollAmount;
      paginaStateSetter((prevPagina) => Math.min(prevPagina + 1, maxPagina));
  
      const maxScrollLeft = containerRef.current.scrollWidth - containerRef.current.clientWidth;
  
      if (containerRef.current.scrollLeft >= maxScrollLeft) {
        containerRef.current.scrollLeft = maxScrollLeft;
        containerRef.current.classList.remove("scroll-container-continuous");
      }
    }
  };
  
  
  
  //VALORI UTILIZZATI NELLA FUNZIONE 
  const fruttaInizio = (paginaFrutta - 1) * ELEMENTI_PER_PAGINA;
  const fruttaFine = paginaFrutta * ELEMENTI_PER_PAGINA;
  const verduraInizio = (paginaVerdura - 1) * ELEMENTI_PER_PAGINA;
  const verduraFine = paginaVerdura * ELEMENTI_PER_PAGINA;

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
    <div className="prodotti">
      
      <h2 className="sezione1">Frutta</h2>
      <div className="scroll-container" ref={fruttaContainerRef}>
        <div className="frutta" style={{ width: `${elementWidth * prodotti.filter((prodotto) => prodotto.tipo === "frutta").length}px` }}>
          {prodotti
            .filter((prodotto) => prodotto.tipo === "frutta")
            .map((frutto) => (
              <div key={frutto._id} style={elementStyle}>
                <div className="like" onClick={() => { setLikesFrutta((prevLikes) => ({ ...prevLikes, [frutto._id]: !prevLikes[frutto._id] })); handleAddToFavorites(id, frutto._id); }}>
                  {likesFrutta[frutto._id] ? <FcLike className="liked"   style={{width:18,height:18}} /> : <FaRegHeart className="not-liked" style={{width:16,height:16}} />}
                </div>
                <img src={frutto.image} alt={frutto.nome} />
                <div>{frutto.nome}</div>
                <div>
                  <b>{frutto.price.toFixed(2)} €/kg</b>{" "}
                </div>
                <button onClick={() => handleAddToCart(id,frutto._id)}>Aggiungi al Carrello</button>
              </div>
            ))}
        </div>
      </div>
      <button className="scroll-button1 scroll-left" onClick={() => scrollLeft(fruttaContainerRef, setPaginaFrutta)}><IoIosArrowBack/></button>
      <button className="scroll-button1 scroll-right" onClick={() =>scrollRight(fruttaContainerRef, setPaginaFrutta, Math.ceil(prodotti.filter((prodotto) => prodotto.tipo === "frutta").length / ELEMENTI_PER_PAGINA))}>
        <IoIosArrowForward/>
      </button>

      <h2 className="sezione2">Verdura</h2>
      <div className="scroll-container" ref={verduraContainerRef}>
        <div className="verdura" style={{ width: `${elementWidth * prodotti.filter((prodotto) => prodotto.tipo === "verdura").length}px` }}>
          {prodotti
            .filter((prodotto) => prodotto.tipo === "verdura")
            .map((verdura) => (
              <div key={verdura._id} style={elementStyle}>
                <div className="like" onClick={() => { setLikesVerdura((prevLikes) => ({ ...prevLikes, [verdura._id]: !prevLikes[verdura._id] })); handleAddToFavorites(id, verdura._id); }}>
                  {likesVerdura[verdura._id] ? <FcLike className="liked" style={{width:18,height:18}}/> : <FaRegHeart className="not-liked" style={{width:16,height:16}} />}
                </div>
                <img src={verdura.image} alt={verdura.nome} />
                <div>{verdura.nome}</div>
                <div>
                  <b>{verdura.price} €/kg</b>
                </div>
                <button onClick={() => handleAddToCart(id,verdura._id)}>Aggiungi al Carrello</button>
              </div>
            ))}
        </div>
      </div>
      <button className="scroll-button2 scroll-left" onClick={() => scrollLeft(verduraContainerRef, setPaginaVerdura)}><IoIosArrowBack/></button>
      <button className="scroll-button2 scroll-right" onClick={() =>scrollRight(verduraContainerRef, setPaginaVerdura, Math.ceil(prodotti.filter((prodotto) => prodotto.tipo === "verdura").length / ELEMENTI_PER_PAGINA))}>
        <IoIosArrowForward/>
      </button>
    </div>
  );
}
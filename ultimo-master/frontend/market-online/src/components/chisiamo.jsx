import React from "react";
import { Link } from "react-router-dom";
import './chisiamo.css';

export default function ChiSiamo() {
    //FUNZIONE CHE MI PERMETTE DI SCROLLARE VERSO IL BASSO 
  const scrollDown = (distance) => {
    window.scrollTo({
      top: window.scrollY + distance,
      behavior: 'smooth'
    });
  };

  return (
    <div className="block1">
      <div className="head">
        <ul>
          <li><Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link></li>
          <li onClick={() => scrollDown(window.innerHeight)} style={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}>Servizi</li>
          <li onClick={() => scrollDown(1.8 * window.innerHeight)} style={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}>Info</li>
        </ul>
        <h1>OrtoShop</h1>
      </div>
      <div className="body">
        <div className="messaggio">
          <h3>Benvenuto in OrtoShop!</h3>
          <p>
            In OrtoShop hai la possibilità di esplorare la nostra vasta gamma di prodotti ortofrutticoli.
            Ogni singolo prodotto è controllato e certificato in modo tale da offrire la migliore qualità italiana.
            Registrati ed entra nel nostro mondo!
          </p>
          <Link to="/login">
            <button><b>Accedi</b></button>
          </Link>
        </div>
        <div className="immagine">
        </div>
      </div>
    </div>
  );
}


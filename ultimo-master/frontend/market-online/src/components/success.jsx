import React from 'react';
import { Link, useLocation } from 'react-router-dom';  // Importa useLocation
import { removeAllFromCart } from '../utils/APIRoutes';

const Success = () => {
  const location = useLocation();  // Usa useLocation per ottenere la location corrente
    // RECUPERA I DATI DELL'UTENTE DAL LOCALSTORAGE
    const user = JSON.parse(localStorage.getItem("chat-app-user"));

    // VERIFICO SE L'UTENTE è LOGGATO E PRENDO IL SUO USER ID
    const userid = user ? user._id : "Ospite";
    console.log(userid)
  

  const handleReturnHome = async () => {
    try {
      console.log('fatto')
      // Effettua una richiesta per svuotare il carrello
      const response = await fetch(removeAllFromCart(userid), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Carrello svuotato con successo');
      } else {
        const errorData = await response.json();
        console.error('Errore durante lo svuotamento del carrello:', errorData.error);
      }

      // Redirect alla home dopo aver svuotato il carrello
      window.location.href = '/Ortoshop';
    } catch (error) {
      console.error('Errore durante la richiesta di svuotamento del carrello:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.message}>Pagamento avvenuto con successo!</h2>
      <Link to="/Ortoshop" style={styles.button} onClick={handleReturnHome}>
        Torna alla Home
      </Link>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Imposta l'altezza al 100% della viewport
  },
  message: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
  },
};

export default Success;

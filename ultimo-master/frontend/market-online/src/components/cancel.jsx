import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.message}>Pagamento non riuscito!</h2>
      <Link to="/Ortoshop" style={styles.button}>
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

export default Cancel;

import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import {getAllAste} from '../utils/APIRoutes';
import { aggiornaPrezzo } from '../utils/APIRoutes';
import "./asta.css";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbFilterSearch } from "react-icons/tb";

const socket = io.connect('http://localhost:3000');

function Asta() {
  //INIZIALIZZO LE VARIABILI USESTATE
  const [countdown, setCountdown] = useState(0);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [aste, setAste] = useState([]);
  const [inputMessages, setInputMessages] = useState({});
  const [productMessages, setProductMessages] = useState({});


  //DEFINISCO A FETCH PER PRENDERE LE ASTE DAL DATABASE
  useEffect(() => {
    fetch(getAllAste)
      .then((response) => response.json())
      .then((data) => setAste(data))
      .catch((error) => console.error('Errore durante il recupero delle aste:', error));
  
  //DEFINISCO IL COUNT PER LE ASTE
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        const now = new Date();
        const endTime = new Date(aste[0]?.dataFine + ' ' + aste[0]?.oraDiFine);
        const timeDiff = endTime - now;

        if (timeDiff <= 0) {
          clearInterval(countdownInterval);
          setIsTimerExpired(true);
        }

        return timeDiff > 0 ? timeDiff : 0;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [aste]);

  //DEFINISCO IL FORMATO PER IL TEMPO
  const formatTime = (timeInMilliseconds) => {
  const seconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

    return `${hours}:${minutes % 60}:${seconds % 60}`;
  };

  //DEFINISCO I POSSIBILI MESSAGGI DI ERRORE PER LE OFFERTE
  const sendMessage = (productName,astaId) => {
    const message = inputMessages[productName];

    if (!/^\d+(\.\d{1,2})?$/.test(message)) {
      alert('Devi inserire un importo numerico valido');
      return;
    }

    const puntata = parseFloat(message);
    const prezzoProdotto = parseFloat(aste.find((p) => p.nomeProdotto === productName)?.prezzoPartenza);
    const ultimaPuntata = parseFloat(productMessages[productName]?.slice(-1)[0]?.messaggio) || 0;

    if (puntata <= ultimaPuntata) {
      alert('Inserisci un importo più elevato');
      return;
    }

    if (puntata < prezzoProdotto) {
      alert('Punta un importo più alto del prezzo di partenza');
      return;
    }

    socket.emit('send_message', { messaggio: message, prodotto: productName });
    console.log('Messaggio inviato:', message);

    setProductMessages((prevMessages) => ({
      ...prevMessages,
      [productName]: [...(prevMessages[productName] || []), { utente: 'Tu', messaggio: message }],
    }));

    setInputMessages({ ...inputMessages, [productName]: '' });
  };

  const handleRedeem = (productName) => {
    alert(`Riscattato per ${productName}`);
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setProductMessages((prevMessages) => ({
        ...prevMessages,
        [data.prodotto]: [...(prevMessages[data.prodotto] || []), data.messaggio],
      }));
    });
  }, []);

  return (
    <div>
      <form>
      <input placeholder={`codice asta..`} className='codiceInput'/>
      <button className='codiceButton'><TbFilterSearch/></button>
      </form>
    <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
      {aste.map((asta, index) => (
        <div className="AstaContainer" key={index} style={{ marginRight: '40px' }}>
          <h2>{asta.nomeProdotto}</h2>
          <img src={asta.image} alt={`${asta.nomeProdotto} Image`} />
          <p><b>Prezzo di partenza:</b> {asta.prezzoPartenza}$</p>
          <p>{asta.prezzoCorrente}</p>
          <p className='prezzoCorrente'>
              <b>Prezzo Corrente:</b> {productMessages[asta.nomeProdotto]?.slice(-1)[0]?.utente} -{' '}
              {productMessages[asta.nomeProdotto]?.slice(-1)[0]?.messaggio}$
          </p>
          <div className="inputContainer">
              <input
                placeholder={`La tua puntata...`}
                value={inputMessages[asta.nomeProdotto] || ''}
                onChange={(e) =>
                  setInputMessages((prevInputMessages) => ({
                    ...prevInputMessages,
                    [asta.nomeProdotto]: e.target.value,
                  }))
                }
              />
              <button className='bottone' onClick={() => sendMessage(asta.nomeProdotto,asta.prezzoCorrente)}>
                <FaMoneyBillTransfer className='paga' />
              </button>
          </div>
          <p><b>Tempo rimanente:</b> {formatTime(countdown)}</p>
          <button onClick={() => handleRedeem(asta.nomeProdotto)} disabled={!isTimerExpired}>
            Riscatta
          </button>
          <div>

          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Asta;


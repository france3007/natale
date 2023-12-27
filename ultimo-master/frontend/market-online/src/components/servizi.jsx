import React from "react";
import './servizi.css';

export default function Servizi(){
    return(
        <div className="block2">
            <h2>I nostri servizi</h2>
            <div className="contenuto">
                <div className="prima_sezione">
                    <h3>Aste</h3>
                    <p>Questa sezione permette la vendita di prodotti tramite aste, che possono essere aperte
                    al pubblico o chiuse e riservate a buyer selezionati. Il sistema di aste è progettato per essere
                    sicuro e trasparente, assicurando la correttezza delle transazioni e proteggendo contro
                    pratiche scorrette. Le aste possono essere personalizzate in base a diversi parametri come
                    tipo di asta, durata, e limiti di partecipazione, fornendo flessibilità sia agli operatori che ai
                    compratori</p>
                </div>
                <div className="seconda_sezione">
                    <h3>Mercato Centrale</h3>
                    <p>Funziona come un aggregatore di domanda, permettendo agli operatori
                    del MARKET di fare acquisti collettivi di beni e servizi necessari per la produzione e il
                    packaging. Questo sistema centralizza le richieste di acquisto, negozia con i fornitori, e
                    ottiene prezzi competitivi, traducendosi in risparmi significativi per gli utenti della
                    piattaforma. Inoltre, gestisce le richieste di approvvigionamento specificando tipologie,
                    quantità, e tempi di consegna richiesti.</p>
                </div>
            </div>
        </div>
    );
}
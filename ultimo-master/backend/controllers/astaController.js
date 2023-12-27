const Product = require('../models/productModel')
const User = require('../models/userModel')
const Asta = require('../models/astaModel')
module.exports.getAllAste = async (req,res)=>{ 
    try {
        const aste = await Asta.find();
        res.json(aste);
    } catch (error) {
        res.status(500).json({ message: error.message });
  }
}

module.exports.aggiornaPrezzo = async (req, res) => {
  const { astaId, currentPrice } = req.params;

  try {
    // Trova l'asta nel database basandoti sul nome del prodotto
    const asta = await Asta.findbyId(astaId);

    if (!asta) {
      return res.status(404).json({ message: 'Asta non trovata' });
    }

    // Aggiorna il prezzo corrente dell'asta
    asta.prezzoCorrente = currentPrice;

    // Salva le modifiche nel database
    await asta.save();

    res.json({ message: 'Prezzo corrente aggiornato con successo', asta });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addAsta = async (req, res) => {
    try {
      const nuovaAsta = new Asta({
        nomeProdotto: req.body.nomeProdotto,
        descrizioneProdotto: req.body.descrizioneProdotto,
        prezzoPartenza: req.body.prezzoPartenza,
        dataInizio: req.body.dataInizio,
        dataFine: req.body.dataFine,
      });
  
      const astaSalvata = await nuovaAsta.save();
      res.status(201).json(astaSalvata);
    } catch (error) {
      console.error('Errore durante l\'inserimento dell\'asta:', error);
      res.status(500).json({ errore: 'Errore durante l\'inserimento dell\'asta'});
    }
};
const Product = require('../models/productModel')
const User = require('../models/userModel')


module.exports.getProduct = async (req,res)=>{
    try{
        const products = await Product.find();
        res.json(products)
    } catch(error){
        console.log(error)
    }
}

module.exports.addToFavorites = async (req, res) => {
    try {
        const {userId,productId} = req.params;
        const user = await User.findById(userId);
        if (!user) {
           throw new Error('Utente non trovato');
      }
      if (!user.favoriteProducts.includes(productId)) {
        user.favoriteProducts.push(productId);
        await user.save();
      }
      return user.favoriteProducts;

    } catch (error) {
        throw new Error(`Errore durante l'aggiunta ai preferiti: ${error.message}`);
    }
  };

module.exports.removeFavoriteProduct = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const user = await User.findById(userId);
  
        if (!user) {
            throw new Error('Utente non trovato');
      }
      user.favoriteProducts = user.favoriteProducts.filter(id => id.toString() !== productId);
      await user.save();
      res.json(user.favoriteProducts);
    } catch (error) {
        res.status(500).json({ error: `Errore durante la rimozione dai preferiti: ${error.message}` });
    }
  };

module.exports.getFavoriteProducts = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('favoriteProducts');
  
        if (!user) {
            throw new Error('Utente non trovato');
      }
      res.json(user.favoriteProducts);
    } catch (error) {
        res.status(500).json({ error: `Errore durante il recupero dei preferiti: ${error.message}` });
    }
  };

module.exports.addToCart = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.params;
        console.log('Richiesta addToCart ricevuta');
        console.log('userId:', userId);
        console.log('productId:', productId);
        console.log('quantity:', quantity);
        
      // Verifica se l'utente esiste
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Utente non trovato');
      }
  
      // Verifica se il prodotto esiste
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Prodotto non trovato');
      }
  
      // Aggiunge il prodotto al carrello dell'utente
        const existingCartItemIndex = user.prodottiNelCarrello.findIndex(item => item.productId.equals(productId));
  
        if (existingCartItemIndex !== -1) {
        // Se il prodotto è già nel carrello, aggiorna solo la quantità
            user.prodottiNelCarrello[existingCartItemIndex].quantity += parseInt(quantity, 10) || 1;
        } else {
        // Altrimenti, aggiungi il prodotto al carrello con la quantità specificata o 1 se non specificata
            user.prodottiNelCarrello.push({ productId, quantity: parseInt(quantity, 10) || 1 });
      }
  
      // Salva le modifiche dell'utente nel database
        await user.save();
  
      // Restituisci l'array aggiornato dei prodotti nel carrello dell'utente
        res.json(user.prodottiNelCarrello);
    } catch (error) {
        res.status(500).json({ error: `Errore durante l'aggiunta al carrello: ${error.message}` });
    }
  };

module.exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
  
      // Verifica se l'utente esiste
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Utente non trovato');
      }
  
      // Verifica se il prodotto esiste
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Prodotto non trovato');
      }
  
      // Rimuove il prodotto dal carrello dell'utente
        user.prodottiNelCarrello = user.prodottiNelCarrello.filter(item => !item.productId.equals(productId));
  
      // Salva le modifiche dell'utente nel database
        await user.save();
  
      // Restituisci l'array aggiornato dei prodotti nel carrello dell'utente
        res.json(user.prodottiNelCarrello);
    } catch (error) {
        res.status(500).json({ error: `Errore durante la rimozione dal carrello: ${error.message}` });
    }
  };
  module.exports.getFromCart = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Verifica se l'utente esiste
      const user = await User.findById(userId).populate({
        path: 'prodottiNelCarrello.productId',
        model: 'Product',
      });
  
      if (!user) {
        throw new Error('Utente non trovato');
      }
  
      // Ottieni l'array completo dei dettagli dei prodotti nel carrello dell'utente
      const cartItems = user.prodottiNelCarrello.map(item => ({
        product: item.productId,
        quantity: item.quantity,
      }));
  
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ error: 'Errore durante la lettura del carrello: ${error.message}' })
    }
  };

  module.exports.removeAllFromCart = async (req, res) => {
    try {
      console.log('andatooo')
      const { userId } = req.params;
  
      // Verifica se l'utente esiste
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('Utente non trovato');
      }
  
      // Svuota completamente il carrello dell'utente
      user.prodottiNelCarrello = [];
  
      // Salva le modifiche dell'utente nel database
      await user.save();
  
      // Restituisci un messaggio di successo o l'array vuoto
      res.json({ message: 'Carrello svuotato con successo' });
    } catch (error) {
      res.status(500).json({ error: `Errore durante la rimozione dal carrello: ${error.message}` });
    }
  };
  
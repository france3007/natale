const express = require('express')
const mongoose = require('mongoose')
const userRoutes =require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const astaRoute = require("./routes/astaRoute")
const http = require("http")
const {Server} = require("socket.io")
const cors = require('cors');
require('dotenv').config();
const app = express()

const server = http.createServer(app)

const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY);



app.use(cors());
app.use(express.json());

app.post('/checkout', async (req, res) => {
    try {
      const { totalAmount } = req.body; // Estrai il costo totale dal corpo della richiesta
  
      // Crea una sessione di pagamento utilizzando il modulo checkout di Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Prodotti', // Puoi personalizzare il nome del prodotto o lasciarlo così
              },
              unit_amount: totalAmount * 100, // Converti il totale in centesimi
            },
            quantity: 1, // La quantità è 1 perché rappresenta l'intero ordine
          },
        ],
        success_url: 'http://localhost:3001/success',
        cancel_url: 'http://localhost:3001/cancel',
      });
  
      // Invia l'URL della sessione di pagamento come risposta
      res.json({ url: session.url });
    } catch (error) {
      // Gestisci eventuali errori durante la creazione della sessione di pagamento
      res.status(500).json({ error: error.message });
    }
  });
  

app.use("/api/auth", userRoutes)
app.use("/api/products", productRoute);
app.use("/api/aste", astaRoute);

const io = new Server(server, {
  cors:{
    origin: "http://localhost:3001",
    methods: ["GET","POST"]
  },
});

io.on('connection', (socket) => {

  socket.on("send_message", (data) => {
    const messaggioConIdUtente = {
      utente: socket.id,
      messaggio: data.messaggio
    };
    console.log(messaggioConIdUtente)

    socket.broadcast.emit("receive_message", {
      prodotto: data.prodotto,
      messaggio: messaggioConIdUtente
  });
  });
});



mongoose.connect('mongodb+srv://mymarket:market000@cluster0.ta2ikpb.mongodb.net/?retryWrites=true&w=majority')
const db = mongoose.connection

db.once('open', ()=>{console.log('Connesso al database')})

server.listen(3000, ()=>{console.log('in ascolto su porta 3000')})
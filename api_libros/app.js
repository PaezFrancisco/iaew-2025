const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express(); 
app.use(express.json()); 
 
// Importamos el Router de Libros 
const librosRouter = require('./routes/libros'); 
 
// Importamos el Middleware Error Handler 
const errorHandler = require('./middlewares/errorHandler'); 
 
// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/biblioteca';
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 2000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err.message);
  });
 
// Healthcheck simple
app.get('/health', (req, res) => {
  const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  res.json({ status: 'ok', dbState: state });
});
 
app.use('/libros', librosRouter); 
 
app.use(errorHandler); 
 
const server = app.listen(3000, () => { 
  console.log('Servidor iniciado en el puerto 3000'); 
});
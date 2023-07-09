require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT
const cors = require('cors');

const app = express()
app.use(express.json({ limit: '100mb' }))
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json())

const userRoutes = require('./user/routes/userRoutes');
const productRoutes = require('./product/routes/productRoutes');
const favoriteRoutes = require('./favorite/routes/favoriteRoutes');
const purchaseRoutes = require('./purchase/routes/purchaseRoutes');
const countryRoutes = require('./country/routes/countryRoutes');
const stateRoutes = require('./state/routes/stateRoutes');
const loginRoutes = require('./login/routes/loginRoutes');
const cardRoutes = require('./card/routes/cardRoutes');

app.use('/usuario', userRoutes);
app.use('/produto', productRoutes);
app.use('/favoritos', favoriteRoutes);
app.use('/compras', purchaseRoutes);
app.use('/pais', countryRoutes);
app.use('/estado', stateRoutes);
app.use('/login', loginRoutes);
app.use('/cartao', cardRoutes);

app.listen(port, () => {
  console.log(`API EXECUTANDO - PORTA: ${port}`)
})
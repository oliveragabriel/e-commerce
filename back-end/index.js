require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT
const cors = require('cors');

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json())

const userRoutes = require('./user/routes/userRoutes');
const productRoutes = require('./product/routes/productRoutes');
const purchaseRoutes = require('./purchase/routes/purchaseRoutes');
const countryRoutes = require('./country/routes/countryRoutes');
const stateRoutes = require('./state/routes/stateRoutes');
const loginRoutes = require('./login/routes/loginRoutes');

app.use('/usuario', userRoutes);
app.use('/produto', productRoutes);
app.use('/compras', purchaseRoutes);
app.use('/pais', countryRoutes);
app.use('/estado', stateRoutes);
app.use('/login', loginRoutes);

app.listen(port, () => {
  console.log(`API EXECUTANDO - PORTA: ${port}`)
})
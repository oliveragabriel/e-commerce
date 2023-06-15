require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT

const app = express()
app.use(bodyParser.json())

const userRoutes = require('./user/routes/userRoutes');
const productRoutes = require('./product/routes/productRoutes');
const purchaseRoutes = require('./purchase/routes/purchaseRoutes');
const countryRoutes = require('./country/routes/countryRoutes');
const stateRoutes = require('./state/routes/stateRoutes');

app.use('/usuario', userRoutes);
app.use('/produto', productRoutes);
app.use('/compras', purchaseRoutes);
app.use('/pais', countryRoutes);
app.use('/estado', stateRoutes);

app.listen(port, () => {
  console.log(`API EXECUTANDO - PORTA: ${port}`)
})
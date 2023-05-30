require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT

const app = express()
app.use(bodyParser.json())

const userRoutes = require('./user/routes/userRoutes');
const productRoutes = require('./product/routes/productRoutes');
const countryRoutes = require('./country/routes/countryRoutes');
const stateRoutes = require('./state/routes/stateRoutes');

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/country', countryRoutes);
app.use('/state', stateRoutes);

app.listen(port, () => {
  console.log(`API EXECUTANDO - PORTA: ${port}`)
})
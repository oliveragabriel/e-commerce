require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const port = process.env.PORT

const app = express()
app.use(bodyParser.json())

const stateController = require('./controllers/stateController');
const countryController = require('./controllers/paisController');
const assignmentController = require('./controllers/assignmentController');
const userController = require('./controllers/userController');

app.get('/list-state', stateController.listState);
app.get('/list-country', countryController.listCountry);
app.get('/user/list-assignment', assignmentController.listUserAssignments);
app.get('/user/:idUsuario', userController.getUserById);
app.get('/user/:idUsuario/contact', userController.getUserContact);
app.get('/user/:idUsuario/address', userController.getUserAddress);

app.get('/product/:idProduto', (req, res) => {
  const query = "SELECT * FROM produto WHERE id = $1"
  const values = [ req.params.idProduto ]
  database.query(query, values).then(
    (result) => {
      res.status(200).send({ result: result.rows })
    },
    (error) => {
      res.status(500).send({ error })
    }
  )
})

app.get('/product/list-type', (_, res) => {
  const query = "SELECT * FROM tipo"
  database.query(query).then(
      (result) => {
          res.status(200).send({ result: result.rows })
      },
      (error) => {
          res.status(500).send({ error })
      }
  )
})

app.listen(port, () => {
  console.log(`API EXECUTANDO - PORTA: ${port}`)
})
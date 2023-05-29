const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const port = 3000

const app = express()
app.use(bodyParser.json())

app.get('/list-state', (_, res) => {
  const query = "SELECT * FROM estado"
  database.query(query).then(
      (result) => {
          res.status(200).send({ result: result.rows })
      },
      (error) => {
          res.status(500).send({ error })
      }
  )
})

app.get('/list-country', (_, res) => {
  const query = "SELECT * FROM pais"
  database.query(query).then(
      (result) => {
          res.status(200).send({ result: result.rows })
      },
      (error) => {
          res.status(500).send({ error })
      }
  )
})

app.get('/user/list-assignment', (_, res) => {
  const query = "SELECT * FROM atribuicao"
  database.query(query).then(
      (result) => {
          res.status(200).send({ result: result.rows })
      },
      (error) => {
          res.status(500).send({ error })
      }
  )
})

app.get('/user/:idUsuario', (req, res) => {
    const query = "SELECT * FROM usuario WHERE id = $1"
    const values = [ req.params.idUsuario ]
    database.query(query, values).then(
      (result) => {
        res.status(200).send({ result: result.rows })
      },
      (error) => {
        res.status(500).send({ error })
      }
    )
})

app.get('/user/:idUsuario/contact', (req, res) => {
  const query = "SELECT contato.ddd, contato.numero, contato.email FROM contato INNER JOIN usuario ON usuario.id = contato.id_usuario WHERE usuario.id =  $1"
  const values = [ req.params.idUsuario ]
  database.query(query, values).then(
    (result) => {
      res.status(200).send({ result: result.rows })
    },
    (error) => {
      res.status(500).send({ error })
    }
  )
})

app.get('/user/:idUsuario/address', (req, res) => {
  const query = "SELECT endereco.rua, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, estado.nome, estado.sigla, pais.nome, pais.sigla FROM endereco INNER JOIN usuario ON usuario.id = endereco.id_usuario LEFT JOIN estado ON estado.id = endereco.estado LEFT JOIN pais ON pais.id = endereco.pais WHERE usuario.id = $1"
  const values = [ req.params.idUsuario ]
  database.query(query, values).then(
    (result) => {
      res.status(200).send({ result: result.rows })
    },
    (error) => {
      res.status(500).send({ error })
    }
  )
})

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
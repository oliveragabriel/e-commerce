const pg = require('pg')
const database = new pg.Client(process.env.DATABASE_URL)

database.connect((erro) => {
  if (erro) {
    return console.log('Não foi possível se conectar ao ElephantSQL!')
  } else {
    return console.log('Conectado ao ElephantSQL!')
  }
})

module.exports = database
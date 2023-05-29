const pg = require('pg')
const database = new pg.Client('postgres://ipyveyzy:wf3SgnN5jbzEi9-F7S4dXPWcfn1rgRDT@babar.db.elephantsql.com/ipyveyzy')

database.connect((erro) => {
  if (erro) {
    return console.log('Não foi possível se conectar ao ElephantSQL!')
  } else {
    return console.log('Conectado ao ElephantSQL!')
  }
})

module.exports = database
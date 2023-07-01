import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ControleUsuarioContext = createContext({})

export function ControleUsuarioContextProvider ({ children }) {
    const [usuarioLogado, setUsuarioLogado] = useState({})
    const [produtosSelecionadosParaCompra, setProdutosSelecionadosParaCompra] = useState([
      {
        id: 1,
        nome: 'Notebook A5 Acer Premium Top sdsadasdasdasdsadsd',
        valor: 5999
      }
    ])
    const [listaComTodosPaises, setListaComTodosPaises] = useState([])
    const [listaComTodosEstados, setListaComTodosEstados] = useState([])

  return (
    <ControleUsuarioContext.Provider
      value={{
        usuarioLogado,
        listaComTodosEstados,
        listaComTodosPaises,
        produtosSelecionadosParaCompra,
        setUsuarioLogado,
        setListaComTodosEstados,
        setListaComTodosPaises,
        setProdutosSelecionadosParaCompra
      }}
    >
      {children}
    </ControleUsuarioContext.Provider>
  )
}

ControleUsuarioContextProvider.propTypes = {
    children: PropTypes.element.isRequired
}
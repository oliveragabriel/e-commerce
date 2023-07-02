import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ControleUsuarioContext = createContext({})

export function ControleUsuarioContextProvider ({ children }) {
    const [usuarioLogado, setUsuarioLogado] = useState({})
    const [produtosSelecionadosParaCompra, setProdutosSelecionadosParaCompra] = useState([])
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
import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const ControleUsuarioContext = createContext({})

export function ControleUsuarioContextProvider ({ children }) {
    const [usuarioLogado, setUsuarioLogado] = useState({})
    const [produtosSelecionadosParaCompra, setProdutosSelecionadosParaCompra] = useState([])
    const [listaComTodosPaises, setListaComTodosPaises] = useState([])
    const [listaComTodosEstados, setListaComTodosEstados] = useState([])
    const [listaComTodasCategorias, setListaComTodasCategorias] = useState([])

    useEffect(() => {
      if (!usuarioLogado?.id) {
        const usuarioArmazenadoNoLocalStorage = localStorage.getItem('usuarioLogado')
        if (usuarioArmazenadoNoLocalStorage) {
          setUsuarioLogado(JSON.parse(usuarioArmazenadoNoLocalStorage))
        }
      }
    }, [setUsuarioLogado, usuarioLogado])

  return (
    <ControleUsuarioContext.Provider
      value={{
        usuarioLogado,
        listaComTodosEstados,
        listaComTodosPaises,
        listaComTodasCategorias,
        produtosSelecionadosParaCompra,
        setUsuarioLogado,
        setListaComTodosEstados,
        setListaComTodosPaises,
        setListaComTodasCategorias,
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
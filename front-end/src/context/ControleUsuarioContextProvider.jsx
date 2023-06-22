import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ControleUsuarioContext = createContext({})

export function ControleUsuarioContextProvider ({ children }) {
    const [usuario, setUsuario] = useState({})

  return (
    <ControleUsuarioContext.Provider
      value={{
        usuario,
        setUsuario
      }}
    >
      {children}
    </ControleUsuarioContext.Provider>
  )
}

ControleUsuarioContextProvider.propTypes = {
    children: PropTypes.element.isRequired
}
import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ControleUsuarioContext = createContext({})

export function ControleUsuarioContextProvider ({ children }) {
    const [loggedUser, setLoggedUser] = useState({})
    const [countriesList, setCountriesList] = useState([])
    const [statesList, setStatesList] = useState([])

  return (
    <ControleUsuarioContext.Provider
      value={{
        loggedUser,
        statesList,
        countriesList,
        setLoggedUser,
        setStatesList,
        setCountriesList
      }}
    >
      {children}
    </ControleUsuarioContext.Provider>
  )
}

ControleUsuarioContextProvider.propTypes = {
    children: PropTypes.element.isRequired
}
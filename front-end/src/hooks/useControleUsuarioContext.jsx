import { useContext } from 'react'
import { ControleUsuarioContext } from '../context/ControleUsuarioContextProvider'

export function useControleUsuarioContext () {
  const context = useContext(ControleUsuarioContext)

  return context
}
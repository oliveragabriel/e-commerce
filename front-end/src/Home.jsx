import { Carousel, message } from "antd"
import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"
import { CardDeProduto } from "./components/CardParaProduto/CardDeProduto"
import { useControleUsuarioContext } from "./hooks/useControleUsuarioContext"

export const Home = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuarioLogado } = useControleUsuarioContext()
  const [loading, setLoading] = useState(false)
  const [listaComTodosProdutos, setListaComTodosProdutos] = useState([])

  const getListaProdutos = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/produto`)
      setListaComTodosProdutos(response.data)
    } catch (error) {
      messageApi.error('Não foi possível buscar a lista de categorias.')
    } finally {
      setLoading(false)
    }
  }, [messageApi])

  const handleAdicionarProdutoComoFavorito = useCallback(async (idProduto) => {
    try {
      setLoading(true)
      const response = await axios.post(`http://localhost:3003/favoritos/${idProduto}/usuario/${usuarioLogado.id}`)
      messageApi.success(response?.data?.message)
    } catch (error) {
      messageApi.error('Erro ao salvar o produto como favorito.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuarioLogado.id])

  const renderCardPorProduto = useMemo(() => {
    return listaComTodosProdutos?.map((p, idx) => {
      return (
        <CardDeProduto 
          key={idx} 
          p={{...p, produto: p.nome}} 
          idx={idx} 
          fvt={
            usuarioLogado?.id 
            ? () => handleAdicionarProdutoComoFavorito(p.id)
            : () => messageApi.error('Não é possível favoritar um produto sem estar logado.')
          } 
        />
      )
    })
  }, [handleAdicionarProdutoComoFavorito, listaComTodosProdutos, messageApi, usuarioLogado?.id])

  useEffect(() => {
    getListaProdutos()
  }, [getListaProdutos])
  
  return (
      <div style={{ margin: 8, padding: 16 }}>
        {contextHolder}
        <Carousel>
        </Carousel>
        <div style={{ display: 'flex', columnGap: '10px', overflow: 'auto' }}>
          {renderCardPorProduto}
        </div>
      </div>
  )
}
import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Row, Col, message } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { Typography } from 'antd'
import { CardDeProduto } from './components/CardParaProduto/CardDeProduto'
import { SkeletonCardParaProduto } from './components/SkeletonCardParaProduto/SkeletonCardParaProduto'

const { Title } = Typography

export const MeusFavoritos = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuarioLogado } = useControleUsuarioContext()

  const [loading, setLoading] = useState(false)
  const [favoritos, setFavoritos] = useState([])

  const getFavoritosPorUsuario = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/favoritos/${usuarioLogado.id}`)
      if (response?.data?.length > 0) {
        const resultadoListaDeFavoritos = response.data
        setFavoritos(resultadoListaDeFavoritos)
      }
    } catch (error) {
      messageApi.error('Não foi possível encontrar os produtos favoritos do usuário.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuarioLogado.id])

  const deleteProdutoDosFavoritos = useCallback(async (idProduto) => {
    try {
      setLoading(true)
      await axios.delete(`http://localhost:3003/favoritos/${idProduto}`)
      const favoritosFiltrados = favoritos.filter((f) => f.id !== idProduto)
      setFavoritos(favoritosFiltrados)
    } catch (error) {
      messageApi.error('Não foi possível remover o produto da lista de favoritos.')
    } finally {
      setLoading(false)
    }
  }, [favoritos, messageApi])

  const renderCardPorProduto = useMemo(() => {
    if (loading) {
      return Array.from(Array(6)).map((_, index) =>
        <SkeletonCardParaProduto key={index} />
      )
    }
    return favoritos.map((p, idx) => {
      return (
        <CardDeProduto key={idx} p={p} idx={idx} dlt={deleteProdutoDosFavoritos} />
      )
    })
  }, [loading, favoritos, deleteProdutoDosFavoritos])

  useEffect(() => {
    getFavoritosPorUsuario()
  }, [getFavoritosPorUsuario])
  

  return (
    <div style={{ minHeight: '86.1vh', marginTop: '52px', padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
      <Row gutter={[24,24]}>
        <Col span={24}>
          <Title level={3}>Meus favoritos</Title>
        </Col>
        <Col span={24}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '10px', columnGap: '10px', margin: '0px 16px', paddingBottom: 10 }}>
            {renderCardPorProduto}
          </div>
        </Col>
      </Row>
    </div>
  )
}
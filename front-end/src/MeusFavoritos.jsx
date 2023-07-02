import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Row, Col, message, Button, Table } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { Typography } from 'antd';
import { DeleteFilled } from '@ant-design/icons'
import { converteValorInteiroParaValorMonetario } from './functions'
import { CardDeProduto } from './components/CardParaProduto/CardDeProduto';

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

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'produto',
      key: 'produto'
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao'
    },
    {
      title: 'Categoria',
      dataIndex: 'tipo',
      key: 'tipo'
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (text) => {
        return (
          <div>
            R$ {converteValorInteiroParaValorMonetario(text)}
          </div>
        )
      }
    },
    {
      title: 'Ações',
      key: 'acoes',
      align: 'center',
      render: (record) => {
        return (
          <Row gutter={8} justify='center'>
            <Col>
              <Button 
                type="text"
                title="Remover"
                icon={<DeleteFilled style={{color: '#ff4d4f'}} />}  
                onClick={() => deleteProdutoDosFavoritos(record.id)}
              />
            </Col>
          </Row>
        )
      }
    }
  ]

  const renderCardPorProduto = useMemo(() => {
    return favoritos.map((p, idx) => {
      return (
        <CardDeProduto key={idx} p={p} idx={idx} dlt={deleteProdutoDosFavoritos} />
      )
    })
  }, [favoritos, deleteProdutoDosFavoritos])

  useEffect(() => {
    getFavoritosPorUsuario()
  }, [getFavoritosPorUsuario])
  

  return (
    <div style={{ margin: 8, padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
      <Row gutter={[24,24]}>
        <Col span={24}>
          <Title level={3}>Meus favoritos</Title>
        </Col>
        <Col style={{ display: 'flex', columnGap: '10px' }}>
          {renderCardPorProduto}
        </Col>
        <Col span={24}>
          <Table
            rowKey={'id'}
            loading={loading}
            columns={columns}
            dataSource={favoritos}
          />
        </Col>
      </Row>
    </div>
  )
}
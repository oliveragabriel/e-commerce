import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, message, Button, Table } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { Typography } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { formatarValorMonetario } from './functions';

const { Title } = Typography;

export const MeusFavoritos = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuario } = useControleUsuarioContext()

  const [loading, setLoading] = useState(false)
  const [favoritos, setFavoritos] = useState([])

  const getFavoritosPorUsuario = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/favoritos/${usuario.id}`)
      if (response?.data?.result?.length > 0) {
        const resultadoListaDeFavoritos = response.data.result
        setFavoritos(resultadoListaDeFavoritos)
      }
    } catch (error) {
      messageApi.error('Não foi possível encontrar os produtos favoritos do usuário.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuario.id])

  const deleteProdutoDosFavoritos = useCallback(async (idProduto) => {
    try {
      setLoading(true)
      await axios.delete(`http://localhost:3003/favoritos/${usuario.id}/${idProduto}`)
      const favoritosFiltrados = favoritos.filter((f) => f.id !== idProduto)
      setFavoritos(favoritosFiltrados)
    } catch (error) {
      messageApi.error('Não foi possível remover o produto da lista de favoritos.')
    } finally {
      setLoading(false)
    }
  }, [favoritos, messageApi, usuario.id])

  const columns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome'
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao'
    },
    {
      title: 'Tipo',
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
            R$ {formatarValorMonetario(text)}
          </div>
        )
      }
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (record) => {
        return (
          <Row gutter={8} justify='center'>
            <Col>
              <Button 
                type="text"
                title="Excluir"
                icon={<DeleteFilled style={{color: '#ff4d4f'}} />}  
                onClick={() => deleteProdutoDosFavoritos(record)}
              />
            </Col>
          </Row>
        )
      }
    }
  ]

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
          <Col span={24}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={favoritos}
            />
          </Col>
        </Row>
    </div>
  )
}
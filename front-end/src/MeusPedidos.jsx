import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, message, Table, Typography } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { converteValorInteiroParaValorMonetario } from './functions'
const { Title } = Typography

export const MeusPedidos = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuarioLogado } = useControleUsuarioContext()

  const [loading, setLoading] = useState(false)
  const [pedidos, setPedidos] = useState([])

  const columns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Categoria',
      dataIndex: 'tipo',
      key: 'tipo'
    },
    {
      title: 'Produto',
      dataIndex: 'nome',
      key: 'nome'
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao'
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
    }
  ]

  const getPedidosPorUsuario = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/compras/${usuarioLogado.id}`)
      if (response?.data?.result?.length > 0) {
        const resultadoListaDePedidos = response.data.result
        setPedidos(resultadoListaDePedidos)
      }
    } catch (error) {
      messageApi.error('Não foi possível encontrar o histórico de pedidos do usuário.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuarioLogado.id])

  useEffect(() => {
    getPedidosPorUsuario()
  }, [getPedidosPorUsuario])
  
  return (
    <div style={{ margin: 8, padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
      <Row gutter={[24,24]}>
        <Col span={24}>
          <Title level={3}>Meus pedidos</Title>
        </Col>
        <Col span={24}>
          <Table
            rowKey={'id'}
            loading={loading}
            columns={columns}
            dataSource={pedidos}
          />
        </Col>
      </Row>
    </div>
  )
}
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, message, Button, Table } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

const { Title } = Typography;

export const MeusEnderecos = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuario } = useControleUsuarioContext()

  // eslint-disable-next-line no-unused-vars
  const [exibirTelaParaAdicionarEndereco, setExibirTelaParaAdicionarEndereco] = useState(false)

  const [loading, setLoading] = useState(false)
  const [addresses, setAddresses] = useState([])

  const columns = [
    {
      title: 'Rua',
      dataIndex: 'rua',
      key: 'rua'
    },
    {
      title: 'Número',
      dataIndex: 'numero',
      key: 'numero'
    },
    {
      title: 'Complemento',
      dataIndex: 'complemento',
      key: 'complemento'
    },
    {
      title: 'Bairro',
      dataIndex: 'bairro',
      key: 'bairro'
    },
    {
      title: 'Cidade',
      dataIndex: 'cidade',
      key: 'cidade'
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado'
    },
    {
      title: 'País',
      dataIndex: 'pais',
      key: 'pais'
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (record) => {
        console.log(record)
        return (
          <Row gutter={8} justify='center'>
            <Col>
              <Button
                type="text"
                title="Editar"
                icon={<EditFilled style={{color: '#1677ff'}} />} 
                onClick={() => {}}
              />
            </Col>
            <Col>
              <Button 
                type="text"
                title="Excluir"
                icon={<DeleteFilled style={{color: '#ff4d4f'}} />}  
                onClick={() => {}}
              />
            </Col>
          </Row>
        )
      }
    }
  ]

  const getUserAddresses = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/usuario/${usuario.id}/endereco`)
      if (response?.data?.result?.length > 0) {
        const usuario = response.data.result
        setAddresses(usuario)
      }
    } catch (error) {
      messageApi.error('Não foi possível encontrar os endereços do usuário.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuario.id])

  useEffect(() => {
    getUserAddresses()
  }, [getUserAddresses])
  

  return (
    <div style={{ margin: 8, padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
        <Row gutter={[24,24]}>
          <Col span={24}>
            <Title level={3}>Meus endereços</Title>
          </Col>
          <Col span={24}>
            <Button 
              style={{  marginRight: 6 }}
              type='primary'
              disabled={loading}
              onClick={() => setExibirTelaParaAdicionarEndereco(true)}
            >
              Adicionar Endereço
            </Button>
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={addresses}
            />
          </Col>
        </Row>
    </div>
  )
}
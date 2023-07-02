import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, message, Button, Table } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { ModalGerenciarEndereco } from './Modal/GerenciarEndereco/GerenciarEndereco';

const { Title } = Typography;

export const MeusEnderecos = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuarioLogado } = useControleUsuarioContext()

  const [exibirTelaParaAdicionarEndereco, setExibirTelaParaAdicionarEndereco] = useState(false)

  const [loading, setLoading] = useState(false)
  const [enderecos, setEnderecos] = useState([])
  const [enderecoSendoEditado, setEnderecoSendoEditado] = useState(undefined)

  const handleModalEndereco = useCallback(async (endereco) => {
    setEnderecoSendoEditado(endereco)
    setExibirTelaParaAdicionarEndereco(true)
  }, [])

  const deleteEnderecoDoUsuario = useCallback(async (idEndereco) => {
    try {
      setLoading(true)
      await axios.delete(`http://localhost:3003/usuario/${usuarioLogado.id}/endereco/${idEndereco}`)
      const enderecosFiltrados = enderecos.filter((f) => f.id !== idEndereco)
      setEnderecos(enderecosFiltrados)
    } catch (error) {
      messageApi.error('Não foi possível remover o produto da lista de favoritos.')
    } finally {
      setLoading(false)
    }
  }, [enderecos, messageApi, usuarioLogado.id])

  const columns = [
    {
      title: 'Rua',
      dataIndex: 'rua',
      key: 'rua'
    },
    {
      title: 'Nº',
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
      align: 'center',
      render: (record) => {
        return (
          <Row gutter={8} justify='center'>
            <Col>
              <Button
                type="text"
                title="Editar"
                icon={<EditFilled style={{color: '#1677ff'}} />} 
                onClick={() => handleModalEndereco(record)}
              />
            </Col>
            <Col>
              <Button 
                type="text"
                title="Excluir"
                icon={<DeleteFilled style={{color: '#ff4d4f'}} />}  
                onClick={() => deleteEnderecoDoUsuario(record.id)}
              />
            </Col>
          </Row>
        )
      }
    }
  ]

  const getEnderecoPorUsuario = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/usuario/${usuarioLogado.id}/endereco`)
      if (response?.data?.result?.length > 0) {
        const usuario = response.data.result
        setEnderecos(usuario)
      }
    } catch (error) {
      messageApi.error('Não foi possível encontrar os endereços do usuário.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuarioLogado.id])

  useEffect(() => {
    getEnderecoPorUsuario()
  }, [getEnderecoPorUsuario, exibirTelaParaAdicionarEndereco])
  

  return (
    <div style={{ marginTop: '52px', padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
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
            onClick={() => handleModalEndereco()}
          >
            Adicionar Endereço
          </Button>
          <ModalGerenciarEndereco
            address={enderecoSendoEditado}
            visible={exibirTelaParaAdicionarEndereco} 
            closeFn={() => setExibirTelaParaAdicionarEndereco(false)}
          />
        </Col>
        <Col span={24}>
          <Table
            rowKey={'id'}
            loading={loading}
            columns={columns}
            dataSource={enderecos}
          />
        </Col>
      </Row>
    </div>
  )
}
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, message, Button, Table } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { ModalGerenciarCartao } from './Modal/GerenciarCartao/GerenciarCartao';

const { Title } = Typography;

export const MeusCartoes = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuarioLogado } = useControleUsuarioContext()

  const [exibirTelaParaAdicionarCartao, setExibirTelaParaAdicionarCartao] = useState(false)
  const [acaoRealizadaNaPagina, setAcaoRealizadaNaPagina] = useState([])
  const [cartaoSendoEditado, setCartaoSendoEditado] = useState()

  const [loading, setLoading] = useState(false)
  const [cartoes, setCartoes] = useState([])

  const columns = [
    {
      title: 'Bandeira',
      dataIndex: 'bandeira',
      key: 'bandeira'
    },
    {
      title: 'Número',
      dataIndex: 'numero',
      key: 'numero'
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome'
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
                title="Editar"
                icon={<EditFilled style={{color: '#1677ff'}} />} 
                onClick={() => {
                  setCartaoSendoEditado(record)
                  setAcaoRealizadaNaPagina('edit')
                }}
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

  const getCartoesPorUsuario = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/usuario/${usuarioLogado.id}/endereco`)
      if (response?.data?.result?.length > 0) {
        const usuario = response.data.result
        setCartoes(usuario)
      }
    } catch (error) {
      messageApi.error('Não foi possível encontrar os endereços do usuário.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuarioLogado.id])

  useEffect(() => {
    getCartoesPorUsuario()
  }, [getCartoesPorUsuario])
  

  return (
    <div style={{ minHeight: '86.1vh', marginTop: '52px', padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
        <Row gutter={[24,24]}>
          <Col span={24}>
            <Title level={3}>Meus cartões</Title>
          </Col>
          <Col span={24}>
            <ModalGerenciarCartao
              action={acaoRealizadaNaPagina}
              card={cartaoSendoEditado}
              visible={exibirTelaParaAdicionarCartao} 
              closeFn={() => setExibirTelaParaAdicionarCartao(false)}
              openLg={() => setExibirTelaParaAdicionarCartao(true)}
            />
            <Button 
              style={{  marginRight: 6 }}
              type='primary'
              onClick={() => {
                setAcaoRealizadaNaPagina('add')
                setExibirTelaParaAdicionarCartao(true)
              }}
            >
              Adicionar Cartão
            </Button>
          </Col>
          <Col span={24}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={cartoes}
            />
          </Col>
        </Row>
    </div>
  )
}
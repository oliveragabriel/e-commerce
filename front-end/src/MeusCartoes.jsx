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

  const [exibirTelaParaGerenciarCartao, setExibirTelaParaGerenciarCartao] = useState(false)
  const [acaoRealizadaNaPagina, setAcaoRealizadaNaPagina] = useState('')
  const [cartaoSendoEditado, setCartaoSendoEditado] = useState()

  const [loading, setLoading] = useState(false)
  const [cartoes, setCartoes] = useState([])

  const deleteCartaoDoUsuario = useCallback(async (idCartao) => {
    try {
      setLoading(true)
      await axios.delete(`http://localhost:3003/cartao/${idCartao}`)
      const cartoesFiltrados = cartoes.filter((c) => c.id !== idCartao)
      setCartoes(cartoesFiltrados)
    } catch (error) {
      messageApi.error('Não foi possível remover o cartão do usuário.')
    } finally {
      setLoading(false)
    }
  }, [cartoes, messageApi])

  const columns = [
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
      title: 'Data de Validade',
      dataIndex: 'validade',
      key: 'validade',
      width: '15%'
    },
    {
      title: 'Ações',
      key: 'acoes',
      width: '10%',
      align: 'center',
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
                  setExibirTelaParaGerenciarCartao(true)
                }}
              />
            </Col>
            <Col>
              <Button 
                type="text"
                title="Excluir"
                icon={<DeleteFilled style={{color: '#ff4d4f'}} />}  
                onClick={() => deleteCartaoDoUsuario(record.id)}
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
      const response = await axios.get(`http://localhost:3003/cartao/${usuarioLogado.id}`)
      setCartoes(response.data)
    } catch (error) {
      messageApi.error('Não foi possível encontrar os cartões do usuário.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuarioLogado.id])

  useEffect(() => {
    getCartoesPorUsuario()
  }, [getCartoesPorUsuario, exibirTelaParaGerenciarCartao])
  

  return (
    <div style={{ minHeight: '75.9vh', marginTop: '52px', padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
        <Row gutter={[24,24]}>
          <Col span={24}>
            <Title level={3}>Meus cartões</Title>
          </Col>
          <Col span={24}>
            <ModalGerenciarCartao
              card={cartaoSendoEditado}
              action={acaoRealizadaNaPagina}
              visible={exibirTelaParaGerenciarCartao} 
              closeFn={() => setExibirTelaParaGerenciarCartao(false)}
              openLg={() => setExibirTelaParaGerenciarCartao(true)}
            />
            <Button 
              style={{  marginRight: 6 }}
              type='primary'
              onClick={() => {
                setAcaoRealizadaNaPagina('add')
                setExibirTelaParaGerenciarCartao(true)
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
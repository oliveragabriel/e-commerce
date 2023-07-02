import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, message, Button, Table } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { converteValorInteiroParaValorMonetario } from './functions'
import { ModalGerenciarProduto } from './Modal/GerenciarProduto/GerenciarProduto'

const { Title } = Typography;

export const GerenciarProdutos = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuarioLogado } = useControleUsuarioContext()

  const [exibirTelaParaGerenciarProduto, setExibirTelaParaGerenciarProduto] = useState(false)

  const [loading, setLoading] = useState(false)
  const [produtos, setProdutos] = useState([])
  const [produtoSendoEditado, setProdutoSendoEditado] = useState(undefined)

  const handleModalProduto = useCallback(async (endereco) => {
    setProdutoSendoEditado(endereco)
    setExibirTelaParaGerenciarProduto(true)
  }, [])

  const deleteProduto = useCallback(async (idEndereco) => {
    try {
      setLoading(true)
      await axios.delete(`http://localhost:3003/usuario/${usuarioLogado.id}/endereco/${idEndereco}`)
      const produtosFiltrados = produtos.filter((f) => f.id !== idEndereco)
      setProdutos(produtosFiltrados)
    } catch (error) {
      messageApi.error('Não foi possível remover o produto da lista de favoritos.')
    } finally {
      setLoading(false)
    }
  }, [produtos, messageApi, usuarioLogado.id])

  const columns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id'
    },
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
                title="Editar"
                icon={<EditFilled style={{color: '#1677ff'}} />} 
                onClick={() => handleModalProduto(record)}
              />
            </Col>
            <Col>
              <Button 
                type="text"
                title="Excluir"
                icon={<DeleteFilled style={{color: '#ff4d4f'}} />}  
                onClick={() => deleteProduto(record.id)}
              />
            </Col>
          </Row>
        )
      }
    }
  ]

  const getListaProdutosCadastradosPorUsuario = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/usuario/${usuarioLogado.id}/endereco`)
      if (response?.data?.result?.length > 0) {
        const produtos = response.data.result
        setProdutos(produtos)
      }
    } catch (error) {
      messageApi.error('Não foi possível encontrar os endereços do usuário.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuarioLogado.id])

  useEffect(() => {
    getListaProdutosCadastradosPorUsuario()
  }, [getListaProdutosCadastradosPorUsuario, exibirTelaParaGerenciarProduto])
  

  return (
    <div style={{ margin: 8, padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
      <Row gutter={[24,24]}>
        <Col span={24}>
          <Title level={3}>Gerenciar Produtos</Title>
        </Col>
        <Col span={24}>
          <Button 
            style={{  marginRight: 6 }}
            type='primary'
            disabled={loading}
            onClick={() => handleModalProduto()}
          >
            Adicionar Produto
          </Button>
          <ModalGerenciarProduto
            product={produtoSendoEditado}
            visible={exibirTelaParaGerenciarProduto} 
            closeFn={() => setExibirTelaParaGerenciarProduto(false)}
          />
        </Col>
        <Col span={24}>
          <Table
            rowKey={'id'}
            loading={loading}
            columns={columns}
            dataSource={produtos}
          />
        </Col>
      </Row>
    </div>
  )
}
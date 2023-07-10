import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Row, Col, message, Button, Table, Image } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { converteValorInteiroParaValorMonetario, recortaTextoParaExibirCompactado } from './functions'
import { ModalAdicionarProduto } from './Modal/GerenciarProduto/Adicionar/AdicionarProduto'
import { ModalEditarProduto } from './Modal/GerenciarProduto/Editar/EditarProduto';

const { Title } = Typography;

export const GerenciarProdutos = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuarioLogado } = useControleUsuarioContext()

  const [exibirTelaParaAdicionarProduto, setExibirTelaParaAdicionarProduto] = useState(false)
  const [exibirTelaParaEditarProduto, setExibirTelaParaEditarProduto] = useState(false)

  const [loading, setLoading] = useState(false)
  const [produtos, setProdutos] = useState([])
  const [produtoSendoEditado, setProdutoSendoEditado] = useState()

  const deleteProduto = useCallback(async (idProduto) => {
    try {
      setLoading(true)
      await axios.delete(`http://localhost:3003/produto/${idProduto}`)
      const produtosFiltrados = produtos.filter((f) => f.id !== idProduto)
      setProdutos(produtosFiltrados)
    } catch (error) {
      messageApi.error('Não foi possível remover o produto da lista de favoritos.')
    } finally {
      setLoading(false)
    }
  }, [produtos, messageApi])

  const columns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id'
    },
    {
      dataIndex: 'foto',
      key: 'foto',
      width: 100,
      render: (text) => <Image height={40} src={text} /> 
    },
    {
      title: 'Nome',
      dataIndex: 'produto',
      key: 'produto'
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      width: '50%',
      render: (text) => recortaTextoParaExibirCompactado(text, 225)
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
                onClick={() => {
                  setProdutoSendoEditado(record)
                  setExibirTelaParaEditarProduto(true)
                }}
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
      const response = await axios.get(`http://localhost:3003/produto/usuario/${usuarioLogado.id}`)
      if (response?.data?.length > 0) {
        setProdutos(response.data)
      }
    } catch (error) {
      messageApi.error('Não foi possível encontrar os endereços do usuário.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, usuarioLogado.id])

  const renderModalEditar = useMemo(() => {
    if (produtoSendoEditado) {
      return (
        <ModalEditarProduto
          idProduto={produtoSendoEditado?.id}
          visible={exibirTelaParaEditarProduto} 
          closeFn={() => {
            setProdutoSendoEditado()
            setExibirTelaParaEditarProduto(false)
          }}
        />
      )
    }
    return null
  }, [exibirTelaParaEditarProduto, produtoSendoEditado])

  useEffect(() => {
    getListaProdutosCadastradosPorUsuario()
  }, [getListaProdutosCadastradosPorUsuario, exibirTelaParaAdicionarProduto, exibirTelaParaEditarProduto])

  return (
    <div style={{ minHeight: '75.9vh',  marginTop: '52px', padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
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
            onClick={() => setExibirTelaParaAdicionarProduto(true)}
          >
            Adicionar Produto
          </Button>
          <ModalAdicionarProduto
            visible={exibirTelaParaAdicionarProduto} 
            closeFn={() => setExibirTelaParaAdicionarProduto(false)}
          />
          {renderModalEditar}
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
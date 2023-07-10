import axios from 'axios'
import { Divider, Image, Steps, Typography } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Row, Col, message, Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { converteValorInteiroParaValorMonetario, recortaTextoParaExibirCompactado } from './functions'

const { Title } = Typography

export const MinhaCompra = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { usuarioLogado, produtosSelecionadosParaCompra, setProdutosSelecionadosParaCompra } = useControleUsuarioContext()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [cartoes, setCartoes] = useState([])
  const [enderecos, setEnderecos] = useState([])

  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const rowSelection = {
    hideSelectAll: true,
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectMultiple: () => {
      messageApi.error('Selecione apenas 1 cartão para finalizar a compra.')
    }
  }

  const removeProdutoSelecionadoParaCompra = useCallback((idProduto) => {
    const listaSemProdutoRemovido = produtosSelecionadosParaCompra.filter((p) => p.id !== idProduto)
    setProdutosSelecionadosParaCompra(listaSemProdutoRemovido)
  }, [produtosSelecionadosParaCompra, setProdutosSelecionadosParaCompra])

  const resultadoSomaTodosProdutos = useMemo(() => {
    const valorTotalParaPedido = produtosSelecionadosParaCompra.reduce(
      (acumulador, produto) => acumulador + produto.valor, 0
    )
    return converteValorInteiroParaValorMonetario(valorTotalParaPedido)
  }, [produtosSelecionadosParaCompra])

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
    getCartoesPorUsuario()
    getEnderecoPorUsuario()
  }, [getCartoesPorUsuario, getEnderecoPorUsuario])
  
  return (
    <div style={{ minHeight: '86.1vh', marginTop: '52px', padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
        <Row gutter={[24,24]}>
          <Col span={24}>
            <Title level={3}>Minha Compra</Title>
          </Col>
          <Col span={24}>
          <Steps
            current={0}
            direction="vertical"
            items={[
              {
                title: 'Escolha o endereço para a entrega',
                description: (
                  <Table
                    rowKey='id'
                    rowSelection={{ ...rowSelection }}
                    loading={loading}
                    columns={[
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
                        key: 'bairro',
                        width: '15%'
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
                      }
                    ]}
                    dataSource={enderecos}
                    pagination={false}
                    footer={() => (
                        <Button
                          onClick={() => navigate('/enderecos')}
                        >
                          Gerenciar endereços
                        </Button>
                      )
                    }
                  />
                ),
              },
              {
                title: 'Escolha o cartão para cobrança',
                description: (
                  <Table
                    rowKey='id'
                    rowSelection={{ ...rowSelection }}
                    loading={loading}
                    columns={[
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
                      }
                    ]}
                    dataSource={cartoes}
                    pagination={false}
                    footer={() => (
                      <Button
                        onClick={() => navigate('/cartoes')}
                      >
                        Gerenciar cartões
                      </Button>
                    )
                  }
                  />
                  ),
              },
              {
                title: 'Confira a lista de produtos selecionados',
                description: (
                  <Table
                    rowKey='id'
                    loading={loading}
                    columns={[
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
                            <Row justify='center'>
                              <Col>
                                <Button 
                                  type="text"
                                  title="Remover do Carrinho"
                                  icon={<DeleteFilled style={{color: '#ff4d4f'}} />}  
                                  onClick={() => removeProdutoSelecionadoParaCompra(record.id)}
                                />
                              </Col>
                            </Row>
                          )
                        }
                      }
                    ]}
                    dataSource={produtosSelecionadosParaCompra}
                    pagination={false}
                    footer={() => (
                        <div style={{ display: 'flex' }}>
                          <div style={{ fontWeight: 600 }}>Valor Total da Compra:</div>
                          <div style={{ marginLeft: 14 }}>R$ {resultadoSomaTodosProdutos}</div>
                        </div>
                      )
                    }
                  />
                )
              }
            ]}
          />
          </Col>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                size='large'
                type='primary'
                onClick={() => navigate('/cartoes')}
              >
                Confirmar compra
              </Button>
            </div>
          </Col>
        </Row>
    </div>
  )
}
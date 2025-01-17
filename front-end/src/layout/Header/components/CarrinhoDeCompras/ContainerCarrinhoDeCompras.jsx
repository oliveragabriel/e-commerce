import { useMemo } from "react"
import { useNavigate } from 'react-router-dom'
import { Button, Col, message, Row } from "antd"
import { useControleUsuarioContext } from "../../../../hooks/useControleUsuarioContext"
import { ContainerProdutoSelecionado } from "./ContainerProdutoSelecionado"
import { converteValorInteiroParaValorMonetario } from "../../../../functions";

export const ContainerCarrinhoDeCompras = () => {
    const { produtosSelecionadosParaCompra, usuarioLogado } = useControleUsuarioContext()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
  
    const resultadoSomaTodosProdutos = useMemo(() => {
      const valorTotalParaPedido = produtosSelecionadosParaCompra.reduce(
        (acumulador, produto) => acumulador + produto.valor, 0
      )
      return converteValorInteiroParaValorMonetario(valorTotalParaPedido)
    }, [produtosSelecionadosParaCompra])
  
    if (produtosSelecionadosParaCompra.length === 0) {
      return <div>Nenhum produto selecionado.</div>
    }
  
    return (
      <Row className="carrinho-de-compras" style={{ width: 295 }}>
        {contextHolder}
        <Col span={24}>
          {produtosSelecionadosParaCompra.map((produto, index) => (
            <ContainerProdutoSelecionado
              key={index}
              index={index}
              produto={produto}
            />
          ))}
        </Col>
        <Col span={24} style={{ display: 'flex' }}>
          <div style={{ fontWeight: 600 }}>Valor Total da Compra:</div>
          <div style={{ marginLeft: 14 }}>R$ {resultadoSomaTodosProdutos}</div>
        </Col>
        <Col span={24} style={{ margin: '12px' }}>
          <Button type='primary' style={{ width: 268 }} onClick={() => usuarioLogado.id ? navigate('finalizar-compra') : messageApi.error('Para concluir um pedido você precisa estar logado.')}>
            Concluir Pedido
          </Button>
        </Col>
      </Row>
    );
  };
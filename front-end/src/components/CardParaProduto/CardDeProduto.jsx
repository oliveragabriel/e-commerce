import { Button, Card, message } from "antd"
import { converteValorInteiroParaValorMonetario, recortaTextoParaExibirCompactado } from "../../functions"
import { CardImagemContainer } from "./CardImagemContainer"
import PropTypes from 'prop-types'
import { useControleUsuarioContext } from "../../hooks/useControleUsuarioContext"
import { useCallback } from "react"

const { Meta } = Card

export const CardDeProduto = ({ p, idx, dlt, fvt }) => {
  const { produtosSelecionadosParaCompra, setProdutosSelecionadosParaCompra } = useControleUsuarioContext()
  const [messageApi, contextHolder] = message.useMessage()

  const handleAdicionaParaCarrinhoDeCompra = useCallback(() => {
    const produtoJaFoiSelecionado = produtosSelecionadosParaCompra.filter((pdt) => pdt.id === (p.idProduto ?? p.id))
    if (produtoJaFoiSelecionado) {
      return messageApi.error('O produto já está favoritado.')
    } else {
      const produtosSelecionadosAntes = produtosSelecionadosParaCompra
      const novaListaProdutosSelecionados = [ ...produtosSelecionadosAntes, { ...p, id: p.idProduto ?? p.id, nome: p.produto } ]
      setProdutosSelecionadosParaCompra(novaListaProdutosSelecionados)
    }
  }, [messageApi, p, produtosSelecionadosParaCompra, setProdutosSelecionadosParaCompra])
  
  return (
    <Card
      hoverable
      key={idx}
      style={{ width: 274 }}p
      cover={<CardImagemContainer p={p} dlt={dlt} fvt={fvt} />}
    >
      <Meta 
        title={recortaTextoParaExibirCompactado(p.produto, 19)} 
        description={
          <div className='description' style={{ height: 132 }}>
            {recortaTextoParaExibirCompactado(p.descricao, 114)}
          </div>
        } 
      />
      {contextHolder}
      <div 
        style={{ 
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
          fontSize: '16px',
          fontWeight: 600 
        }}
      >
        <p>R$ {converteValorInteiroParaValorMonetario(p.valor)}</p>
      </div>
      <div style={{ marginTop: 16 }}>
        <Button 
          type='primary'
          style={{ width:  '100%' }}
          onClick={handleAdicionaParaCarrinhoDeCompra}
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </Card>   
  )
}

CardDeProduto.propTypes = {
  p: PropTypes.any.isRequired,
  idx: PropTypes.number.isRequired,
  dlt: PropTypes.func,
  fvt: PropTypes.func
}
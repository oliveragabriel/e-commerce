import PropTypes from 'prop-types'
import { DeleteFilled } from "@ant-design/icons"
import { Button, Col, Row } from "antd"
import { converteValorInteiroParaValorMonetario, verificaTamanhoStringParaSubstituirPorTresPontos } from "../../../../functions"
import { useControleUsuarioContext } from '../../../../hooks/useControleUsuarioContext'
import { useCallback } from 'react'
import { styled } from 'styled-components'

const StyledCol = styled(Col)`
  display: flex; 
  align-items: center;
`

export const ContainerProdutoSelecionado = ({ produto, index }) => {
  const { produtosSelecionadosParaCompra, setProdutosSelecionadosParaCompra } = useControleUsuarioContext()
  console.log("🚀 ~ ContainerProdutoSelecionado ~ produtosSelecionadosParaCompra:", produtosSelecionadosParaCompra)
  const { nome, valor, id } = produto
  console.log("🚀 ~ ContainerProdutoSelecionado ~ produto:", produto)

  const removeProdutoSelecionadoParaCompra = useCallback(() => {
    const listaSemProdutoRemovido = produtosSelecionadosParaCompra.filter((p) => p.id !== id)
    setProdutosSelecionadosParaCompra(listaSemProdutoRemovido)
  }, [id, produtosSelecionadosParaCompra, setProdutosSelecionadosParaCompra])

  return (
    <Row 
      key={index}
      className='container-produto-selecionado'
      justify='space-between' 
      style={{ borderBottom: '1px solid rgb(216, 220, 214)', margin: '8px 0px', padding: '10px 0px' }}
    >
      <Col>
        <div style={{ width: 156 }}>
          {verificaTamanhoStringParaSubstituirPorTresPontos(nome)}
        </div>
      </Col>
      <StyledCol>
        R$ {converteValorInteiroParaValorMonetario(valor)}
      </StyledCol>
      <StyledCol>
        <Button type='text' title='Remover' onClick={removeProdutoSelecionadoParaCompra}>
          <DeleteFilled style={{ color: '#ff4d4f' }} />
        </Button>
      </StyledCol>
    </Row>
  )
}

ContainerProdutoSelecionado.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    valor: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
}

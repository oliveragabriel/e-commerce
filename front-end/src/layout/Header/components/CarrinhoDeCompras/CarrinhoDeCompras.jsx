import { Badge, Button, Popover, Tooltip } from "antd"
import { useMemo } from "react"
import { RiShoppingCart2Fill } from "react-icons/ri"
import { useControleUsuarioContext } from "../../../../hooks/useControleUsuarioContext"
import { ContainerCarrinhoDeCompras } from "./ContainerCarrinhoDeCompras"

export const CarrinhoDeCompras = () => {
  const { produtosSelecionadosParaCompra } = useControleUsuarioContext()

  const contagemProdutosSelecionados = useMemo(() => produtosSelecionadosParaCompra.length, [produtosSelecionadosParaCompra])

  return (
    <Popover 
      content={<ContainerCarrinhoDeCompras />} 
      trigger="click" 
      arrow={false}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center', marginLeft: 12 }}>
      <Tooltip title='Carrinho de Compras'>
        <Badge count={contagemProdutosSelecionados} style={{color: '#FFFFFF', marginTop: 4, marginRight: 10, boxShadow: 'none'}}>
          <Button type='text'>
            <RiShoppingCart2Fill style={{ fontSize: 22, color: '#FFFFFF' }}/>
          </Button>
        </Badge>
      </Tooltip>
      </div>
    </Popover>
  )
}
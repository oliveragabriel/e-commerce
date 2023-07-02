import { 
    CaretDownOutlined, 
    CreditCardOutlined,  
    HeartOutlined, 
    LogoutOutlined, 
    ShoppingOutlined, 
    UserOutlined,
    HomeOutlined
  } from '@ant-design/icons'
import { BiTransfer } from 'react-icons/bi'
import { Row, Col } from 'antd'
import { ordenarListaPorChaveNumerica } from '../../functions'

export const itemsMenu = (navigate, usuarioLogado, deslogarUsuarioDoSistema) => {
  const subItens = [
    {
      key: 1,
      label: 'Meu perfil',
      icon: <UserOutlined />,
      onClick: () => navigate('perfil')
    },
    {
      key: 2,
      label: 'Meus endereços',
      icon: <HomeOutlined />,
      onClick: () => navigate('enderecos')
    },
    {
      key: 3,
      label: 'Meus cartões',
      icon: <CreditCardOutlined />,
      onClick: () => navigate('cartoes')
    },
    {
      key: 4,
      label: 'Meus pedidos',
      icon: <BiTransfer style={{ color: '#FFFFFF' }}/>,
      onClick: () => navigate('compras')
    },
    {
      key: 5,
      label: 'Meus favoritos',
      icon: <HeartOutlined />,
      onClick: () => navigate('favoritos')
    },
    {
      key: 7,
      label: 'Sair',
      icon: <LogoutOutlined />,
      onClick: () => deslogarUsuarioDoSistema()
    }
  ]

  if (usuarioLogado.atribuicao === 1) {
    subItens.push({
      key: 6,
      label: 'Gerenciar produtos',
      icon: <ShoppingOutlined />,
      onClick: () => navigate('produtos')
    })
  }

  const subItensReordenados = ordenarListaPorChaveNumerica(subItens, 'key')

  const items = [
    {
      label: (
        <Row gutter={[8, 8]}>
          <Col>
            {`Olá, ${usuarioLogado?.nome}`}
          </Col>
          <Col>
            <CaretDownOutlined />
          </Col>
        </Row>        
      ),
      key: 'menu',
      children: subItensReordenados
    },
  ]

  return items
}
  
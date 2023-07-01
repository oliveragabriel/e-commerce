import { 
    CaretDownOutlined, 
    CreditCardOutlined,  
    HeartOutlined, 
    LogoutOutlined, 
    ShoppingOutlined, 
    UserOutlined,
    HomeOutlined
  } from '@ant-design/icons';
  import { Row, Col } from 'antd';
  
  export const itemsMenu = (navigate, loggedUser, deslogarUsuarioDoSistema) => {
    return [
      {
        label: (
          <Row gutter={[8, 8]}>
            <Col>
              {`Olá, ${loggedUser?.nome}`}
            </Col>
            <Col>
              <CaretDownOutlined />
            </Col>
          </Row>        
        ),
        key: 'Menu',
        children: [
          {
            key: 'perfil',
            label: 'Meu perfil',
            icon: <UserOutlined />,
            onClick: () => navigate('perfil')
          },
          {
            key: 'enderecos',
            label: 'Meus endereços',
            icon: <HomeOutlined />,
            onClick: () => navigate('enderecos')
          },
          {
            key: 'cartoes',
            label: 'Meus cartões',
            icon: <CreditCardOutlined />,
            onClick: () => navigate('cartoes')
          },
          {
            key: 'pedidos',
            label: 'Meus pedidos',
            icon: <ShoppingOutlined />,
            onClick: () => navigate('compras')
          },
          {
            key: 'favoritos',
            label: 'Meus favoritos',
            icon: <HeartOutlined />,
            onClick: () => navigate('favoritos')
          },
          {
            key: 'logout',
            label: 'Sair',
            icon: <LogoutOutlined />,
            onClick: () => deslogarUsuarioDoSistema()
          }
        ],
      },
    ];
  };
  
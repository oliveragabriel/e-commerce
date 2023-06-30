import { 
  CaretDownOutlined, 
  CreditCardOutlined,  
  HeartOutlined, 
  LogoutOutlined, 
  ShoppingOutlined, 
  UserOutlined,
  HomeOutlined,
  DeleteFilled
} from '@ant-design/icons'
import { Layout, Row, Col, Button, Menu, Tooltip, Input, Popover, Badge } from 'antd'
import { useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { useControleUsuarioContext } from '../../hooks/useControleUsuarioContext'
import { ModalAcessarConta } from '../../Modal/AcessarConta/ModalAcessarConta'
import { BsSunFill } from 'react-icons/bs';
import { RiMoonClearFill, RiShoppingCart2Fill } from 'react-icons/ri'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const StyledMenu = styled(Menu)`
  border-radius: 30px;
  background-color: midnightblue;
  color: #FFFFFF;
  :hover {
    color: #FFFFFF;
  }
  :active {
    color: #FFFFFF;
  }
`

export const Header = ({ systemAtDarkMode, setSystemAtDarkMode }) => {
  const { loggedUser, setLoggedUser } = useControleUsuarioContext()
  const navigate = useNavigate()

  const [exibirTelaParaAcessarConta, setExibirTelaParaAcessarConta] = useState(false)

  const items = useMemo(() => [
    {
      label: (
        <Row gutter={[8,8]}>
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
          onClick: () => {
            setLoggedUser({})
            navigate('home')
          }
        }
      ],
    }
  ], [navigate, setLoggedUser, loggedUser?.nome])

  const greetings = useMemo(() => {
    return loggedUser?.nome 
    ? (
      <StyledMenu 
        mode="horizontal" 
        items={items}
      />
    ) 
    : 'Olá, faça seu login'
  }, [items, loggedUser?.nome])

  const renderUserOptions = useMemo(() => {
    if (loggedUser?.nome) {
      return (
        <Row>
          <Col>
            <span style={{ color: '#FFFFFF' }}>
              {greetings}
            </span>
          </Col>
        </Row>
      )
    }
    return (
      <div style={{ borderRadius: '30px', backgroundColor: 'midnightblue' }} >
        <Button 
          type='text' 
          style={{ color: '#FFFFFF' }} 
          onClick={() => setExibirTelaParaAcessarConta(true)}
        >
          {greetings}
        </Button>
      </div>
    )
  }, [greetings, loggedUser?.nome])

  const themeModeStyle = systemAtDarkMode ? { height: '7vh' } : { height: '7vh', backgroundColor: '#1677ff' }

  return (
    <Layout.Header style={themeModeStyle}>
      <Row justify='end' gutter={[24,24]}>
        <Col style={{ display: 'flex' }} span={18}>
          <Row justify='space-between' style={{ display: 'flex', width: '100%' }}>
            <Col style={{ display: 'flex', alignItems: 'center', margin: '0px 12px' }}>
              <Input.Search 
                placeholder='Busque pelo produto...'
                onSearch={() => {}}
              />
            </Col>
            <Col style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
              <Button type='text' onClick={() => setSystemAtDarkMode(!systemAtDarkMode)} style={{ marginRight: 12 }}>
                {
                  systemAtDarkMode 
                  ? (
                      <Tooltip title='Light Mode'>
                        <BsSunFill style={{ fontSize: 22, color: '#FFFFFF' }}/> 
                      </Tooltip>
                  )
                  : (
                      <Tooltip title='Dark Mode'>
                        <RiMoonClearFill style={{ fontSize: 22, color: ' #FFFFFF ' }} />
                      </Tooltip>
                  )
                }
              </Button>
              <Popover 
                content={
                  <div>
                    {
                    Array.from({ length: 4 }).map((_, index) => (
                    <Row justify='space-between' key={index} style={{ borderBottom: '1px solid rgb(216, 220, 214)', margin: '8px 0px', padding: '10px 0px' }}>
                      <Col>
                        <div style={{ width: 156 }}>
                          Notebook Acer 5000 uashusahuh ashuhasuh
                        </div>
                      </Col>
                      <Col style={{ display: 'flex', alignItems: 'center' }}>
                          R$ 455.00
                      </Col>
                      <Col style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type='text' title='Remover' onClick={() => {}}>
                          <DeleteFilled style={{ color: '#ff4d4f' }} />
                        </Button>
                      </Col>
                    </Row>
                    ))
                    }
                    <div style={{ display: 'flex' }}>
                      <div style={{ fontWeight: 600 }}>Valor Total da Compra:</div>
                      <div style={{ marginLeft: 16 }}>R$ 545</div>
                    </div>
                    <div style={{ margin: '12px' }}>
                      <Button type='primary' style={{ width: 268 }}>
                        Concluir Pedido
                      </Button>
                    </div>
                  </div>
                } 
                trigger="click" 
                arrow={false}
              >
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center', marginLeft: 12 }}>
                  <Tooltip title='Carrinho de Compras'>
                    <Badge count={4} style={{color: '#FFFFFF', marginTop: 4, marginRight: 10, boxShadow: 'none'}}>
                      <Button type='text'>
                        <RiShoppingCart2Fill style={{ fontSize: 22, color: '#FFFFFF' }}/>
                      </Button>
                    </Badge>
                  </Tooltip>
                  </div>
              </Popover>
            </Col>
          </Row>
        </Col>
        <Col>
          {renderUserOptions}
          <ModalAcessarConta 
            visible={exibirTelaParaAcessarConta} 
            closeFn={() => setExibirTelaParaAcessarConta(false)}
            openLg={() => setExibirTelaParaAcessarConta(true)}
          />
        </Col>
      </Row>
    </Layout.Header>
  )
}

Header.propTypes = {
  systemAtDarkMode: PropTypes.bool.isRequired,
  setSystemAtDarkMode: PropTypes.func.isRequired
}
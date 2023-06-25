import { 
  CaretDownOutlined, 
  CreditCardOutlined,  
  HeartOutlined, 
  LogoutOutlined, 
  ShoppingOutlined, 
  UserOutlined 
} from '@ant-design/icons'
import { Layout, Row, Col, Button, Menu, Tooltip } from 'antd'
import { useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { useControleUsuarioContext } from '../../hooks/useControleUsuarioContext'
import { ModalAcessarConta } from '../../Modal/AcessarConta/ModalAcessarConta'
import { BsSunFill } from 'react-icons/bs';
import { RiMoonClearFill } from 'react-icons/ri'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const StyledMenu = styled(Menu)`
  background-color: transparent;
  color: #FFFFFF;
  :hover {
    color: #FFFFFF;
  }
  :active {
    color: #FFFFFF;
  }
`

export const Header = ({ systemAtDarkMode, setSystemAtDarkMode }) => {
  const { usuario, setUsuario } = useControleUsuarioContext()
  const navigate = useNavigate()

  const [exibirTelaParaAcessarConta, setExibirTelaParaAcessarConta] = useState(false)

  const items = useMemo(() => [
    {
      label: (
        <Row gutter={[8,8]}>
          <Col>
            {`Olá, ${usuario?.nome}`}
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
          key: 'cartoes',
          label: 'Meus cartões',
          icon: <CreditCardOutlined />,
          onClick: () => navigate('cartoes')
        },
        {
          key: 'pedidos',
          label: 'Meus pedidos',
          icon: <ShoppingOutlined />,
          onClick: () => navigate('pedidos')
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
            setUsuario({})
            navigate('home')
          }
        }
      ],
    }
  ], [navigate, setUsuario, usuario?.nome])

  const greetings = useMemo(() => {
    return usuario?.nome 
    ? (
      <StyledMenu 
        mode="horizontal" 
        items={items}
      />
    ) 
    : 'Olá, faça seu login'
  }, [items, usuario?.nome])

  const renderUserOptions = useMemo(() => {
    if (usuario?.nome) {
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
      <Button 
        type='text' 
        style={{ color: '#FFFFFF' }} 
        onClick={() => setExibirTelaParaAcessarConta(true)}
      >
        {greetings}
      </Button>
    )
  }, [greetings, usuario?.nome])

  const themeModeStyle = systemAtDarkMode ? undefined : { backgroundColor: '#4682B4' }

  return (
    <Layout.Header style={themeModeStyle}>
      <Row justify='end' gutter={[24,24]}>
        <Col>
          {renderUserOptions}
          <ModalAcessarConta 
            visible={exibirTelaParaAcessarConta} 
            closeFn={() => setExibirTelaParaAcessarConta(false)}
            openLg={() => setExibirTelaParaAcessarConta(true)}
          />
        </Col>
        <Col style={{ display: 'flex' }}>
          <div onClick={() => setSystemAtDarkMode(!systemAtDarkMode)} style={{ display: 'flex' }}>
            {
              systemAtDarkMode 
              ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
                  <Tooltip title='Light Mode'>
                    <BsSunFill style={{ fontSize: 22, color: '#F8DE7E' }}/> 
                  </Tooltip>
                </div>
              )
              : (
                <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
                  <Tooltip title='Dark Mode'>
                    <RiMoonClearFill style={{ fontSize: 22, color: ' #F6F1D5 ' }} />
                  </Tooltip>
                </div>
              )
            }
          </div>
        </Col>
      </Row>
    </Layout.Header>
  )
}

Header.propTypes = {
  systemAtDarkMode: PropTypes.bool.isRequired,
  setSystemAtDarkMode: PropTypes.func.isRequired
}
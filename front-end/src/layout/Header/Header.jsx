import { Layout, Row, Col, Button, Menu, Input } from 'antd'
import { useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { useControleUsuarioContext } from '../../hooks/useControleUsuarioContext'
import { ModalAcessarConta } from '../../Modal/AcessarConta/ModalAcessarConta'
import { useNavigate } from 'react-router-dom'
import { CarrinhoDeCompras } from './components/CarrinhoDeCompras/CarrinhoDeCompras'
import { BtnChangeTheme } from './components/BtnChangeTheme/BtnChangeTheme'
import PropTypes from 'prop-types'
import { itemsMenu } from './itemsMenu'
import { useCallback } from 'react'
import logoVertical from '../../assets/images/logo-vertical.png'

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
  const { usuarioLogado, setUsuarioLogado } = useControleUsuarioContext()
  const navigate = useNavigate()

  const [exibirTelaParaAcessarConta, setExibirTelaParaAcessarConta] = useState(false)

  const deslogarUsuarioDoSistema = useCallback(() => {
    setUsuarioLogado({})
    localStorage.removeItem('usuarioLogado');
    navigate('home')
  }, [navigate, setUsuarioLogado])

  const greetings = useMemo(() => {
    return usuarioLogado?.nome 
    ? (
      <StyledMenu
        style={{ minWidth: 200, justifyContent: 'center' }} 
        mode="horizontal" 
        items={itemsMenu(navigate, usuarioLogado, deslogarUsuarioDoSistema)}
      />
    ) 
    : 'Olá, faça seu login'
  }, [deslogarUsuarioDoSistema, usuarioLogado, navigate])

  const renderUserOptions = useMemo(() => {
    if (usuarioLogado?.nome) {
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
  }, [greetings, usuarioLogado?.nome])

  const themeModeStyle = useMemo(() => {
    return systemAtDarkMode ? undefined : { backgroundColor: '#1677ff' }
  }, [systemAtDarkMode])

  return (
    <Layout.Header style={{ ...themeModeStyle, position: 'fixed', width: '100%', zIndex: 1, paddingInline: 20 }}>
      <Row justify='space-between' gutter={[24,24]}>
        <Col onClick={() => navigate('home')} style={{ display: 'flex', cursor: 'pointer' }}>
          <img height={64} src={logoVertical} />
        </Col>
        <Col style={{ display: 'flex', padding: 0 }} span={18}>
          <Row justify='end' gutter={[24,24]} style={{ display: 'flex', width: '100%' }}>
            <Col style={{ display: 'flex', alignItems: 'center', margin: '0px 12px' }}>
              <Input.Search 
                placeholder='Busque pelo produto...'
                onSearch={() => {}}
              />
            </Col>
            <Col style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
              <BtnChangeTheme 
                systemAtDarkMode={systemAtDarkMode}
                setSystemAtDarkMode={setSystemAtDarkMode}
              />
              <CarrinhoDeCompras />
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
        </Col>
      </Row>
    </Layout.Header>
  )
}

Header.propTypes = {
  systemAtDarkMode: PropTypes.bool.isRequired,
  setSystemAtDarkMode: PropTypes.func.isRequired
}
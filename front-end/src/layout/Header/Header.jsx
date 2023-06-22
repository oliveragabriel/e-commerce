import { LogoutOutlined } from '@ant-design/icons'
import { Layout, Row, Col, Button, Tooltip } from 'antd'
import { useMemo, useState } from 'react'
import { useControleUsuarioContext } from '../../hooks/useControleUsuarioContext'
import { ModalAcessarConta } from '../../Modal/AcessarConta/ModalAcessarConta'

export const Header = () => {
  const { usuario, setUsuario } = useControleUsuarioContext()

  const [renderModalAcessarConta, setRenderModalAcessarConta] = useState(false)

  const greetings = useMemo(() => usuario?.nome ? `Olá, ${usuario?.nome}` : 'Olá, faça seu login', [usuario])

  const renderUserOptions = useMemo(() => {
    if (usuario?.nome) {
      return (
        <Row>
          <Col>
            <span style={{ color: '#FFFFFF' }}>
              {greetings}
            </span>
          </Col>
          <Col>
            bla
          </Col>
        </Row>
      )
    }
    return (
      <Button 
        type='text' 
        style={{ color: '#FFFFFF' }} 
        onClick={() => setRenderModalAcessarConta(true)}
      >
        {greetings}
      </Button>
    )
  }, [greetings, usuario?.nome])

  const renderLogoutButton = useMemo(() => {
    if (usuario.nome) {
      return (
        <Col>
          <Tooltip title='Sair'>
            <div 
              onClick={() => setUsuario({})}
              style={{ cursor: 'pointer' }}
            >
              <LogoutOutlined style={{ color: '#FFFFFF', fontSize: 18 }}/>
            </div>
          </Tooltip>
        </Col>
      )
    }
    return null
  }, [setUsuario, usuario.nome])

  return (
    <Layout.Header>
      <Row justify='end' gutter={[24,24]}>
        <Col>
          {renderUserOptions}
          <ModalAcessarConta 
            visible={renderModalAcessarConta} 
            closeFn={() => setRenderModalAcessarConta(false)}
            openLg={() => setRenderModalAcessarConta(true)}
          />
        </Col>
        {renderLogoutButton}
      </Row>
    </Layout.Header>
  )
}
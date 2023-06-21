import { Layout, Row, Col, Button } from 'antd'
import { useState } from 'react'
import { ModalLogin } from '../../ModalLogin/ModalLogin'

export function Header() {
  const [greetings, setGreetings] = useState('Olá, faça seu login')
  const [modalLoginVisible, setModalLoginVisible] = useState(false)

  return (
    <Layout.Header>
      <Row justify='end'>
        <Col>
          <Button type='text' style={{ color: '#FFFFFF' }} onClick={() => setModalLoginVisible(true)}>
            {greetings}
          </Button>
          <ModalLogin visible={modalLoginVisible} closeFn={() => setModalLoginVisible(false)}/>
        </Col>
      </Row>
    </Layout.Header>
  )
}
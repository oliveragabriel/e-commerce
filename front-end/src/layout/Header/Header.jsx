import { Layout, Row, Col, Button } from 'antd'
import { useState } from 'react'
import { ModalAcessarConta } from '../../Modal/AcessarConta/ModalAcessarConta'

export const Header = () => {
  const [greetings, setGreetings] = useState('Olá, faça seu login')
  const [renderModalAcessarConta, setRenderModalAcessarConta] = useState(false)

  return (
    <Layout.Header>
      <Row justify='end'>
        <Col>
          <Button type='text' style={{ color: '#FFFFFF' }} onClick={() => setRenderModalAcessarConta(true)}>
            {greetings}
          </Button>
          <ModalAcessarConta visible={renderModalAcessarConta} closeFn={() => setRenderModalAcessarConta(false)}/>
        </Col>
      </Row>
    </Layout.Header>
  )
}
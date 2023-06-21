import { useState, useCallback } from 'react'
import { Row, Col, Modal, Form, Button, Input } from 'antd'
import { MailOutlined, LockOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons'
import axios from 'axios'

export function ModalLogin({ visible, closeFn = () => {} }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [loggedUser, setLoggedUser] = useState()

  const handleCancel = useCallback(() => {
    closeFn()
    form.resetFields()
  }, [closeFn, form])


  const executaLoginParaUsuario = useCallback((values) => {
    setLoading(true)
    axios.post('http://localhost:3003/login/', { ...values })
      .then(response => {
        if (response.data.length > 0) setLoggedUser(response.data[0])
        handleCancel()
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false)
      })
  },[handleCancel])

  const handleSubmit = useCallback(async () => {
      form.validateFields()
        .then((values) => executaLoginParaUsuario(values))
  },[executaLoginParaUsuario, form])

  return (
    <Modal
      title='Acessar Conta'
      open={visible}
      icon={<UserSwitchOutlined />}
      confirmLoading={loading}
      onOk={() => handleSubmit()}
      onCancel={() => handleCancel(false)}  
    >
      <Form form={form} layout='vertical'>
        <Row justify='center'>
          <Col span={24}>
            <Form.Item
              name='email'
              label='E-mail'
              hasFeedback
              required
              rules={[
                { required: true, message: 'Obrigatório preencher E-mail' }
              ]}
            >
              <Input
                placeholder='Digite seu E-mail'
                addonAfter={<MailOutlined />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='senha'
              label='Senha'
              hasFeedback
              required
              rules={[
                { required: true, message: 'Obrigatório preencher Senha' }
              ]}
            >
              <Input.Password
                placeholder='Digite sua Senha'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify='space-between'>
          <Col span={12}>
            <Form.Item>
              <Button
                icon={<LockOutlined />}
              >
                Esqueci Minha Senha
              </Button>
            </Form.Item>
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <Form.Item>
              <Button
                icon={<UserAddOutlined/>}
              >
                Cadastrar Nova Conta
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
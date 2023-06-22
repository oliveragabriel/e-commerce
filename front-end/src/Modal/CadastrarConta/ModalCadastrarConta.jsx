import { useCallback, useState } from 'react'
import { Row, Col, Form, Modal, Input } from 'antd'
import { MailOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons'

export const ModalCadastrarConta = ({ visible, closeFn }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleCancel = useCallback(() => {
    closeFn(false)
    form.resetFields()
  }, [closeFn, form])

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      console.log(values)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [form])

  return (
    <Modal
      title='Cadastrar Nova Conta'
      open={visible}
      icon={<UserAddOutlined />}
      confirmLoading={loading}
      okText='Cadastrar'
      onOk={() => handleSubmit()}
      onCancel={() => handleCancel()}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Form 
        form={form} 
        layout='vertical' 
        size='middle'
      > 
        <Row>
          <Col span={24}>
            <Form.Item
              name='username'
              label='Nome'
              hasFeedback
              required
              rules={[
                { required: true, message: 'Obrigatório preencher Nome' }
              ]}
            >
              <Input 
                placeholder='Digite seu Nome'
                addonAfter={<UserOutlined />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='email'
              label='E-mail'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher E-mail' 
                }
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
              name='password'
              label='Senha'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Senha' 
                }
              ]}
            >
              <Input.Password
                placeholder='Digite sua Senha'
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='confirmPassword'
              label='Confirmar Senha'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Confirmar Senha' 
                }
              ]}
            >
              <Input.Password
                placeholder='Confirme sua Senha'
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
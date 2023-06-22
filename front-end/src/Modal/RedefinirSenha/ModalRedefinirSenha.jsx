import { useState, useCallback } from 'react'
import { Row, Col, Modal, Form, Input, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

export const ModalRedefinirSenha = ({ visible, closeFn, openLg }) => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const [loading, setLoading] = useState(false)

  const handleCancel = useCallback(() => {
    closeFn()
    form.resetFields()
  }, [closeFn, form])

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      console.log(values)
      messageApi.success('')
      handleCancel()
      openLg()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  },[form, handleCancel, messageApi, openLg])

  return (
    <Modal
      title='Redefinir Senha'
      open={visible}
      icon={<LockOutlined />}
      confirmLoading={loading}
      okText='Enviar'
      onOk={handleSubmit}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      {contextHolder}
      <Form form={form} layout='vertical' size='middle'> 
        <Row>
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
        </Row>
      </Form>
    </Modal>
  )
}

ModalRedefinirSenha.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeFn: PropTypes.func.isRequired,
  openLg: PropTypes.func.isRequired
}
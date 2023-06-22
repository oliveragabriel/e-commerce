import { useState, useCallback } from 'react'
import { Row, Col, Form, Input, Modal } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

export const ModalRedefinirSenha = ({ visible, closeFn }) => {
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
      handleCancel()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  },[form, handleCancel])

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
  closeFn: PropTypes.func.isRequired
}
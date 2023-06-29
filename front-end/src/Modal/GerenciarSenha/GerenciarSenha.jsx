import { useCallback, useState } from 'react'
import { Row, Col, Modal, Form, Input, message } from 'antd'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useControleUsuarioContext } from '../../hooks/useControleUsuarioContext'

export const ModalGerenciarSenha = ({ visible, closeFn, openLg }) => {
  const [form] = Form.useForm()
  const { loggedUser } = useControleUsuarioContext()

  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)

  const handleCancel = useCallback(() => {
    closeFn(false)
    form.resetFields()
  }, [closeFn, form])

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const { senha } = values
      const response = await axios.put(`http://localhost:3003/usuario/${loggedUser.id}/senha`, { senha })
      messageApi.success(response.data.message)
      closeFn()
      openLg()
    } catch (error) {
      messageApi.error(error)
    } finally {
      setLoading(false)
    }
  }, [closeFn, form, messageApi, openLg, loggedUser.id])

  return (
    <Modal
      title='Gerenciar Senha'
      open={visible}
      confirmLoading={loading}
      okText='Confirmar'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      {contextHolder}
      <Form 
        form={form} 
        layout='vertical' 
        size='middle'
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name='senha'
              label='Senha'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Senha' 
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (value.length < 8) {
                      return Promise.reject(
                        new Error(
                          "Uma Senha segura precisa de no mínimo de 8 caracteres!"
                        )
                      );
                    }
                    if (
                      value.includes("1") === false &&
                      value.includes("2") === false &&
                      value.includes("3") === false &&
                      value.includes("4") === false &&
                      value.includes("5") === false &&
                      value.includes("6") === false &&
                      value.includes("7") === false &&
                      value.includes("8") === false &&
                      value.includes("9") === false &&
                      value.includes("0") === false
                    ) {
                      return Promise.reject(
                        new Error(
                          "Uma Senha segura precisa conter ao menos um número!"
                        )
                      );
                    }
                      return Promise.resolve();
                  },
                })
              ]}
            >
              <Input.Password
                placeholder='Digite sua Senha'
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='confirmarSenha'
              label='Confirmar Senha'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Confirmar Senha' 
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('senha') === value) {
                      return Promise.resolve()
                    }
                    if (value.length >= getFieldValue('senha').length  && getFieldValue('senha') !== value) {
                      return Promise.reject(new Error('Os campos Senha e Confirmar Senha não estão iguais!'))
                    }
                    return Promise.resolve()
                  }
                })
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

ModalGerenciarSenha.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeFn: PropTypes.func.isRequired,
  openLg: PropTypes.func.isRequired
}
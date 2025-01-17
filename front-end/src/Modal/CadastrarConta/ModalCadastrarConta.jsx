import { useCallback, useState } from 'react'
import { Row, Col, Modal, Form, Input, message } from 'antd'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons'
import { PiUserListLight } from 'react-icons/pi'
import axios from 'axios'
import PropTypes from 'prop-types'

export const ModalCadastrarConta = ({ visible, closeFn, openLg }) => {
  const [form] = Form.useForm()
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
      const { senha, nome, sobrenome, email } = values
      const response = await axios.post('http://localhost:3003/usuario/', { senha, nome, sobrenome, email })
      messageApi.success(response.data.message)
      closeFn()
      openLg()
    } catch (error) {
      messageApi.error(error)
    } finally {
      setLoading(false)
    }
  }, [closeFn, form, messageApi, openLg])

  return (
    <Modal
      title='Cadastrar Nova Conta'
      open={visible}
      icon={<UserAddOutlined />}
      confirmLoading={loading}
      okText='Cadastrar'
      onOk={handleSubmit}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      {contextHolder}
      <Form 
        form={form} 
        layout='vertical' 
        size='middle'
      > 
        <Row gutter={[8,8]}>
          <Col span={12}>
            <Form.Item
              name='nome'
              label='Nome'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Nome' 
                },
              ]}
            >
              <Input 
                placeholder='Digite seu Nome'
                addonAfter={<UserOutlined />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='sobrenome'
              label='Sobrenome'
              hasFeedback
              required
              rules={[
                { 
                  required: true,
                  message: 'Obrigatório preencher Sobrenome' 
                }
              ]}
            >
              <Input 
                placeholder='Digite seu Sobrenome'
                addonAfter={<UserOutlined />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='email'
              label='Email'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Email' 
                }
              ]}
            >
              <Input 
                placeholder='Digite seu Email'
                addonAfter={<PiUserListLight />}
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

ModalCadastrarConta.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeFn: PropTypes.func.isRequired,
  openLg: PropTypes.func.isRequired
}
import { useState, useCallback } from 'react'
import { Row, Col, Modal, Form, Button, Input } from 'antd'
import { MailOutlined, LockOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { ModalCadastrarConta } from '../CadastrarConta/ModalCadastrarConta'
import { ModalRedefinirSenha } from '../RedefinirSenha/ModalRedefinirSenha'
import axios from 'axios'
import PropTypes from 'prop-types'

export const ModalAcessarConta = ({ visible, closeFn }) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [usuario, setUsuario] = useState()
  const [exibirTelaParaRedefinirSenha, setExibirTelaParaRedefinirSenha] = useState(false)
  const [exibirTelaParaCadastrarConta, setExibirTelaParaCadastrarConta] = useState(false)

  const handleCancel = useCallback(() => {
    closeFn()
    form.resetFields()
  }, [closeFn, form])

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const response = await axios.post('http://localhost:3003/login/', { ...values })
      if (response.data.length > 0) setUsuario(response.data[0])
      handleCancel()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [form, handleCancel])

  return (
    <Modal
      title='Acessar Conta'
      open={visible}
      icon={<UserSwitchOutlined />}
      confirmLoading={loading}
      okText='Confirmar'
      onOk={() => handleSubmit()}
      onCancel={() => handleCancel()}
      cancelButtonProps={{ style: { display: 'none' } }}
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
              name='senha'
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
        </Row>
        <Row justify='space-between'>
          <Col span={12}>
            <Form.Item>
              <Button
                icon={<LockOutlined />}
                onClick={() => setExibirTelaParaRedefinirSenha(true)}
              >
                Redefinir Senha
              </Button>
              <ModalRedefinirSenha 
                visible={exibirTelaParaRedefinirSenha} 
                closeFn={() => setExibirTelaParaRedefinirSenha(false)} 
              />
            </Form.Item>
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <Form.Item>
              <Button
                icon={<UserAddOutlined/>}
                onClick={() => setExibirTelaParaCadastrarConta(true)}
              >
                Cadastrar Nova Conta
              </Button>
              <ModalCadastrarConta 
                visible={exibirTelaParaCadastrarConta} 
                closeFn={() => setExibirTelaParaCadastrarConta(false)} 
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
  closeFn: PropTypes.func.isRequired
}
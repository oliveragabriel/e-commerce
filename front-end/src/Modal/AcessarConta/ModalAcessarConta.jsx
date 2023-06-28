import { useState, useCallback } from 'react'
import { Row, Col, Modal, Form, Button, Input, message } from 'antd'
import { LockOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { PiUserListLight } from 'react-icons/pi'
import { ModalCadastrarConta } from '../CadastrarConta/ModalCadastrarConta'
import { ModalRedefinirSenha } from '../RedefinirSenha/ModalRedefinirSenha'
import { useControleUsuarioContext } from '../../hooks/useControleUsuarioContext'
import axios from 'axios'
import PropTypes from 'prop-types'

export const ModalAcessarConta = ({ visible, closeFn, openLg }) => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const { setLoggedUser } = useControleUsuarioContext()

  const [loading, setLoading] = useState(false)
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
      if (response.data.length < 1) return messageApi.error('Não foi encontrado um usuário com os dados fornecidos.')
      setLoggedUser(response.data[0])
      handleCancel()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [form, handleCancel, messageApi, setLoggedUser])

  return (
    <Modal
      title='Acessar Conta'
      open={visible}
      icon={<UserSwitchOutlined />}
      confirmLoading={loading}
      okText='Confirmar'
      onOk={handleSubmit}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Form form={form} layout='vertical'>
        {contextHolder}
        <Row justify='center'>
          <Col span={24}>
            <Form.Item
              name='login'
              label='Login'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Login' 
                }
              ]}
            >
              <Input
                placeholder='Digite seu Login'
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
                openLg={openLg}
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
                openLg={openLg}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

ModalAcessarConta.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeFn: PropTypes.func.isRequired,
  openLg: PropTypes.func.isRequired
}
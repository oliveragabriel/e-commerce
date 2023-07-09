import axios from 'axios'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, Modal, Form, Input, message } from 'antd'
import { useControleUsuarioContext } from '../../hooks/useControleUsuarioContext'

export const ModalGerenciarCartao = ({ action, card, visible, closeFn }) => {
  const [form] = Form.useForm()
  const { usuarioLogado } = useControleUsuarioContext()

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
      let response
      if (card) {
        response = await axios.put(`http://localhost:3003/cartao/${card?.id}`, values)
      } else {
        response = await axios.post(`http://localhost:3003/cartao/${usuarioLogado.id}`, values)
      }
      messageApi.success(response?.data?.message)
      handleCancel()
    } catch (error) {
      messageApi.error('Não foi possível salvar o cartão.')
    } finally {
      setLoading(false)
    }
  }, [form, card, messageApi, handleCancel, usuarioLogado.id])

  useEffect(() => {
    if (card) form.setFieldsValue(card)
  }, [card, form])

  return (
    <Modal
      title={action === 'add' ? 'Adicionar cartão' : 'Editar cartão'}
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
        <Row gutter={[8,8]}>
          <Col span={24}>
            <Form.Item
              name='numero'
              label='Número'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Número' 
                }
              ]}
            >
              <Input
                placeholder='Digite o Número'
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='nome'
              label='Nome'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Nome' 
                }
              ]}
            >
              <Input
                placeholder='Digite o Nome no Cartão'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='codigo'
              label='Código'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Código' 
                }
              ]}
            >
              <Input
                placeholder='Digite o Código'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='validade'
              label='Validade'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Validade' 
                }
              ]}
            >
              <Input
                placeholder='Digite a Validade'
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

ModalGerenciarCartao.propTypes = {
  action: PropTypes.string.isRequired,
  card: PropTypes.any,
  visible: PropTypes.bool.isRequired,
  closeFn: PropTypes.func.isRequired
}
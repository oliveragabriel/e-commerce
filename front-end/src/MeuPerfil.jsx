/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react'
import { Row, Col, Form, Input, message, Button, DatePicker, Select } from 'antd'
import { MailOutlined, UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import { HiOutlineIdentification } from 'react-icons/hi'
import { BsTelephone } from 'react-icons/bs'

export const MeuPerfil = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)
  const [telefone, setTelefone] = useState()

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      messageApi.success('bla')
    } catch (error) {
      messageApi.error('erro')
    } finally {
      setLoading(false)
    }
  }, [form, messageApi])

  return (
    <div style={{ margin: 8, padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
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
          <Col span={12}>
            <Form.Item
              name='cpf'
              label='CPF'
            >
              <Input 
                placeholder='Digite seu CPF'
                addonAfter={<HiOutlineIdentification />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='dataNascimento'
              label='Data de Nascimento'
            >
              <DatePicker
                style={{ width: '100%' }} 
                format={'DD/MM/YYYY'} 
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='nacionalidade'
              label='Nacionalidade'
            >
                <Select
                    allowClear
                    showSearch
                    placeholder="Selecione sua nacionalidade"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                    {
                        value: 'jack',
                        label: 'Jack'
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy'
                    },
                    {
                        value: 'tom',
                        label: 'Tom'
                    }
                    ]}
                />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                type='email'
                placeholder='Digite seu E-mail'
                addonAfter={<MailOutlined />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='telefone'
              label='Telefone'
            >
              <Input
                type='tel'
                value={telefone}
                placeholder='Digite sua Telefone'
                addonAfter={<BsTelephone />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                    style={{  marginRight: 6 }}
                    type='default'
                >
                    Gerenciar Senha
                </Button>
                <Button 
                    style={{  margin: '0px 6px' }}
                    type='default'
                >
                    Gerenciar Endereços
                </Button>
                <Button 
                    style={{  marginLeft: 6 }}
                    type='primary'
                    onClick={handleSubmit}
                >
                    Salvar Alterações
                </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
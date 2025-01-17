import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, Form, Input, message, Button, Select } from 'antd'
import { CheckOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { HiOutlineIdentification } from 'react-icons/hi'
import { BsTelephone } from 'react-icons/bs'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { ModalGerenciarSenha } from './Modal/GerenciarSenha/GerenciarSenha'
import { Typography } from 'antd'

const { Title } = Typography;

export const MeuPerfil = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const { usuarioLogado, setUsuarioLogado } = useControleUsuarioContext()

  const [exibirTelaParaGerenciarSenha, setExibirTelaParaGerenciarSenha] = useState(false)

  const [loading, setLoading] = useState(false)
  const [countries, setCountries] = useState([])

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const response = await axios.put(`http://localhost:3003/usuario/${usuarioLogado.id}`, values)
      messageApi.success(response.data.message)
    } catch (error) {
      messageApi.error('erro')
    } finally {
      setLoading(false)
    }
  }, [form, messageApi, usuarioLogado.id])

  const getCountriesList = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3003/pais/')
      const countriesFormatedToSelectItem = response?.data?.result?.map((country) => ({
        label: country.nome,
        value: country.id
      }))
      setCountries(countriesFormatedToSelectItem)
    } catch (error) {
      messageApi.error(error)
    } finally {
      setLoading(false)
    }
  }, [messageApi])

  const getUserData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/usuario/${usuarioLogado.id}`)
      if (response?.data?.result?.length > 0) {
        const usuario = response.data.result[0]
        setUsuarioLogado(usuario)
        form.setFieldsValue({...usuario, nacionalidade: usuario?.nacionalidade ? Number(usuario?.nacionalidade) : null })
      }
    } catch (error) {
      messageApi.error(error)
    } finally {
      setLoading(false)
    }
  }, [form, messageApi, setUsuarioLogado, usuarioLogado.id])

  useEffect(() => {
    getUserData()
    getCountriesList()
  }, [getCountriesList, getUserData])
  

  return (
    <div style={{ minHeight: '75.9vh' , marginTop: '52px', padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
      <Form 
        form={form} 
        layout='vertical' 
        size='middle'
      > 
        <Row gutter={[8,8]}>
          <Col span={24}>
            <Title level={3}>Meu perfil</Title>
          </Col>
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
              rules={[
                { max: 14, message: "Quantidade máxima de caracteres é 14!" },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (value.includes(".") || value.includes("-")) {
                      return Promise.reject(new Error('Digite apenas números, sem pontos ou traços!'));
                    }
                    return Promise.resolve();
                  },
                })
              ]}
            >
              <Input 
                placeholder='Digite seu CPF'
                addonAfter={<HiOutlineIdentification />}
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
                    options={countries}
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
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (value.length < 6) {
                      return Promise.reject(new Error('Um e-mail válido precisa no mínimo de 6 caracteres'));
                    }
                    if (value.includes("@") === false) {
                      return Promise.reject(new Error('Um e-mail válido precisa conter: @'));
                    }
                    if (value.includes(".") === false) {
                      return Promise.reject(new Error('Um e-mail válido precisa conter: .'));
                    }
                    if (value.length >= 6 && value.includes(".") && value.includes("@")) {
                      return Promise.resolve();
                    }
                  },
                })
              ]}
            >
              <Input 
                type='email'
                placeholder='Digite seu E-mail'
                addonAfter={<MailOutlined />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='telefone'
              label='Telefone'
            >
              <Input
                type='tel'
                placeholder='Digite sua Telefone'
                addonAfter={<BsTelephone />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ModalGerenciarSenha 
                visible={exibirTelaParaGerenciarSenha} 
                closeFn={() => setExibirTelaParaGerenciarSenha(false)}
                openLg={() => setExibirTelaParaGerenciarSenha(true)}
              />
              <Button 
                  style={{  marginRight: 6 }}
                  type='default'
                  icon={<LockOutlined />}
                  disabled={loading}
                  onClick={() => setExibirTelaParaGerenciarSenha(true)}
              >
                  Gerenciar Senha
              </Button>
              <Button 
                  style={{  marginLeft: 6 }}
                  type='primary'
                  loading={loading}
                  onClick={handleSubmit}
                  icon={<CheckOutlined />}
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
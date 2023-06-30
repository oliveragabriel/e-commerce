import { useCallback, useEffect, useMemo, useState } from 'react'
import { Row, Col, Modal, Form, Input, message, Select } from 'antd'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useControleUsuarioContext } from '../../hooks/useControleUsuarioContext'

export const ModalGerenciarEndereco = ({ address, visible, closeFn }) => {
  const [form] = Form.useForm()
  const { loggedUser, statesList, countriesList, setStatesList, setCountriesList } = useControleUsuarioContext()

  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)

  const handleCancel = useCallback(() => {
    closeFn(false)
    form.resetFields()
  }, [closeFn, form])

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const values = await form.getFieldsValue()      
      if (address) {
        await axios.put(`http://localhost:3003/usuario/${loggedUser.id}/endereco/${address.id}`, { ...values, pais: 1 })
      } else {
        await axios.post(`http://localhost:3003/usuario/${loggedUser.id}/endereco`,  { ...values, pais: 1 })
      }
      messageApi.success('Endereço salvo com sucesso.')
      closeFn()
    } catch (error) {
      messageApi.error('Erro ao salvar o endereço.')
    } finally {
      setLoading(false)
    }
  }, [form, address, messageApi, closeFn, loggedUser.id])

  const title = useMemo(() => address ? 'Editar endereço' : 'Adicionar endereço', [address])

  const getStatesList = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3003/estado/')
      const statesFormatedToSelectItem = response?.data?.result?.map((state) => ({
        label: state.nome,
        value: state.id
      }))
      setStatesList(statesFormatedToSelectItem)
    } catch (error) {
      messageApi.error('Não foi possível buscar a lista de estados.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, setStatesList])

  const getCountriesList = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3003/pais/')
      const countriesFormatedToSelectItem = response?.data?.result?.map((country) => ({
        label: country.nome,
        value: country.id
      }))
      setCountriesList(countriesFormatedToSelectItem)
    } catch (error) {
      messageApi.error('Não foi possível buscar a lista de países.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, setCountriesList])

  const setInitialValues = useCallback(() => {
    if (address) {
      const country = countriesList.find((c) => c.label === address.pais)?.value
      const state = statesList.find((c) => c.label === address.estado)?.value
      form.setFieldsValue({ ...address, pais: country, estado: state })
    }
  },[address, countriesList, form, statesList])

  useEffect(() => {
    setInitialValues()
    if (statesList.length < 1) getStatesList()
    if (countriesList.length < 1) getCountriesList()
    return () => {
      form.resetFields()
    }
  })

  return (
    <Modal
      title={title}
      open={visible}
      confirmLoading={loading}
      okText='Confirmar'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      {contextHolder}
      <Form form={form} layout='vertical' size='middle'>
        <Row gutter={[8,8]}>
          <Col span={24}>
            <Form.Item
              name='rua'
              label='Rua'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Rua' 
                }
              ]}
            >
              <Input
                placeholder='Digite a Rua'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          <Col span={12}>
            <Form.Item
              name='complemento'
              label='Complemento'
            >
              <Input
                placeholder='Digite o Complemento'
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='bairro'
              label='Bairro'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Bairro' 
                }
              ]}
            >
              <Input
                placeholder='Digite o Bairro'
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='cidade'
              label='Cidade'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Cidade' 
                }
              ]}
            >
              <Input
                placeholder='Digite a Rua'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='estado'
              label='Estado'
              hasFeedback
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher Estado' 
                }
              ]}
            >
              <Select
                allowClear
                showSearch
                placeholder="Selecione o Estado"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={statesList}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='pais'
              label='País'
              required
              rules={[
                { 
                  required: true, 
                  message: 'Obrigatório preencher País' 
                }
              ]}
            >
              <Select
                defaultValue={{ value: 1, label: 'Brasil' }}
                disabled
                allowClear
                showSearch
                placeholder="Selecione o País"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={countriesList}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

ModalGerenciarEndereco.propTypes = {
  address: PropTypes.any,
  visible: PropTypes.bool.isRequired,
  closeFn: PropTypes.func.isRequired
}
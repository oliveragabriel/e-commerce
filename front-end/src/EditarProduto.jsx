import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Row, Col, message, Button, Form, Upload, Input, InputNumber, Select } from 'antd'
import { useControleUsuarioContext } from './hooks/useControleUsuarioContext'
import { Typography } from 'antd'
import { converteImagemParaBase64 } from './functions'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

export const EditarProduto = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const { listaComTodasCategorias, setListaComTodasCategorias } = useControleUsuarioContext()

  const [loading, setLoading] = useState(false)
  const [produtoSendoEditado, setProdutoSendoEditado] = useState(undefined)
  const [imagemFotoUrl, setImagemFotoUrl] = useState('')
  const [imagemBannerUrl, setImagemBannerUrl] = useState('')

  const handleUpload = useCallback(async (file, type) => {
    try {
      const base64Image = await converteImagemParaBase64(file)
      if (type === 'banner') {
        setImagemBannerUrl(base64Image)
      } else {
        setImagemFotoUrl(base64Image)
      }
    } catch (error) {
      console.error('Erro ao converter a imagem:', error)
    }
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
    await axios.put(`http://localhost:3003/produto/${idProduto}`, { ...values, foto: imagemFotoUrl, banner: imagemBannerUrl })
      messageApi.success('Produto salvo com sucesso.')
    } catch (error) {
      messageApi.error('Erro ao salvar o produto.')
    } finally {
      setLoading(false)
    }
  }, [form, messageApi, imagemFotoUrl, imagemBannerUrl])

  const setInitialValues = useCallback(() => {
    if (produtoSendoEditado) {
      const categoria = listaComTodasCategorias.find((c) => c.label === produtoSendoEditado.tipo)?.value
      setImagemFotoUrl(produtoSendoEditado.foto)
      setImagemBannerUrl(produtoSendoEditado.banner)
      form.setFieldsValue({ ...produtoSendoEditado, nome: produtoSendoEditado.produto, categoria: categoria })
    }
  },[produtoSendoEditado, listaComTodasCategorias, form])

  const deleteProduto = useCallback(async () => {
    try {
      setLoading(true)
      await axios.delete(`http://localhost:3003/produto/${idProduto}`)
    } catch (error) {
      messageApi.error('Não foi possível remover o produto da lista de favoritos.')
    } finally {
      setLoading(false)
    }
  }, [messageApi])

  const getProdutoSendoEditado = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/produto/${idProduto}`)
      setProdutoSendoEditado(response)
    } catch (error) {
      messageApi.error('Não foi possível encontrar dados do produto selecionado.')
    } finally {
      setLoading(false)
    }
  }, [messageApi])

  const getListaCategoriasParaProduto = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3003/produto/categoria`)
      const produtosFormatadosParaComponenteSelect = response?.data?.result?.map((categoria) => ({
        label: categoria.nome,
        value: categoria.id
      }))
      setListaComTodasCategorias(produtosFormatadosParaComponenteSelect)
    } catch (error) {
      messageApi.error('Não foi possível buscar a lista de categorias.')
    } finally {
      setLoading(false)
    }
  }, [messageApi, setListaComTodasCategorias])

  const buscaDadosParaPreencherFormulario = useCallback(async () => {
    if (listaComTodasCategorias.length < 1) await getListaCategoriasParaProduto()
    if (!produtoSendoEditado) await getProdutoSendoEditado()
    setInitialValues()
  }, [getListaCategoriasParaProduto, getProdutoSendoEditado, listaComTodasCategorias.length, produtoSendoEditado, setInitialValues])

  const uploadButton = useMemo(() => (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        Upload
      </div>
    </div>
  ), [loading])

  useEffect(() => {
    buscaDadosParaPreencherFormulario
  }, [buscaDadosParaPreencherFormulario])
  
  return (
    <div style={{ minHeight: '86.1vh',  marginTop: '52px', padding: 16, border: '1px solid #d8dcd6', borderRadius: 6 }}>
      {contextHolder}
      <Row gutter={[24,24]}>
        <Col span={24}>
          <Title level={3}>Editar produto</Title>
        </Col>
        <Col span={24}>
        {contextHolder}
        <Form form={form} layout='vertical' size='middle'>
            <Row gutter={[8,8]}>
                <Col span={12}>
                    <Form.Item
                    name='foto'
                    label='Foto'
                    hasFeedback
                    required
                    rules={[
                        { 
                        required: true, 
                        message: 'Obrigatório atribuir Foto' 
                        }
                    ]}
                    >
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={(file) => {
                        handleUpload(file, 'foto')
                        return false
                        }}
                    >
                        {imagemFotoUrl ? <img src={imagemFotoUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name='banner'
                    label='Banner'
                    >
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={(file) => {
                        handleUpload(file, 'banner')
                        return false
                        }}
                    >
                        {imagemBannerUrl ? <img src={imagemBannerUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
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
                        placeholder='Digite o Nome'
                    />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                    name='descricao'
                    label='Descrição'
                    hasFeedback
                    required
                    rules={[
                        { 
                        required: true, 
                        message: 'Obrigatório preencher Descrição' 
                        }
                    ]}
                    >
                    <Input.TextArea
                        showCount
                        maxLength={254}
                        placeholder='Digite uma Descrição'
                    />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name='valor'
                    label='Valor'
                    hasFeedback
                    required
                    rules={[
                        { 
                        required: true, 
                        message: 'Obrigatório preencher Valor' 
                        }
                    ]}
                    >
                    <InputNumber
                        prefix='R$'
                        style={{ width: '100%' }}
                        controls={false}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        placeholder=' Digite o Valor'
                    />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name='categoria'
                    label='Categoria'
                    hasFeedback
                    required
                    rules={[
                        { 
                        required: true, 
                        message: 'Obrigatório preencher Categoria' 
                        }
                    ]}
                    >
                    <Select
                        allowClear
                        showSearch
                        placeholder="Selecione a Categoria"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={listaComTodasCategorias}
                    />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        </Col>
        <Col span={24}>
          <Button 
            style={{  marginRight: 6 }}
            danger
            disabled={loading}
            onClick={deleteProduto}
          >
            Excluir
          </Button>
          <Button 
            style={{  marginRight: 6 }}
            type='primary'
            disabled={loading}
            onClick={handleSubmit}
          >
            Confirmar
          </Button>
        </Col>
      </Row>
    </div>
  )
}
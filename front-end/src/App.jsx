import './reset.css'
import ptBR from 'antd/es/locale/pt_BR'
import { Header } from './layout/Header/Header'
import { useState } from 'react'
import { Home } from './Home'
import { MeuPerfil } from './MeuPerfil'
import { MeusPedidos } from './MeusPedidos'
import { MeusCartoes } from './MeusCartoes'
import { MeusEnderecos } from './MeusEnderecos'
import { MeusFavoritos } from './MeusFavoritos'
import { MinhaCompra } from './MinhaCompra'
import { GerenciarProdutos } from './GerenciarProdutos'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ControleUsuarioContextProvider } from './context/ControleUsuarioContextProvider'
import { Card, Col, ConfigProvider as AntdConfigProvider, Layout, Row, theme } from 'antd'
import logoHorizontal from './assets/images/logo-horizontal.png'

function App() {
  const [systemAtDarkMode, setSystemAtDarkMode] = useState(true)

  const { defaultAlgorithm, darkAlgorithm } = theme

  return (
    <BrowserRouter>
      <AntdConfigProvider 
        locale={ptBR}
        theme={{
          algorithm: systemAtDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <ControleUsuarioContextProvider>
          <Header 
            systemAtDarkMode={systemAtDarkMode}
            setSystemAtDarkMode={setSystemAtDarkMode} 
          />
          <Layout.Content style={{ height: '100%' }}>
            <Card style={{ height: '100%', borderRadius: 0 }}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/perfil" element={<MeuPerfil />} />
                  <Route path="/enderecos" element={<MeusEnderecos />} />
                  <Route path="/cartoes" element={<MeusCartoes />} />
                  <Route path="/compras" element={<MeusPedidos />} />
                  <Route path="/favoritos" element={<MeusFavoritos/>} />
                  <Route path="/produtos" element={<GerenciarProdutos />} />
                  <Route path="/finalizar-compra" element={<MinhaCompra />} />
              </Routes>
            </Card>
          </Layout.Content>
          <Layout.Footer>
            <Row justify='space-between'>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ fontWeight: 600 }}> Copyright © 2023 | Gabriel Olivera | All Rights Reserved</p>
              </Col>
              <Col>
                <img height='50vh' src={logoHorizontal} />
              </Col>
            </Row>
          </Layout.Footer>
        </ControleUsuarioContextProvider>
      </AntdConfigProvider>
    </BrowserRouter>
  )
}

export default App

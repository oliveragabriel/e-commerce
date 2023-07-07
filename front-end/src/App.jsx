import { Card, ConfigProvider as AntdConfigProvider, Layout, theme } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { Header } from './layout/Header/Header'
import { ControleUsuarioContextProvider } from './context/ControleUsuarioContextProvider'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MeuPerfil } from './MeuPerfil'
import './reset.css'
import { MeusEnderecos } from './MeusEnderecos'
import { MeusPedidos } from './MeusPedidos'
import { MeusCartoes } from './MeusCartoes'
import { MeusFavoritos } from './MeusFavoritos'
import { Home } from './Home'
import { GerenciarProdutos } from './GerenciarProdutos'

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
              </Routes>
            </Card>
          </Layout.Content>
        </ControleUsuarioContextProvider>
      </AntdConfigProvider>
    </BrowserRouter>
  )
}

export default App

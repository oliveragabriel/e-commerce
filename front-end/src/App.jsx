import { Card, ConfigProvider as AntdConfigProvider, Layout, theme } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { Header } from './layout/Header/Header'
import { ControleUsuarioContextProvider } from './context/ControleUsuarioContextProvider'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MeuPerfil } from './MeuPerfil'
import './reset.css'
import { MeusEnderecos } from './MeusEnderecos'
import { MeusPedidos } from './MeusPedidos'
import { MeusCartoes } from './MeusCartoes'
import { MeusFavoritos } from './MeusFavoritos'
import { Home } from './Home'

function App() {
  const [systemAtDarkMode, setSystemAtDarkMode] = useState(true)
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
          <Layout.Content style={{ height: screenHeight - 64 }}>
            <Card style={{ height: '100%', borderRadius: 0 }}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/perfil" element={<MeuPerfil />} />
                  <Route path="/enderecos" element={<MeusEnderecos />} />
                  <Route path="/cartoes" element={<MeusCartoes />} />
                  <Route path="/compras" element={<MeusPedidos />} />
                  <Route path="/favoritos" element={<MeusFavoritos/>} />
              </Routes>
            </Card>
          </Layout.Content>
        </ControleUsuarioContextProvider>
      </AntdConfigProvider>
    </BrowserRouter>
  )
}

export default App

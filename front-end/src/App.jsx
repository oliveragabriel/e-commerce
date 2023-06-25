import { ConfigProvider as AntdConfigProvider, Layout, theme } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { Header } from './layout/Header/Header'
import { ControleUsuarioContextProvider } from './context/ControleUsuarioContextProvider'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [systemAtDarkMode, setSystemAtDarkMode] = useState(false)

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
          <Layout.Content>
            <div>
              <Routes>
                  <Route path="/" element={<div>/</div>} />
                  <Route path="/home" element={<div>home</div>} />
                  <Route path="/perfil" element={<div>meu perfil</div>} />
                  <Route path="/cartoes" element={<div>meus cartoes</div>} />
                  <Route path="/pedidos" element={<div>meus pedidos</div>} />
                  <Route path="/favoritos" element={<div>meus favoritos</div>} />
              </Routes>
            </div>
          </Layout.Content>
        </ControleUsuarioContextProvider>
      </AntdConfigProvider>
    </BrowserRouter>
  )
}

export default App

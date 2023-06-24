import { ConfigProvider as AntdConfigProvider, Layout, theme } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { Header } from './layout/Header/Header'
import { Card } from './layout/Card/Card'
import { ControleUsuarioContextProvider } from './context/ControleUsuarioContextProvider'
import { useState } from 'react'

function App() {
  const [systemAtDarkMode, setSystemAtDarkMode] = useState(false)

  const { defaultAlgorithm, darkAlgorithm } = theme

  return (
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
          <Card>
          </Card>
        </Layout.Content>
      </ControleUsuarioContextProvider>
    </AntdConfigProvider>
  )
}

export default App

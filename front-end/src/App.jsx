import { ConfigProvider as AntdConfigProvider, Layout } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { Header } from './layout/Header/Header'
import { Card } from './layout/Card/Card'
import { ControleUsuarioContextProvider } from './context/ControleUsuarioContextProvider'

function App() {

  return (
    <AntdConfigProvider locale={ptBR}>
      <ControleUsuarioContextProvider>
        <Header />
        <Layout.Content>
          <Card>
          </Card>
        </Layout.Content>
      </ControleUsuarioContextProvider>
    </AntdConfigProvider>
  )
}

export default App

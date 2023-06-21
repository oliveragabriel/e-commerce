import { ConfigProvider as AntdConfigProvider, Layout } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { Header, Card } from './layout'

function App() {

  return (
    <AntdConfigProvider locale={ptBR}>
      <Header />
      <Layout.Content>
        <Card>
        </Card>
      </Layout.Content>
    </AntdConfigProvider>
  )
}

export default App

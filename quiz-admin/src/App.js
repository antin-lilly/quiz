import './App.css';
import Home from './home/Home'
import { ConfigProvider, Layout } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz from './home/Quiz'
import Question from './home/Question'
import Header from './navigation/Header'

function App() {
  return <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#001664',
        colorBgContainer: '#5a7bfc',
        colorBgLayout: 'transparent',
        borderRadius: 16,
        colorBorder: '#d2d2d2',
        colorTextPlaceholder: '#d2d2d2',
        colorText: '#fff',
      },
    }}
  >
    <BrowserRouter>
      <Layout style={{gap: 30}}>
        <Header/>
        <Layout.Content style={{paddingLeft: 30, paddingRight: 30}}>
          <Routes>
            <Route path="/"  Component={Home}/>
            <Route path="/Home"  Component={Home}/>
            <Route path="/quizzes/:id"  Component={Quiz}/>
            <Route path="/questions/:id"  Component={Question}/>
          </Routes>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  </ConfigProvider>
}

export default App;

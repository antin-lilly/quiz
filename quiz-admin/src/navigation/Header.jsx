import { Button, Layout, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate();

  return <Layout.Header style={{height: 100}}>
    <Button type={'link'} onClick={() => navigate('/')}>
      <Typography.Title>Quiz Admin</Typography.Title>
    </Button>
  </Layout.Header>
}

export default Header;
import React from 'react';
import { Button, Layout, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Logged out successfully.')
    navigate('/')
  };

  const token = localStorage.getItem('token');
  const isLogged = !!token;

  return (
    <Layout.Header style={{ height: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Button type={'link'} onClick={() => navigate('/')}>
          <Typography.Title>Quiz Admin</Typography.Title>
        </Button>
      </div>
      {isLogged && (
        <div>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </Layout.Header>
  );
};

export default Header;

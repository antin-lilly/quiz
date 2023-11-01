import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import AuthService from '../service/Auth.service';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await AuthService.validateToken(token);

      if (response.status === 200) {
        navigate('/Home');
      } else {
        localStorage.removeItem('token'); 
      }
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('token');
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await AuthService.login(values);
  
      if (response.status === 200) {
        const data = response.data;
        
        if (data.admin) {
          localStorage.setItem('token', data.token);
          navigate('/Home');
          message.success('Login successful.');
        } else {
          message.error('User is not an admin.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        message.error('Invalid username or password.');
      } else {
        message.error('An error occurred while logging in.');
      }
    }
  };
  

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

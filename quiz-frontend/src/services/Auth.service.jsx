import { axiosInstance } from './HTTP'

const AuthService = {
  login: (data) => axiosInstance.post(`/users/login`, data),
  register: (data) => axiosInstance.post('/users', data),
  validateToken: (token) => axiosInstance.get('/validate-token', { headers: { Authorization: token } })
}

export default AuthService
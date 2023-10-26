import { axiosInstance } from './HTTP'

const QuestionService = {
  getOptions: (id, token) => axiosInstance.get(`/questions/${id}/options`, { headers: { Authorization: token } }),
  post: (data = {}, token) => axiosInstance.post(`/questions`, data, { headers: { Authorization: token } }),
  put: (id, data = {}, token) => axiosInstance.put(`/questions/${id}`, data, { headers: { Authorization: token } }),
  delete: (id, token) => axiosInstance.delete(`/questions/${id}`, { headers: { Authorization: token } }),

}

export default QuestionService
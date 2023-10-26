import { axiosInstance } from './HTTP'

const QuizService = {
  getAll: (token) => axiosInstance.get('/quizzes', { headers: { Authorization: token } }),
  getQuestions: (id, token) => axiosInstance.get(`/quizzes/${id}/questions`, { headers: { Authorization: token } }),
  post: (data, token) => axiosInstance.post(`/quizzes`, data, { headers: { Authorization: token } }),
  put: (id, data, token) => axiosInstance.put(`/quizzes/${id}`, data, { headers: { Authorization: token } }),
  delete: (id, token) => axiosInstance.delete(`/quizzes/${id}`, { headers: { Authorization: token } }),

}

export default QuizService
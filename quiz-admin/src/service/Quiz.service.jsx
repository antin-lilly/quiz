import { axiosInstance } from './HTTP'

const QuizService = {
  getAll: () => axiosInstance.get('/quizzes'),
  getQuestions: (id) => axiosInstance.get(`/quizzes/${id}/questions`),
  post: (data) => axiosInstance.post(`/quizzes`, data),
  put: (id, data) => axiosInstance.put(`/quizzes/${id}`, data),
  delete: (id) => axiosInstance.delete(`/quizzes/${id}`),

}

export default QuizService
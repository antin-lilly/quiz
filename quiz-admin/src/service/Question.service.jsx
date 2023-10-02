import { axiosInstance } from './HTTP'

const QuestionService = {
  getOptions: (id) => axiosInstance.get(`/questions/${id}/options`),
  post: (data = {}) => axiosInstance.post(`/questions`, data),
  put: (id, data = {}) => axiosInstance.put(`/questions/${id}`, data),
  delete: (id) => axiosInstance.delete(`/questions/${id}`),

}

export default QuestionService
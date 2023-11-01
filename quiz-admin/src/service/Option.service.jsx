import { axiosInstance } from './HTTP'

const OptionService = {
  post: (data, token) => axiosInstance.post(`/options`, data, { headers: { Authorization: token } }),
  put: (id, data, token) => axiosInstance.put(`/options/${id}`, data, { headers: { Authorization: token } }),
  delete: (id, token) => axiosInstance.delete(`/options/${id}`, { headers: { Authorization: token } }),

}

export default OptionService
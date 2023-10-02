import { axiosInstance } from './HTTP'

const OptionService = {
  post: (data) => axiosInstance.post(`/options`, data),
  put: (id, data) => axiosInstance.put(`/options/${id}`, data),
  delete: (id) => axiosInstance.delete(`/options/${id}`),

}

export default OptionService
import { axiosInstance } from "./HTTP";

const QuestionService = {
  getOptions: (id) => axiosInstance.get(`/questions/${id}/options`),
};

export default QuestionService;

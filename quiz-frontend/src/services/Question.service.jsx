import { axiosInstance } from "./HTTP";

const QuestionService = {
  getOptions: (id, token) => axiosInstance.get(`/questions/${ id }/options`, { headers: { Authorization: token } }),
  getQuestions: (i, token) => axiosInstance.get(`/quizzes/${ id }/questions`, { headers: { Authorization: token } }),
};

export default QuestionService;

import { axiosInstance } from "./HTTP";

const QuestionService = {
  getOptions: (id) => axiosInstance.get(`/questions/${ id }/options`),
  getQuestions: (id) => axiosInstance.get(`/quizzes/${ id }/questions`),
};

export default QuestionService;

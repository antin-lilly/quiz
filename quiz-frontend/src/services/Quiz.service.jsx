import { axiosInstance } from "./HTTP";

const QuizService = {
  getAll: () => axiosInstance.get("/quizzes"),
  getQuestions: (id) => axiosInstance.get(`/quizzes/${ id }/questions`),
};

export default QuizService;

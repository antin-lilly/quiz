import { axiosInstance } from "./HTTP";

const QuizService = {
  getAll: (token) => axiosInstance.get("/quizzes", { headers: { Authorization: token } }),
  getQuestions: (id, token) => axiosInstance.get(`/quizzes/${ id }/questions`, { headers: { Authorization: token } }),
};

export default QuizService;

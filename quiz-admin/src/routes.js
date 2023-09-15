import Questions from "./pages/Questions";
import Quizes from "./pages/Quizes";
import Home from "./pages/Home";
import { Route, Routes, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "quizes",
    element: <Quizes />,
  },
  {
    path: "/questions",
    element: <Questions />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

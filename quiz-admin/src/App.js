import { RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";
import { router } from "./routes";
import BaseLayout from "./components/BaseLayout/BaseLayout";
import Quizes from "./pages/Quizes";
import Questions from "./pages/Questions";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route path="/quizes" element={<Quizes />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

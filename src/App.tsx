import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { QuizPage } from "./pages/quiz-definition/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quiz">
          <Route path=":quizType" element={<QuizPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

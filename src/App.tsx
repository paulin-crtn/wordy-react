import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { QuizDefinition } from "./pages/quiz-definition/QuizDefinition";
import { QuizWord } from "./pages/quiz-word/QuizWord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quiz">
          <Route path="definition" element={<QuizDefinition />} />
          <Route path="word" element={<QuizWord />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

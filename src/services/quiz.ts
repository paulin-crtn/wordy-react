/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { getRandomValue, shuffleArray } from "../utils/array";
import { IQuiz } from "../interfaces/IQuiz";
import { IDefinition } from "../interfaces/IDefinition";
import { data } from "../assets/data";
import { IWord } from "../interfaces/IWord";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const buildQuiz = (quizType: string): IQuiz => {
  const wordsExcluded = localStorage.getItem("wordy-pulled-words");
  let words = [...data];
  if (wordsExcluded) {
    words = data.filter((word) => wordsExcluded.includes(word.value));
  }
  const pulledWord: IWord = getRandomValue(words);
  const otherWords: IWord[] = shuffleArray(words).slice(0, 3);

  const definition = getRandomValue(pulledWord.definitions);
  const quiz: IQuiz = _buildDefinitionQuiz(pulledWord.value, definition);
  _addChoicesToDefinitionQuiz(quiz, otherWords);
  shuffleArray(quiz.choices);
  return quiz;
};

// localStorage.removeItem("wordy-best-score");
// localStorage.removeItem("wordy-pulled-words");

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
const _addChoicesToDefinitionQuiz = (quiz: IQuiz, otherWords: IWord[]) => {
  for (const word of otherWords) {
    quiz.choices.push({
      value: getRandomValue(word.definitions).value,
      isCorrect: false,
    });
  }
};

const _addChoicesToWordQuiz = (quiz: IQuiz, otherWords: IWord[]) => {
  for (const word of otherWords) {
    quiz.choices.push({
      value: word.value,
      isCorrect: false,
    });
  }
};

const _buildDefinitionQuiz = (word: string, definition: IDefinition): IQuiz => {
  return {
    pulled: word,
    synonyms: definition.synonyms,
    antonyms: definition.antonyms,
    choices: [{ value: definition.value, isCorrect: true }],
  };
};

// const _buildWordQuiz = (word: string, definition: IDefinition): IQuiz => {
//   return {
//     pulled: definition.value,
//     definitions: word.definitions
//       .map((definition: IDefinition) => definition.value)
//       .filter((value: string) => value != definition.value),
//     choices: [{ value: word.value, isCorrect: true }],
//   };
// };

// const _getQuizWords = (choicesCount: number, wordsExcluded: string[]) => {
//   const pulledWord: IWord = _getRandomWords(1, wordsExcluded)[0];
//   const otherWords = _getRandomWords(choicesCount - 1, [pulledWord.value]);
//   return { pulledWord, otherWords };
// };

// const _getRandomWords = (size: number, wordsExcluded: string[]) => {
//   const words: IWord[] = shuffleArray(WORDS);
//   return words.slice(0, size);
// };

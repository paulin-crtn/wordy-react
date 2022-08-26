/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import _ from "lodash";
import { IQuiz } from "../interfaces/IQuiz";
import { IDefinition } from "../interfaces/IDefinition";
import { IWord } from "../interfaces/IWord";
import { QuizTypeEnum } from "../enum/QuizTypeEnum";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getQuiz = (quizType: QuizTypeEnum, data: IWord[]): IQuiz => {
  // Get previous pulled words from local storage
  let excludedWords: string[] = JSON.parse(
    localStorage.getItem("wordy-pulled-words") || "[]"
  );

  // Filter previous pulled words
  let availableWords: IWord[] = data.filter(
    (word) => !excludedWords.includes(word.value)
  );

  // Reset the game if there is no words left
  if (!availableWords.length) {
    localStorage.removeItem("wordy-pulled-words");
    excludedWords = [];
    availableWords = [...data];
  }

  // Get a random word from availableWords (Fisher-Yates shuffle)
  const pulledWord: IWord = _.shuffle(availableWords)[0];

  // Set previous pulled words to local storage
  localStorage.setItem(
    "wordy-pulled-words",
    JSON.stringify([...excludedWords, pulledWord.value])
  );

  // Shuffle pulledWord definitions
  const definitions: IDefinition[] = _.shuffle(pulledWord.definitions);

  // Get other words (pulled word excluded)
  const otherWords: IWord[] = _.without(_.shuffle(data), pulledWord);

  // Build and return definition quiz
  if (quizType === QuizTypeEnum.DEFINITION) {
    const quiz: IQuiz = _buildDefinitionQuiz(pulledWord.value, definitions[0]);
    _addChoicesToDefinitionQuiz(quiz, otherWords.slice(0, 2));
    quiz.choices = _.shuffle(quiz.choices);
    return quiz;
  }

  // Build and return word quiz
  const quiz: IQuiz = _buildWordQuiz(pulledWord.value, definitions);
  _addChoicesToWordQuiz(quiz, otherWords.slice(0, 3));
  quiz.choices = _.shuffle(quiz.choices);
  return quiz;
};

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
const _addChoicesToDefinitionQuiz = (quiz: IQuiz, otherWords: IWord[]) => {
  for (const word of otherWords) {
    quiz.choices.push({
      value: _.shuffle(word.definitions)[0].value,
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

const _buildWordQuiz = (word: string, definitions: IDefinition[]): IQuiz => {
  return {
    pulled: definitions[0].value,
    definitions: definitions
      .slice(1, definitions.length)
      .map((definition: IDefinition) => definition.value),
    choices: [{ value: word, isCorrect: true }],
  };
};

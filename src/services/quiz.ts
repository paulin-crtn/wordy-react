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
export const getQuiz = (quizType: QuizTypeEnum, words: IWord[]): IQuiz => {
  const excludedWords: string[] = _getExcludedWords();
  const availableWords: IWord[] = _getAvailableWords(words, excludedWords);

  if (!availableWords.length) {
    localStorage.removeItem("wordy-pulled-words");
    return getQuiz(quizType, words);
  }

  const pulledWord: IWord = _.shuffle(availableWords)[0]; // Fisher-Yates shuffle

  _setExcludedWords(excludedWords, pulledWord);

  const definitions: IDefinition[] = _.shuffle(pulledWord.definitions);
  const otherWords: IWord[] = _.without(_.shuffle(words), pulledWord);

  const quiz: IQuiz =
    quizType === QuizTypeEnum.DEFINITION
      ? _buildDefinitionQuiz(pulledWord.value, definitions[0])
      : _buildWordQuiz(pulledWord.value, definitions);

  quizType === QuizTypeEnum.DEFINITION
    ? _addChoicesToDefinitionQuiz(quiz, otherWords.slice(0, 2))
    : _addChoicesToWordQuiz(quiz, otherWords.slice(0, 3));

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

const _getAvailableWords = (words: IWord[], excludedWords: string[]) => {
  return words.filter((word) => !excludedWords.includes(word.value));
};

const _getExcludedWords = (): string[] => {
  return JSON.parse(localStorage.getItem("wordy-pulled-words") || "[]");
};

const _setExcludedWords = (
  excludedWords: string[],
  pulledWord: IWord
): void => {
  localStorage.setItem(
    "wordy-pulled-words",
    JSON.stringify([...excludedWords, pulledWord.value])
  );
};

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

import { assert } from "chai";
import { getQuiz } from "../services/quiz";
import { QuizTypeEnum } from "../enum/QuizTypeEnum";
import { mockedWords } from "../mock/words";
import "mock-local-storage";

/* -------------------------------------------------------------------------- */
/*                                    TESTS                                   */
/* -------------------------------------------------------------------------- */
describe("POST /quiz/word", function () {
  it("Quiz object contains all keys", function () {
    const response = getQuiz(QuizTypeEnum.WORD, mockedWords);
    assert.hasAllDeepKeys(response, ["pulled", "definitions", "choices"]);
    assert.hasAllDeepKeys(response.choices[0], ["value", "isCorrect"]);
  });

  it("Quiz pulled value is string", function () {
    const response = getQuiz(QuizTypeEnum.WORD, mockedWords);
    assert.isString(response.pulled);
  });

  it("Choices array contains 4 options", function () {
    const response = getQuiz(QuizTypeEnum.WORD, mockedWords);
    assert.equal(response.choices.length, 4);
  });

  it("Choices array contains the correct options", function () {
    const response = getQuiz(QuizTypeEnum.WORD, mockedWords);
    const resChoices = response.choices.map((choice: any) => choice.value);
    assert.include(resChoices, mockedWords[0].value);
    assert.include(resChoices, mockedWords[1].value);
    assert.include(resChoices, mockedWords[2].value);
    assert.include(resChoices, mockedWords[3].value);
  });

  it("Choices array contains the correct response", function () {
    const response = getQuiz(QuizTypeEnum.WORD, mockedWords);
    // Retrieve in mocked data the definition marked as isCorrect in response
    const resCorrectWord = response.choices.filter(
      (choice: any) => choice.isCorrect
    )[0].value;
    const mockedPulledDefinition = mockedWords.filter(
      (word: any) => word.value === resCorrectWord
    )[0].definitions[0].value;
    assert.equal(response.pulled, mockedPulledDefinition);
  });

  it("Pulled word is not from excluded ids", function () {
    localStorage.setItem(
      "wordy-pulled-words",
      JSON.stringify([
        mockedWords[0].value,
        mockedWords[1].value,
        mockedWords[2].value,
      ])
    );
    const response = getQuiz(QuizTypeEnum.WORD, mockedWords);
    // Retrieve in mocked data the definition marked as pulled in response
    const resWrongWords = response.choices
      .filter((choice: any) => !choice.isCorrect)
      .map((choice: any) => choice.value);
    const mockedPulledDefinition = mockedWords.filter(
      (word: any) => !resWrongWords.includes(word.value)
    )[0].definitions[0].value;
    assert.equal(response.choices.length, 4);
    assert.equal(response.pulled, mockedPulledDefinition);
  });

  it("Returns data when all ids are excluded", function () {
    localStorage.setItem(
      "wordy-pulled-words",
      JSON.stringify([
        mockedWords[0].value,
        mockedWords[1].value,
        mockedWords[2].value,
        mockedWords[3].value,
      ])
    );
    const response = getQuiz(QuizTypeEnum.WORD, mockedWords);
    assert.exists(response);
    assert.isNotEmpty(response);
  });
});

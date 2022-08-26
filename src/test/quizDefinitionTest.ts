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
describe("POST /quiz/definition", function () {
  it("Quiz object contains all keys", function () {
    const response = getQuiz(QuizTypeEnum.DEFINITION, mockedWords);
    assert.hasAllDeepKeys(response, [
      "pulled",
      "synonyms",
      "antonyms",
      "choices",
    ]);
    assert.hasAllDeepKeys(response.choices[0], ["value", "isCorrect"]);
  });

  it("Quiz pulled value is string", function () {
    const response = getQuiz(QuizTypeEnum.DEFINITION, mockedWords);
    assert.isString(response.pulled);
  });

  it("Choices array contains 3 options", function () {
    const response = getQuiz(QuizTypeEnum.DEFINITION, mockedWords);
    assert.equal(response.choices.length, 3);
  });

  it("Choices array contains the correct options", function () {
    const response = getQuiz(QuizTypeEnum.DEFINITION, mockedWords.slice(0, 3));
    const resChoices = response.choices.map((choice: any) => choice.value);
    const mockedChoices = mockedWords.map(
      (word: any) => word.definitions[0].value
    );
    assert.include(resChoices, mockedChoices[0]);
    assert.include(resChoices, mockedChoices[1]);
    assert.include(resChoices, mockedChoices[2]);
  });

  it("Choices array contains the correct response", function () {
    const response = getQuiz(QuizTypeEnum.DEFINITION, mockedWords.slice(0, 3));
    // Retrieve in mocked data the word marked as isCorrect in response
    const resCorrectDefinition = response.choices.filter(
      (choice: any) => choice.isCorrect
    )[0].value;
    const mockedPulledWord = mockedWords.filter(
      (word: any) => word.definitions[0].value === resCorrectDefinition
    )[0].value;
    assert.equal(response.pulled, mockedPulledWord);
  });

  it("Pulled word is not from excluded ids", function () {
    localStorage.setItem(
      "wordy-pulled-words",
      JSON.stringify([mockedWords[0].value, mockedWords[1].value])
    );
    const response = getQuiz(QuizTypeEnum.DEFINITION, mockedWords.slice(0, 3));
    // Retrieve in mocked data the word marked as pulled in response
    const resWrongDefinitions = response.choices
      .filter((choice: any) => !choice.isCorrect)
      .map((choice: any) => choice.value);
    const mockedPulledWord = mockedWords.filter(
      (word: any) => !resWrongDefinitions.includes(word.definitions[0].value)
    )[0].value;
    assert.equal(response.choices.length, 3);
    assert.equal(response.pulled, mockedPulledWord);
  });

  it("Returns data when all ids are excluded", function () {
    localStorage.setItem(
      "wordy-pulled-words",
      JSON.stringify([
        mockedWords[0].value,
        mockedWords[1].value,
        mockedWords[2].value,
      ])
    );
    const response = getQuiz(QuizTypeEnum.DEFINITION, mockedWords.slice(0, 3));
    assert.exists(response);
    assert.isNotEmpty(response);
  });
});

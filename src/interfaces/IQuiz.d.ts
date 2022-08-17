import { IChoice } from "./IChoice";

export interface IQuiz {
  pulled: {
    documentId: string;
    value: string;
  };
  synonyms?: string[];
  antonyms?: string[];
  definitions?: string[];
  choices: IChoice[];
}

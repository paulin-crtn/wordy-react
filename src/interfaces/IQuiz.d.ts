import { IChoice } from "./IChoice";

export interface IQuiz {
  pulled: string;
  synonyms?: string[];
  antonyms?: string[];
  definitions?: string[];
  choices: IChoice[];
}

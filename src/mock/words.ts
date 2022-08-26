/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { IWord } from "../interfaces/IWord";

/* -------------------------------------------------------------------------- */
/*                                 MOCKED DATA                                */
/* -------------------------------------------------------------------------- */
export const mockedWords: IWord[] = [
  {
    value: "affliction",
    definitions: [
      {
        value: "Immense tristesse, chagrin, souffrance, accablement.",
        antonyms: [],
        synonyms: [],
      },
    ],
  },
  {
    value: "abscons",
    definitions: [
      {
        value: "Qui est difficile à comprendre.",
        antonyms: [],
        synonyms: ["abstrus", "obscur", "confus"],
      },
    ],
  },
  {
    value: "ambition",
    definitions: [
      {
        value: "Vif désir de réussir quelque chose.",
        antonyms: [],
        synonyms: ["aspiration", "quête", "but", "idéal", "projet"],
      },
    ],
  },
  {
    value: "dialectique",
    definitions: [
      {
        value:
          "Art de conduire un raisonnement rigoureux sous la forme : thèse, antithèse et synthèse.",
        antonyms: [],
        synonyms: ["argumentation", "logique"],
      },
    ],
  },
];

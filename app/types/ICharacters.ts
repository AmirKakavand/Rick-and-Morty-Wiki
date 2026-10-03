import { ICharacter } from "./ICharacter";

export interface ICharacters {
  info: Info;
  results: ICharacter[];
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

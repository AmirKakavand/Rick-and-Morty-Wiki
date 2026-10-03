import useSWR from "swr";
import { ICharacters } from "../types/ICharacters";

export const useMultipleCharacters = (url: string, pageNo: number, name:string = "") => {
  let fullURL = "";

  if(name === "") {
    fullURL = url + "/?page=" + pageNo;
  } else {
    fullURL = url + "/?name=" + name + "&page=" + pageNo
  }

  const fetcher = () => fetch(fullURL).then((res) => res.json());
  const { data, isLoading, error } = useSWR<ICharacters, Error>(
    fullURL,
    fetcher
  );

  return {
    characters: data,
    isLoading,
    error,
  };
};

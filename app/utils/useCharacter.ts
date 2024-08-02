"use client"
import useSWR from "swr";
import { ICharacter } from "../types/ICharacter";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCharacter = (characterId: string | number) => {
  const { data, error, isLoading } = useSWR<ICharacter, Error>(
    `https://rickandmortyapi.com/api/character/${characterId}`,
    fetcher
  );

  return {
    character: data,
    isLoading,
    error
  }
};

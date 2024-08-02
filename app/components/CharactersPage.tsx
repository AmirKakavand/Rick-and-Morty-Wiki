"use client";
import { useState } from "react";
import { CharacterCard } from "../components/CharacterCard";
import { useMultipleCharacters } from "../utils/useMultipleCharacters";
import PageNavigation from "./PageNavigation";

interface IProps {
  pageNo: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  searchQuery?: string
}

export const CharactersPage = (props: IProps) => {
  const { characters, isLoading, error } = useMultipleCharacters(
    "https://rickandmortyapi.com/api/character",
    props.pageNo,
    props.searchQuery
  );

  const lastPageNo = Math.ceil(characters?.info?.count! / 20);
  return (
    <>
      <section className="flex items-center sm:items-stretch flex-row justify-around flex-wrap">
        {characters?.results?.map((character) => (
          <div key={character.id} className="w-10/12 md:w-1/4 my-6">
            <CharacterCard characterId={character.id} />
          </div>
        ))}
        {props.pageNo < lastPageNo - 1 &&
          characters?.results?.map((character) => (
            <div
              // style={{ display: "none" }}
              key={character.id}
              className="hidden w-1/4 my-6"
            >
              <CharacterCard characterId={character.id + 20} />
            </div>
          ))}
      </section>
      <PageNavigation
        pageNo={props.pageNo}
        setPageNo={props.setPageNo}
        lastPageNo={lastPageNo}
      />
    </>
  );
};

"use client";
import { Dispatch, SetStateAction } from "react";
import { CharacterCard } from "../components/CharacterCard";
import { useMultipleCharacters } from "../utils/useMultipleCharacters";
import PageNavigation from "./PageNavigation";

interface IProps {
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  tempPageNo: number | string;
  setTempPageNo: Dispatch<SetStateAction<number | string>>;
  searchQuery?: string;
}

export const CharactersPage = (props: IProps) => {
  const { characters, isLoading, error } = useMultipleCharacters(
    "https://rickandmortyapi.com/api/character",
    props.pageNo,
    props.searchQuery,
  );

  const lastPageNo = Math.ceil((characters?.info?.count || 0) / 20);

  return (
    <>
      <section className="flex items-center sm:items-stretch flex-row justify-around flex-wrap">
        {characters?.results?.map((character: any) => (
          <div key={character.id} className="w-10/12 md:w-1/4 my-6">
            {/* Pass the entire character object as a prop */}
            <CharacterCard character={character} />
          </div>
        ))}
      </section>
      <PageNavigation
        pageNo={props.pageNo}
        setPageNo={props.setPageNo}
        lastPageNo={lastPageNo}
        tempPageNo={props.tempPageNo}
        setTempPageNo={props.setTempPageNo}
      />
    </>
  );
};

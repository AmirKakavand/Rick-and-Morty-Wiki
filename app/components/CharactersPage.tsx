"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { CharacterCard } from "../components/CharacterCard";
import { CharacterModal } from "../components/CharacterModal";
import { StarfieldBackground } from "../components/StarfieldBackground";
import { useMultipleCharacters } from "../utils/useMultipleCharacters";
import PageNavigation from "./PageNavigation";
import Footer from "./Footer";
import { ICharacter } from "../types/ICharacter";

interface IProps {
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  tempPageNo: number | string;
  setTempPageNo: Dispatch<SetStateAction<number | string>>;
  searchQuery?: string;
}

const LOOLI_CHARACTER: ICharacter = {
  id: 99999,
  name: "Looli",
  status: "Alive",
  species: "Angel",
  type: "Angel in disguise of a human",
  gender: "Female",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Earth (Replacement Dimension)",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  image: "/Rick-and-Morty-Wiki/images/looli.jpg",
  episode: ["https://rickandmortyapi.com/api/episode/15"],
  url: "https://rickandmortyapi.com/api/character/99999",
  created: "1998-04-04T18:48:46.250Z",
};

export const CharactersPage = (props: IProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  );

  // Smoothly scroll back to the top whenever the page number changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [props.pageNo]);

  const { characters, isLoading, error } = useMultipleCharacters(
    "https://rickandmortyapi.com/api/character",
    props.pageNo,
    props.searchQuery
  );

  const lastPageNo =
    characters?.info?.pages ?? Math.ceil((characters?.info?.count || 0) / 20);

  if (isLoading) {
    return (
      <>
        <StarfieldBackground />
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between overflow-x-hidden">
          <section className="w-full max-w-7xl mx-auto px-5 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="slate-card-surface border-4 border-[#F9F4DA] shadow-[6px_6px_0px_#F9F4DA] p-3 animate-pulse"
              >
                <div className="cream-surface aspect-square w-full border-4 border-black" />
                <div className="cream-surface mt-3 h-11 border-4 border-black" />
              </div>
            ))}
          </section>
          {!selectedCharacter && <Footer />}
        </div>
      </>
    );
  }

  const baseResults: ICharacter[] = characters?.results
    ? [...characters.results]
    : [];
  const normalizedQuery = (props.searchQuery || "").trim().toLowerCase();

  // Inject Looli on Page 2 while keeping total characters on Page 2 at exactly 20
  let displayedCharacters = baseResults;
  if (!normalizedQuery && props.pageNo === 2) {
    displayedCharacters = [
      ...baseResults.slice(0, 2),
      LOOLI_CHARACTER,
      ...baseResults.slice(2, 19),
    ];
  } else if (
    normalizedQuery &&
    "looli".includes(normalizedQuery) &&
    props.pageNo === 1
  ) {
    displayedCharacters = [LOOLI_CHARACTER, ...baseResults.slice(0, 19)];
  }

  if (
    (error && displayedCharacters.length === 0) ||
    !displayedCharacters.length
  ) {
    return (
      <>
        <StarfieldBackground />
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between overflow-x-hidden">
          <div className="w-full max-w-xl mx-auto my-16 px-5">
            <div className="bg-[linear-gradient(#FF2A55,#FF2A55)] bg-[#FF2A55] !text-white border-4 border-[#F9F4DA] shadow-[6px_6px_0px_#F9F4DA] p-6 text-center">
              <p className="text-2xl uppercase !text-white">
                ERROR 404 // NO_SUBJECTS_FOUND
              </p>
              <p className="mt-2 text-sm !text-white">
                No matching lifeforms detected in this dimension.
              </p>
            </div>
          </div>
          {!selectedCharacter && <Footer />}
        </div>
      </>
    );
  }

  return (
    <>
      <StarfieldBackground />
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between overflow-x-hidden">
        <div>
          <section className="w-full max-w-7xl mx-auto px-5 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedCharacters.map((character: ICharacter) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={setSelectedCharacter}
              />
            ))}
          </section>

          <PageNavigation
            pageNo={props.pageNo}
            setPageNo={props.setPageNo}
            lastPageNo={lastPageNo || 1}
            tempPageNo={props.tempPageNo}
            setTempPageNo={props.setTempPageNo}
          />
        </div>

        {!selectedCharacter && <Footer />}

        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      </div>
    </>
  );
};
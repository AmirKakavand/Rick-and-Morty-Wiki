"use client";
import { useCharacter } from "../utils/useCharacter";
import Image from "next/image"
import { useEpisode } from "../utils/useEpisode";

interface IProps {
  characterId: string | number;
}

export const CharacterCard = (props: IProps) => {
  const { character, isLoading, error } = useCharacter(props.characterId);

  const firstEpisode = character?.episode[0];

  const {
    number: firstEpisodeNumber,
  } = useEpisode(firstEpisode!);

  return (
    // <>
    //   {isLoading && <p>Loading...</p>}
    //   {error && <p>Something went wrong</p>}
    //   {character && <p>Character Name: {character.name}</p>}
    // </>
    <article className="character-card h-full pb-4 mx-2 sm:m-6 shadow-neutral-300/25 rounded-xl flex flex-col justify-around items-center bg-cardBgColor">
      <header className="text-center my-2">
        <h2 className="text-3xl">{character?.name}</h2>
      </header>

      <figure className="flex flex-col mb-1 w-11/12">
        {character?.image && <Image
          src={character.image}
          width={500}
          height={500}
          alt={`Illustration of ${character?.name}`}
        />}
      </figure>

      <section className="text-center px-2 flex flex-col gap-2 text-md">
        <p>Origin: {character?.origin.name}</p>
        <p>First seen in episode: {firstEpisodeNumber}</p>
        <p>
          Last known location: <br />
          {character?.location.name}
        </p>
        <p>
          Status: <br />{" "}
          <span
            className={
              character?.status === "Dead"
                ? "bg-red-600 p-1 rounded"
                : character?.status === "Alive"
                ? "bg-green-700 p-1 rounded"
                : "bg-yellow-500 p-1 rounded"
            }
          >
            {character?.status}
          </span>
        </p>
      </section>
    </article>
  );
};

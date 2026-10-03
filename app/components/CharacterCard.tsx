"use client";
import Image from "next/image";

// Define the character type based on the API response structure
interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  origin: { name: string };
  location: { name: string };
  episode: string[];
}

interface IProps {
  character: Character;
}

export const CharacterCard = ({ character }: IProps) => {
  // Extract episode number directly from the URL string to save an API call
  const firstEpisodeUrl = character?.episode?.[0];
  const firstEpisodeNumber = firstEpisodeUrl
    ? firstEpisodeUrl.split("/").pop()
    : "Unknown";

  return (
    <article className="character-card h-full pb-4 mx-2 sm:m-4 shadow-neutral-300/25 rounded-xl flex flex-col justify-around items-center">
      <header className="text-center my-2 sm:my-0">
        <h2 className="text-3xl">{character?.name}</h2>
      </header>

      <figure className="flex flex-col mb-1 w-11/12">
        {character?.image && (
          <Image
            src={character.image}
            width={500}
            height={500}
            alt={`Illustration of ${character?.name}`}
          />
        )}
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

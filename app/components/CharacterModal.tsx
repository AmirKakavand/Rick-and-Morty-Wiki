"use client";
import { useEffect } from "react";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { ICharacter } from "../types/ICharacter";

interface IProps {
    character: ICharacter | null;
    onClose: () => void;
}

export const CharacterModal = ({ character, onClose }: IProps) => {
    useEffect(() => {
        if (!character) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [character, onClose]);

    if (!character) return null;

    const episodes = character.episode.map((url) => url.split("/").pop());
    const firstEpisode = episodes[0] || "Unknown";
    const lastEpisode = episodes[episodes.length - 1] || "Unknown";
    const createdDate = new Date(character.created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-5 py-4 bg-black/80 backdrop-blur-xs overflow-x-hidden"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto overflow-x-hidden bg-[#1E293B] text-black border-4 border-[#F9F4DA] shadow-[5px_5px_0px_#F9F4DA] sm:shadow-[7px_7px_0px_#F9F4DA]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top OS Window Bar matching CharacterCard */}
                <div className="sticky top-0 z-20 bg-[#334155] text-[#F9F4DA] px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 border-b-4 border-[#F9F4DA]">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[#00E676] shrink-0">&gt;_</span>
                        <span className="text-xs sm:text-sm tracking-wider uppercase text-[#F9F4DA] truncate">
                            FILE // {character.name}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className="bg-[#FF2A55] text-white border-2 border-black shadow-[2px_2px_0px_#000000] px-2 py-0.5 text-xs uppercase hover:bg-[#F9F4DA] hover:text-black active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1 focus:outline-none"
                        >
                            <IoCloseOutline className="w-5 h-5" />
                            ESC
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                    {/* Top Bio Card */}
                    <div className="bg-[#F9F4DA] border-4 border-black p-4 shadow-[5px_5px_0px_#000000] flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                        <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 border-4 border-black shadow-[4px_4px_0px_#000000] bg-white overflow-hidden">
                            <Image
                                src={character.image}
                                fill
                                sizes="176px"
                                alt={character.name}
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col text-center sm:text-left flex-1 min-w-0 w-full">
                            <h2 className="font-normal text-xl sm:text-4xl uppercase tracking-wide text-black break-words">
                                {character.name}
                            </h2>

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 text-xs uppercase">
                                <span
                                    className={`px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#000000] ${character.status === "Alive"
                                            ? "bg-[#00E676] text-black"
                                            : character.status === "Dead"
                                                ? "bg-[#FF2A55] text-white"
                                                : "bg-yellow-500 text-black"
                                        }`}
                                >
                                    STATUS: {character.status}
                                </span>
                                <span className="px-3 py-1 bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000000]">
                                    {character.species}
                                </span>
                                <span className="px-3 py-1 bg-[#38BDF8] text-black border-2 border-black shadow-[3px_3px_0px_#000000]">
                                    {character.gender}
                                </span>
                            </div>

                            {character.type && (
                                <div className="mt-4 p-2.5 bg-white border-2 border-black text-xs flex flex-col sm:flex-row items-center sm:items-baseline gap-1.5 sm:gap-2 break-words">
                                    <span className="uppercase bg-black text-[#F9F4DA] px-2 py-0.5 shrink-0">
                                        TYPE / SUBSPECIES
                                    </span>
                                    <span className="text-black text-center sm:text-left">
                                        {character.type}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Data Buffer Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3.5 bg-[#F9F4DA] border-4 border-black shadow-[4px_4px_0px_#000000]">
                            <p className="text-xs uppercase text-neutral-600">
                                {"// ORIGIN_POINT"}
                            </p>
                            <p className="text-base text-black mt-1 break-words">
                                {character.origin.name}
                            </p>
                        </div>

                        <div className="p-3.5 bg-[#F9F4DA] border-4 border-black shadow-[4px_4px_0px_#000000]">
                            <p className="text-xs uppercase text-neutral-600">
                                {"// LAST_KNOWN_LOCATION"}
                            </p>
                            <p className="text-base text-black mt-1 break-words">
                                {character.location.name}
                            </p>
                        </div>

                        <div className="p-3.5 bg-[#F9F4DA] border-4 border-black shadow-[4px_4px_0px_#000000]">
                            <p className="text-xs uppercase text-neutral-600">
                                {"// FIRST_AND_LAST_SEEN"}
                            </p>
                            <p className="text-base text-black mt-1">
                                EPISODE {firstEpisode} &rarr; EPISODE {lastEpisode}
                            </p>
                        </div>

                        <div className="p-3.5 bg-[#F9F4DA] border-4 border-black shadow-[4px_4px_0px_#000000]">
                            <p className="text-xs uppercase text-neutral-600">
                                {"// ARCHIVE_TIMESTAMP"}
                            </p>
                            <p className="text-base text-black mt-1">
                                {createdDate}
                            </p>
                        </div>
                    </div>

                    {/* Episodes Log */}
                    <div className="bg-[#F9F4DA] border-4 border-black p-4 shadow-[5px_5px_0px_#000000]">
                        <h3 className="text-xs uppercase tracking-wider text-black mb-3 border-b-2 border-dashed border-black pb-2">
                            APPEARANCE_LOG ({episodes.length}{" "}
                            {episodes.length === 1 ? "EPISODE" : "EPISODES"})
                        </h3>
                        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                            {episodes.map((ep) => (
                                <span
                                    key={ep}
                                    className="px-2.5 py-1 text-xs bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000000]"
                                >
                                    EP_{ep}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
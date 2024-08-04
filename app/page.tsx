"use client";
import { useState, useEffect } from "react";
import { CharactersPage } from "./components/CharactersPage";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { handleSearch } from "./utils/handleSearch";

export default function Home() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mouseHover, setMouseHover] = useState<boolean>(false);

  useEffect (() => handleSearch({ name, setSearchQuery, setPageNo }), [name])
  return (
    <main className={mainClass}>
      <header className="flex flex-col md:flex-row justify-around">
        <h1 className={h1Class}>Rick and Morty Wiki</h1>
        <div className="flex items-center justify-around input-group relative">
          <input
            type="text"
            className={searchBarClass}
            placeholder="Search by name"
            value={name}
            onChange={(event) => {
              setName((prevName) => {
                return event.target.value;
              })
            }}
          />
          <div className= "hidden md:inline text-slate-600 inset-y-auto right-0.5 md:right-4 absolute">
            {name === "" ? (
              <MagnifyingGlassIcon className="w-7 h-7" />
            ) : (
              <XMarkIcon
                className={mouseHover ? "w-7 h-7 cursor-pointer" : "w-7 h-7"}
                onMouseEnter={() => setMouseHover(true)}
                onMouseLeave={() => setMouseHover(false)}
                onClick={() => {
                  setName("");
                  setSearchQuery("");
                }}
              />
            )}
          </div>
        </div>
      </header>

      {searchQuery === "" && (
        <CharactersPage pageNo={pageNo} setPageNo={setPageNo} />
      )}
      {searchQuery !== "" && (
        <CharactersPage
          pageNo={pageNo}
          setPageNo={setPageNo}
          searchQuery={searchQuery}
        />
      )}
    </main>
  );
}

const mainClass = [
  "min-h-screen",
  // "max-w-11/12",
  "p-4",
  "text-mainTextColor",
  "selection:bg-slate-800",
  "selection:text-orange-500",
  "my-auto",
].join(" ");

const h1Class = [
  "font-bold",
  "text-center",
  "my-auto",
  "text-2xl",
  "md:text-5xl",
].join(" ");

const searchBarClass = [
  "text-neutral-800",
  "rounded-xl",
  "my-6",
  "md:my-auto",
  "px-0",
  "md:px-4",
  "h-10",
  "sm:h-12",
  "text-xl",
  "md:text-3xl",
  "text-center",
  "bg-[#F9F4DA]",
  "text-[#231F20]",
  "shadow-[10px_10px_#231F20,11px_11px_#F9F4DA]",
  "border-2",
  "border-[#F9F4DA]",
  "text-shadow-[-1px_-1px_0_#666,1px_-1px_0_#666,-1px_1px_0_#666,1px_1px_0_#666",
  "focus:ring-indigo-500",
].join(" ");

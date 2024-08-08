"use client";
import { useState, useEffect } from "react";
import { CharactersPage } from "./components/CharactersPage";
import { handleSearch } from "./utils/handleSearch";
import Header from "./components/Header";

export default function Home() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => handleSearch({ name, setSearchQuery, setPageNo }), [name]);
  return (
    <main className={mainClass}>
      <Header name={name} setName={setName} setSearchQuery={setSearchQuery} />
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

// tailwind classes

const mainClass = [
  "min-h-screen",
  // "max-w-11/12",
  "p-4",
  "text-mainTextColor",
  "selection:bg-slate-800",
  "selection:text-orange-500",
  "my-auto",
].join(" ");

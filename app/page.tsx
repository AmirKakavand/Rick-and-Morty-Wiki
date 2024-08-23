"use client";
import { useState, useEffect } from "react";
import { CharactersPage } from "./components/CharactersPage";
import { handleSearch } from "./utils/handleSearch";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tempPageNo, setTempPageNo] = useState<number | string>(1);

  useEffect(() => handleSearch({ name, setSearchQuery, setPageNo }), [name]);
  return (
    <main className={mainClass}>
      <Header
        name={name}
        setPageNo={setPageNo}
        setTempPageNo={setTempPageNo}
        setName={setName}
        setSearchQuery={setSearchQuery}
      />
      {searchQuery === "" && (
        <CharactersPage
          pageNo={pageNo}
          setPageNo={setPageNo}
          tempPageNo={tempPageNo}
          setTempPageNo={setTempPageNo}
        />
      )}
      {searchQuery !== "" && (
        <CharactersPage
          pageNo={pageNo}
          setPageNo={setPageNo}
          searchQuery={searchQuery}
          tempPageNo={tempPageNo}
          setTempPageNo={setTempPageNo}
        />
      )}

      {searchQuery === "" && pageNo === 1 && <Footer />}
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

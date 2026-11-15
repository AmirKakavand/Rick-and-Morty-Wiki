"use client";
import { useState, useEffect, useRef } from "react";
import { CharactersPage } from "./components/CharactersPage";
import { handleSearch } from "./utils/handleSearch";
import Header from "./components/Header";

export default function Home() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tempPageNo, setTempPageNo] = useState<number | string>(1);
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    // Do not run handleSearch on initial mount when name is empty,
    // otherwise its debounce timer resets pageNo back to 1 when the user clicks "Next"!
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setTempPageNo(1);
    return handleSearch({ name, setSearchQuery, setPageNo });
  }, [name]);

  return (
    <main className={mainClass}>
      <div className="w-full flex-1 flex flex-col">
        <Header
          name={name}
          setPageNo={setPageNo}
          setTempPageNo={setTempPageNo}
          setName={setName}
          setSearchQuery={setSearchQuery}
        />
        <CharactersPage
          pageNo={pageNo}
          setPageNo={setPageNo}
          searchQuery={searchQuery}
          tempPageNo={tempPageNo}
          setTempPageNo={setTempPageNo}
        />
      </div>
    </main>
  );
}

const mainClass = [
  "min-h-[100dvh]",
  "w-full",
  "overflow-x-hidden",
  "flex",
  "flex-col",
  "justify-between",
  "text-mainTextColor",
  "selection:bg-slate-800",
  "selection:text-orange-500",
].join(" ");
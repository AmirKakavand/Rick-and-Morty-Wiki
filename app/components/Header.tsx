import { Dispatch, SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

interface IHeaderProps {
  name: string;
  setPageNo: Dispatch<SetStateAction<number>>;
  setTempPageNo: Dispatch<SetStateAction<number | string>>;
  setName: Dispatch<SetStateAction<string>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const Header = ({
  name,
  setPageNo,
  setName,
  setSearchQuery,
  setTempPageNo,
}: IHeaderProps) => {
  const handleReset = () => {
    setSearchQuery("");
    setName("");
    setPageNo(1);
    setTempPageNo(1);
  };

  return (
    <header className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 pt-6 pb-2 overflow-hidden">
      {/* Top Retro System Ticker */}
      <div className="w-full bg-black text-[#00E676] text-xs px-3 sm:px-4 py-1.5 border-x-4 border-t-4 border-black flex items-center justify-between gap-2 overflow-hidden">
        <span className="truncate min-w-0">
          SYSTEM_CHECK: OK // CITADEL_DB: CONNECTED // PORTAL_PROTOCOL: ACTIVE
        </span>
        <span className="hidden sm:inline text-[#F9F4DA] shrink-0">V 2.4.0</span>
      </div>

      {/* Main Console Banner */}
      <div className="w-full bg-[#1E293B] text-white border-4 border-black shadow-[6px_6px_0px_#000000] sm:shadow-[8px_8px_0px_#000000] p-4 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-3 sm:gap-4 text-left group focus:outline-none min-w-0"
        >
          <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 bg-[#FF6B00] text-white text-xl sm:text-3xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_#000000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
            &gt;_
          </div>
          <div className="min-w-0">
            <h1 className="font-normal uppercase tracking-wide text-2xl sm:text-4xl md:text-5xl text-[#FF6B00] [text-shadow:3px_3px_0px_#000000] leading-tight break-words">
              Rick &amp; Morty Wiki
            </h1>
            <p className="text-xs sm:text-sm text-[#F9F4DA] flex items-center gap-2 mt-1">
              MULTIVERSE ARCHIVE
              <span className="inline-block w-2.5 h-2.5 bg-[#00E676] border border-black rounded-full animate-pulse shrink-0" />
              <span className="text-[#00E676]">LIVE</span>
            </p>
          </div>
        </button>

        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <input
            type="text"
            className="w-full text-black placeholder-neutral-500 bg-[#F9F4DA] border-4 border-black px-4 py-3 pr-12 text-base sm:text-lg shadow-[5px_5px_0px_#000000] focus:bg-white focus:border-black focus:ring-0 focus:outline-none focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-[3px_3px_0px_#000000] transition-all"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="inset-y-0 right-3 absolute flex items-center text-black">
            {name === "" ? (
              <IoIosSearch className="w-7 h-7 pointer-events-none" />
            ) : (
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleReset}
                className="bg-black text-white border-2 border-black hover:bg-[#FF2A55] transition-colors focus:outline-none"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
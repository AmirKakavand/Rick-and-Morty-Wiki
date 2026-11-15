import { Dispatch, SetStateAction } from "react";

type IProps = {
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  tempPageNo: number | string;
  setTempPageNo: Dispatch<SetStateAction<number | string>>;
  lastPageNo: number;
};

const PageNavigation = ({
  pageNo,
  setPageNo,
  tempPageNo,
  setTempPageNo,
  lastPageNo,
}: IProps) => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const commitPageChange = () => {
    // If tempPageNo wasn't edited or already matches pageNo, do nothing
    if (tempPageNo === "" || Number(tempPageNo) === pageNo) {
      setTempPageNo(pageNo);
      return;
    }

    const parsed = Number(tempPageNo);
    let targetPage = parsed;

    if (!parsed || parsed < 1) {
      targetPage = 1;
    } else if (parsed > lastPageNo) {
      targetPage = lastPageNo;
    }

    setTempPageNo(targetPage);
    if (targetPage !== pageNo) {
      setPageNo(targetPage);
      scrollToTop();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-5 sm:px-4 mt-8 mb-6">
      <nav className="slate-card-surface w-full flex items-center justify-between gap-2 py-3 px-3 sm:px-6 !text-[#F9F4DA] border-4 border-[#F9F4DA] shadow-[6px_6px_0px_#F9F4DA]">
        <button
          type="button"
          disabled={pageNo <= 1}
          className="cream-surface hover:!bg-[linear-gradient(#FFFFFF,#FFFFFF)] text-xs sm:text-base px-2.5 sm:px-4 py-2 border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-40 disabled:pointer-events-none uppercase transition-all shrink-0 focus:outline-none"
          onClick={() => {
            setPageNo((prevPage) => {
              const nextVal = Math.max(1, prevPage - 1);
              setTempPageNo(nextVal);
              return nextVal;
            });
            scrollToTop();
          }}
        >
          &lt; PREV
        </button>

        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-base uppercase whitespace-nowrap !text-[#F9F4DA]">
          <span>PAGE</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={tempPageNo}
            onFocus={() => setTempPageNo("")}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setTempPageNo(val === "" ? "" : Number(val));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            onBlur={commitPageChange}
            className="cream-surface focus:!bg-[linear-gradient(#FFFFFF,#FFFFFF)] w-10 sm:w-12 text-center border-2 sm:border-4 border-black text-sm sm:text-lg py-0.5 sm:py-1 focus:border-black focus:ring-0 focus:outline-none"
          />
          <span>OF {lastPageNo || 1}</span>
        </div>

        <button
          type="button"
          disabled={pageNo >= lastPageNo}
          className="cream-surface hover:!bg-[linear-gradient(#FF7612,#FF7612)] text-xs sm:text-base px-2.5 sm:px-4 py-2 border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-40 disabled:pointer-events-none uppercase transition-all shrink-0 focus:outline-none"
          onClick={() => {
            setPageNo((prevPage) => {
              const nextVal = Math.min(lastPageNo || 42, prevPage + 1);
              setTempPageNo(nextVal);
              return nextVal;
            });
            scrollToTop();
          }}
        >
          NEXT &gt;
        </button>
      </nav>
    </div>
  );
};

export default PageNavigation;
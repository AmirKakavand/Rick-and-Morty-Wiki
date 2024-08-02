import { useState } from "react";
import { containsOnlyDigits } from "../utils/containsOnlyDigits";

type IProps = {
  pageNo: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  lastPageNo: number;
};

const PageNavigation = (props: IProps) => {
  const [tempPageNo, setTempPageNo] = useState<number | string>(1);
  const [originalPage, setOriginalPage] = useState<number | string>(tempPageNo);
  return (
    <nav
      className="flex flex-row justify-between py-2 px-2 md:px-8 mt-10 mb-5 max-w-xl mx-auto rounded-xl bg-[#F9F4DA] text-[#231F20] shadow-[10px_10px_#231F20,11px_11px_#F9F4DA] border-2 border-[#F9F4DA] text-shadow-[
  -1px_-1px_0_#666,
  1px_-1px_0_#666,
  -1px_1px_0_#666,
  1px_1px_0_#666
]"
    >
      <button
        className="text-sm md:text-2xl px-2 md:px-4 py-1 rounded-md text-cardBgColor font-semibold"
        onClick={() => {
          if (Number(tempPageNo) > 1) {
            setTempPageNo(Number(tempPageNo) - 1);
            props.setPageNo(props.pageNo - 1);
          }
        }}
      >
        Prev
      </button>
      <div className="text-md md:text-2xl">
        <span>
          Page{" "}
          <input
            type="text"
            accept="number"
            maxLength={2}
            value={tempPageNo}
            onClick={(event) => {
              setOriginalPage(tempPageNo);
              setTempPageNo("");
            }}
            onChange={(event) => {
              let userInput: string | number = event.target.value;

              if (containsOnlyDigits(userInput)) {
                userInput = Number(userInput);
                setTempPageNo(userInput);
              }
            }}
            onKeyDown={(event) => {
              // setOriginalPage(tempPageNo)
              if (event.key == "Backspace") {
                if (String(tempPageNo).length <= 1) {
                  console.log("now");
                  setTempPageNo("");
                  // setOriginalPage(1)
                } else setTempPageNo(Number(String(tempPageNo).slice(0, -1)));
              }
              if (event.key === "Enter") {
                if (Number(tempPageNo) <= props.lastPageNo) {
                  if (Number(tempPageNo) === 0) {
                    console.log("it's here");
                    props.setPageNo(1);
                    setOriginalPage(1);
                    setTempPageNo(1);
                  } else {
                    props.setPageNo(Number(tempPageNo));
                    setOriginalPage(tempPageNo);
                  }
                } else {
                  props.setPageNo(props.lastPageNo);
                  setTempPageNo(props.lastPageNo);
                  setOriginalPage(props.lastPageNo);
                }
              }
            }}
            onBlur={() => setTempPageNo(originalPage)}
            className="w-12 text-center text-2xl md:text-3xl bg-mainTextColor font-extrabold border-none rounded-md p-1"
          />{" "}
          of {Number.isNaN(props.lastPageNo) ? ". . ." : props.lastPageNo}
        </span>
      </div>
      <button
        className="text-sm md:text-2xl px-2 md:px-4 py-1 rounded-md text-cardBgColor font-semibold"
        onClick={() => {
          if (Number(tempPageNo) < props.lastPageNo) {
            setTempPageNo(Number(tempPageNo) + 1);
            props.setPageNo(props.pageNo + 1);
          }
        }}
      >
        Next
      </button>
    </nav>
  );
};

export default PageNavigation;

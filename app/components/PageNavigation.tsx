import { useState, Dispatch, SetStateAction } from "react";
import { containsOnlyDigits } from "../utils/containsOnlyDigits";

type IProps = {
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  tempPageNo: number | string;
  setTempPageNo: Dispatch<SetStateAction<number | string>>;
  lastPageNo: number;
};

const PageNavigation = (props: IProps) => {
  const [originalPage, setOriginalPage] = useState<number | string>(props.tempPageNo);
  return (
    <nav className="flex flex-row justify-between py-2 px-2 md:px-8 mt-10 mb-5 max-w-xl mx-auto rounded-xl bg-[#F9F4DA] text-[#231F20] shadow-[10px_10px_#231F20,11px_11px_#F9F4DA] border-2 border-[#F9F4DA]">
      <button
        className="text-sm md:text-2xl px-2 md:px-4 py-1 rounded-md text-cardBgColor font-semibold"
        onClick={() => {
          if (Number(props.tempPageNo) > 1) {
            props.setTempPageNo(Number(props.tempPageNo) - 1);
            props.setPageNo(props.pageNo - 1);
          }
        }}
      >
        Prev
      </button>
      <div className="text-md md:text-2xl">
        <span className="font-extrabold">
          Page{" "}
          <input
            type="text"
            accept="number"
            maxLength={2}
            value={props.tempPageNo}
            onClick={(event) => {
              setOriginalPage(props.tempPageNo);
              props.setTempPageNo("");
            }}
            onChange={(event) => {
              let userInput: string | number = event.target.value;

              if (containsOnlyDigits(userInput)) {
                userInput = Number(userInput);
                props.setTempPageNo(userInput);
              }
            }}
            onKeyDown={(event) => {
              // setOriginalPage(tempPageNo)
              if (event.key == "Backspace") {
                if (String(props.tempPageNo).length <= 1) {
                  console.log("now");
                  props.setTempPageNo("");
                  // setOriginalPage(1)
                } else props.setTempPageNo(Number(String(props.tempPageNo).slice(0, -1)));
              }
              if (event.key === "Enter") {
                if (Number(props.tempPageNo) <= props.lastPageNo) {
                  if (Number(props.tempPageNo) === 0) {
                    console.log("it's here");
                    props.setPageNo(1);
                    setOriginalPage(1);
                    props.setTempPageNo(1);
                  } else {
                    props.setPageNo(Number(props.tempPageNo));
                    setOriginalPage(props.tempPageNo);
                  }
                } else {
                  props.setPageNo(props.lastPageNo);
                  props.setTempPageNo(props.lastPageNo);
                  setOriginalPage(props.lastPageNo);
                }
              }
            }}
            onBlur={() => props.setTempPageNo(originalPage)}
            className="w-12 text-center border-2 border-solid border-neutral-600 text-2xl md:text-3xl bg-mainTextColor font-extrabold rounded-md p-1"
          />{" "}
          of {Number.isNaN(props.lastPageNo) ? ". . ." : props.lastPageNo}
        </span>
      </div>
      <button
        className="text-sm md:text-2xl px-2 md:px-4 py-1 rounded-md text-cardBgColor font-semibold"
        onClick={() => {
          if (Number(props.tempPageNo) < props.lastPageNo) {
            props.setTempPageNo(Number(props.tempPageNo) + 1);
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

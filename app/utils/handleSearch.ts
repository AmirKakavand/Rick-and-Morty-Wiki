import {Dispatch, SetStateAction} from "react";

interface IProps {
    name: string,
    setSearchQuery: Dispatch<SetStateAction<string>>,
    setPageNo: Dispatch<SetStateAction<number>>
}

export const handleSearch = ({name, setSearchQuery, setPageNo}: IProps) => {
  setSearchQuery((prevSearchQuery) => {
    console.log("we got to handleSearch now")
    if (name !== "") {
      setPageNo(1);
      return name;
    } else {
      setPageNo(1);
      return "";
    }
  });
}
import {Dispatch, SetStateAction} from "react";

interface IProps {
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    setSearchQuery: Dispatch<SetStateAction<string>>,
    setPageNo: Dispatch<SetStateAction<number>>
}

export const handleSearch = ({name, setName, setSearchQuery, setPageNo}: IProps) => {
    if (name !== "") {
        setSearchQuery(name);
        setPageNo(1);
      } else {
        setName("");
        setSearchQuery("");
        setPageNo(1);
      }
}
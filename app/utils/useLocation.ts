import useSWR from "swr";
import { ILocation } from "../types/ILocation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useLocation = (locationURL: string) => {
  const { data, isLoading, error } = useSWR<ILocation, Error>(
    locationURL,
    fetcher
  );

  return {
    locationName: data?.name,
    type: data?.type,
    dimension: data?.dimension,
    residents: data?.residents,
  };
};

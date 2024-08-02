import useSWR from "swr";
import { IEpisode } from "../types/IEpisode";

const fetcher = (URL: string) => fetch(URL).then((res) => res.json());

export const useEpisode = (episodeURL: string) => {
  const {data, isLoading, error} = useSWR<IEpisode, Error>(episodeURL, fetcher);

  return {
    number: data?.episode,
    name: data?.name,
    airDate: data?.air_date
  }
};

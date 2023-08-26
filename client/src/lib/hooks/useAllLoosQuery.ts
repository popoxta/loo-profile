import {useQuery} from "react-query";
import {getAllLoos} from "../api-client.ts";
import {Coordinates} from "../types/types.ts";

export const useAllLoosQuery = (location: Coordinates, distance: number) => useQuery({
    queryKey: ['loos', location, distance],
    queryFn: () => getAllLoos(location, distance)
})

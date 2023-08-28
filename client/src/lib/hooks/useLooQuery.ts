import {useQuery} from "react-query";
import {getLoo} from "../api-client.ts";
export const useLooQuery = (id: number) => useQuery({
    queryKey: ['loos', id],
    queryFn: () => getLoo(id),
    staleTime: 10000,
})

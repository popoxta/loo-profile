import {useQuery} from "react-query";
import {getUser} from "../api-client.ts";

//todo add logout mutation?
export const useUserQuery = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
        staleTime: 10000,
    })
}
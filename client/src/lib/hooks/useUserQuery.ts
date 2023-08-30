import {useQuery} from "react-query";
import {getUser} from "../api-client.ts";

export const useUserQuery = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
        retry: 2
    })
}
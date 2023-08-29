import {useQuery} from "react-query";
import {getUser} from "../api-client.ts";

export const useUserQuery = () => useQuery({
    queryKey: ['user'],
    queryFn: () => getUser()
})
import {useQuery} from "react-query";
import {getLoosByUser} from "../api-client.ts";

export function useUserLooQuery(userId: number) {

    const query = useQuery({
        queryKey: ['loos', {user: userId}],
        queryFn: () => getLoosByUser(),
        staleTime: 10000,
    })

    return {
        ...query,
    }
}
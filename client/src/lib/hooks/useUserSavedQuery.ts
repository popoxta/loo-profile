import {useQuery} from "react-query";
import {getSavedLoos} from "../api-client.ts";

export function useUserSavedQuery(userId: number) {

    const query = useQuery({
        queryKey: ['saved', {user: userId}],
        queryFn: () => getSavedLoos(),
        staleTime: 10000,
    })

    return {
        ...query,
    }
}
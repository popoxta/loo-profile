import {useQuery, useQueryClient} from "react-query";
import {getReviewsByUser} from "../api-client.ts";

export function useUserReviewsQuery(userId: number) {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['reviews', {user: userId}],
        queryFn: () => getReviewsByUser(),
        staleTime: 10000,
    })

    return {
        ...query,
        invalidateReviews: () => queryClient.invalidateQueries(['reviews', {user: userId}])
    }
}
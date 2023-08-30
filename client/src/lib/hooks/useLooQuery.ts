import {MutationFunction, useMutation, useQuery, useQueryClient} from "react-query";
import {addReview, getLoo} from "../api-client.ts";

export function useLooQuery(id: number) {
    // const queryClient = useQueryClient()

    const query =  useQuery({
        queryKey: ['loos', id],
        queryFn: () => getLoo(id),
        staleTime: 10000,
    })

    return {
        ...query,
        addReview: useAddReview(id)
    }
}

export function useLooMutation<TData = unknown, TVariables = unknown>
(fn: MutationFunction<TData, TVariables>, id: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: fn,
        onSuccess: () => queryClient.invalidateQueries(['loos', id])
    })
}

export const useAddReview = (looId: number) => useLooMutation(addReview, looId)
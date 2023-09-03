import {MutationFunction, useMutation, useQuery, useQueryClient} from "react-query";
import {addReview, deleteReview, getLoo, updateLoo, updateReview} from "../api-client.ts";

export function useLooQuery(id: number) {

    const query = useQuery({
        queryKey: ['loos', id],
        queryFn: () => getLoo(id),
        staleTime: 10000,
        retry: 2
    })

    return {
        ...query,
        addReview: useAddReview(id),
        updateReview: useUpdateReview(id),
        deleteReview: useDeleteReview(id),
        updateLoo: useUpdateLoo(id)
    }
}

export function useLooMutation<TData = unknown, TVariables = unknown>
(fn: MutationFunction<TData, TVariables>, id: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: fn,
        onSuccess: () => queryClient.invalidateQueries(['loos', id]),
    })
}

export const useAddReview = (looId: number) => useLooMutation(addReview, looId)

export const useUpdateReview = (looId: number) => useLooMutation(updateReview, looId)

export const useDeleteReview = (looId: number) => useLooMutation(deleteReview, looId)

export const useUpdateLoo = (looId: number) => useLooMutation(updateLoo, looId)

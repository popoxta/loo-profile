import {MutationFunction, useMutation, useQuery, useQueryClient} from "react-query";
import {
    addReview,
    deleteLoo,
    deleteReview,
    getLoo,
    removeSavedLoo,
    saveLoo,
    updateLoo,
    updateReview
} from "../api-client.ts";

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
        updateLoo: useUpdateLoo(id),
        deleteLoo: useDeleteLoo(id),
        saveLoo: useSaveLoo(id),
        removeSavedLoo: useRemoveSaveLoo(id),
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

//@ts-ignore
export const useDeleteLoo = (looId: number) => useLooMutation(deleteLoo, looId)

export const useSaveLoo = (looId: number) => useLooMutation(saveLoo, looId)
export const useRemoveSaveLoo = (looId: number) => useLooMutation(removeSavedLoo, looId)

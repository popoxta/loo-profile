import {MutationFunction, useMutation, useQuery, useQueryClient} from "react-query";
import {addLoo, getAllLoos, getAllLoosByDistance} from "../api-client.ts";
import {Coordinates} from "../types/types.ts";

export function useAllLoosQuery(location?: Coordinates, distance?: number) {

    // todo check if dis ok lol
    const query = useQuery({
        queryKey: location && distance ? ['loos', location, distance] : ['loos'],
        queryFn: () => location && distance ? getAllLoosByDistance(location, distance) : getAllLoos(),
        staleTime: 10000,
    })

    return {
        ...query,
        addLoo: useAddLoo()
    }
}

export function useLoosMutation<TData = unknown, TVariables = unknown>
(fn: MutationFunction<TData, TVariables>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: fn,
        onSuccess: () => queryClient.invalidateQueries(['loos']),
    })
}

export const useAddLoo = () => useLoosMutation(addLoo)


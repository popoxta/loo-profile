import {MutationFunction, useMutation, useQuery, useQueryClient} from "react-query";
import {getUser, register} from "../api-client.ts";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {NewUser, User} from "../types/types.ts";

//todo add logout mutation?
export const useUserQuery = () => {
    const query = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    return {
        ...query,
        register: useRegisterUser()
    }
}

export function useUserMutation<TData = unknown, TVariables = unknown>
(fn: MutationFunction<TData, TVariables>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: fn,
        onSuccess: () => queryClient.invalidateQueries(['user']),
    })
}

export const useRegisterUser = () => useUserMutation(async (user: NewUser) => {
    const {email, username, password} = user

    const auth = getAuth()
    const credentials = await createUserWithEmailAndPassword(auth, String(email), String(password))
    const newUser: User = {
        email: String(email),
        username: String(username),
        firebase_uid: credentials.user.uid
    }
    if (credentials) {
        await register(newUser)
    } else return new Error('Registration could not be completed. Please try again later')
})

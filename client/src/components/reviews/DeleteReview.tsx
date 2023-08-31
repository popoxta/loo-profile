import Alert from "../Alert.tsx";
import {Loo, Review} from "../../lib/types/types.ts";
import {useDeleteReview} from "../../lib/hooks/useLooQuery.ts";
import {useQueryClient} from "react-query";
import {useState} from "react";

interface Props {
    review: Review
    toggle: () => void
    loo_id: number
    children: string | string[]
}

export default function DeleteReview(props: Props) {
    const queryClient = useQueryClient()
    const {mutate, status} = useDeleteReview(props.loo_id)
    const [error, setError] = useState('')

    const mutationOptions = {
        onSuccess: () => {
            const looData: {loo: Loo, reviews: Review[]} | undefined = queryClient.getQueryData(['loos', props.loo_id])
            if (looData) {
                const reviews = looData.reviews.filter((review: Review) => review.id !== props.review.id)
                queryClient.setQueryData(['loos', props.loo_id], {...looData, reviews})
            }
            console.log('donezo')
            setError('')
            props.toggle()
        },
        onError: (error: unknown) => {
            error instanceof Error
                ? setError(error.message)
                : setError('Unknown error')
        }
    }

    const handleDeleteReview = async () => {
        await mutate(Number(props.review.id), mutationOptions)
    }

    console.log(status)

    return (
        <Alert title={'Delete Review'} error={error ? error : undefined} buttonText={'Confirm'} toggle={props.toggle} buttonToggle={handleDeleteReview}>
            {props.children}
        </Alert>
    )
}
import Alert from "./Alert.tsx";
import {Loo, Review} from "../lib/types/types.ts";
import {useLooQuery} from "../lib/hooks/useLooQuery.ts";
import {useQueryClient} from "react-query";

interface Props {
    review: Review
    toggle: () => void
    loo_id: number
    children: string | string[]
}

export default function DeleteReview(props: Props) {
    const queryClient = useQueryClient()
    const {deleteReview} = useLooQuery(props.loo_id)

    const handleDeleteReview = async () => {
        await deleteReview.mutate(Number(props.review.id))
        const looData: {loo: Loo, reviews: Review[]} | undefined = queryClient.getQueryData(['loos', props.loo_id])
        if (looData) {
            const reviews = looData.reviews.filter((review: Review) => review.id !== props.review.id)
            queryClient.setQueryData(['loos', props.loo_id], {...looData, reviews})
        }
        props.toggle()
    }

    return (
        <Alert title={'Delete Review'} buttonText={'Confirm'} toggle={props.toggle} buttonToggle={handleDeleteReview}>
            {props.children}
        </Alert>
    )
}
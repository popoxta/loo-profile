import {Review} from "../../lib/types/types.ts";
import Stars from "../Stars.tsx";
import Button from "../Button.tsx";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import AddReview from "./AddReview.tsx";
import {useState} from "react";
import DeleteReview from "./DeleteReview.tsx";
import {getFormattedDate} from "../../lib/utils.ts";

interface Props {
    review: Review
    isLast: boolean
    loo_id: number
}

export default function ReviewCard(props: Props) {
    const {isLast, review} = props
    const [editing, setEditing] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const {data: user} = useUserQuery()
    const isEditable = user?.id === review.user_id

    const date = getFormattedDate(Number(review.timestamp))

    const toggleEditing = () => setEditing(!editing)

    const toggleDelete = () => setShowDelete(!showDelete)

    return (
        <>
            {showDelete &&
                <DeleteReview review={review} toggle={toggleDelete} loo_id={props?.loo_id}>Are you sure you would like
                    to delete this review?</DeleteReview>}
            {editing && <AddReview submitCb={() => setEditing(false)} review={props?.review} loo_id={props?.loo_id}
                                   toggle={toggleEditing}/>}
            <div
                className={`w-full px-5 py-10 ${isLast ? '' : 'border-b-2'} border-slate-200 text-slate-900 place-items-center font-open-sans flex gap-5`}>
                <div className={'w-12 h-12 bg-slate-500 rounded-full flex-shrink-0'}></div>
                <div className={'w-full'}>
                    <div className={'w-full flex place-items-center justify-between'}>
                        <div className={'flex place-items-center gap-2.5'}>
                            <p className={'bold-text'}>{props.review.username}</p>
                            <div className={'flex place-content-center gap-0.5'}>
                                <Stars style={{marginTop: '-4px'}} rating={review.rating} size={15}/>
                            </div>
                            <p className={'font-open-sans text-xs text-slate-500'}>{date.day} {date.hour}</p>
                        </div>
                        {isEditable && <div className={'flex gap-5'}>
                            <Button onClick={toggleEditing} className={''} size={'sm'}>Edit</Button>
                            <Button onClick={toggleDelete} className={''} size={'sm'}>Delete</Button>
                        </div>
                        }
                    </div>
                    <p className={`paragraph mt-1 max-w-4xl`}>
                        {review.review}
                    </p>
                </div>
            </div>
        </>
    )
}
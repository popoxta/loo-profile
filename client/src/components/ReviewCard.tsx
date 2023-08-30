import {Review, User} from "../lib/types/types.ts";
import Stars from "./Stars.tsx";
import Button from "./Button.tsx";

interface Props {
    review: Review
    user?: User
    isLast: boolean
    editFn?: () => void
}

export default function ReviewCard(props: Props) {
    const {isLast, review} = props
    const isEditable = props?.user?.id === review.user_id

    return (
        <div
            className={`w-full px-5 py-10 ${isLast ? '' : 'border-b-2'} border-slate-200 text-slate-900 place-items-center font-open-sans flex gap-5`}>
            <div className={'w-12 h-12 bg-slate-500 rounded-full flex-shrink-0'}></div>
            <div className={'w-full'}>
                <div className={'w-full flex place-items-center justify-between'}>
                    <div className={'flex place-items-center gap-2.5'}>
                        <p className={'font-bold uppercase'}>{props.review.username}</p>
                        <div className={'flex place-content-center gap-0.5'}>
                            <Stars style={{marginTop: '-6px'}} rating={review.rating} size={20}/>
                        </div>
                    </div>
                    {isEditable && <Button onClick={props.editFn} className={''} size={'sm'}>Edit</Button>}
                </div>
                <p className={'text-sm mt-1 max-w-4xl'}>
                    {review.review}
                </p>
            </div>
        </div>

    )
}
import {Review} from "../lib/types/types.ts";
import Stars from "./Stars.tsx";

interface Props {
    review: Review
    isLast: boolean
}

export default function ReviewCard(props: Props) {
    const {isLast, review} = props

    return (
        <div className={`w-full px-5 py-10 ${isLast ? '' : 'border-b-2'} border-slate-200 text-slate-900 place-items-center font-open-sans flex gap-5`}>
            <div className={'w-12 h-12 bg-slate-500 rounded-full flex-shrink-0'}></div>
            <div>
                <div className={'flex place-items-center gap-2.5'}>
                    <p className={'font-bold uppercase'}>{props.review.username}</p>
                    <div className={'flex gap-0.5'}>
                        <Stars rating={review.rating} size={'xs'}/>
                    </div>
                </div>
                <p className={'text-sm mt-1 max-w-4xl'}>
                    {review.review}
                </p>
            </div>
        </div>
    )
}
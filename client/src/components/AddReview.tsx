import Cover from "./Cover.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import {Rating} from "react-simple-star-rating";
import {useLooQuery} from "../lib/hooks/useLooQuery.ts";
import {useUserQuery} from "../lib/hooks/useUserQuery.ts";
import {Review} from "../lib/types/types.ts";

interface Props {
    toggle: () => void
    loo_id: number
    submitCb: () => void
    review?: Review
}

export default function AddReview(props: Props) {
    const [review, setReview] = useState(props?.review?.review ?? '')
    const [rating, setRating] = useState(props?.review?.rating ?? 0)
    const [error, setError] = useState('')
    const {addReview, updateReview} = useLooQuery(props.loo_id)
    const {data: user} = useUserQuery()

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)

    const handleRating = (rate: number) => setRating(rate)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!review) setError('Review must contain a body')
        const newReview: Review = {
            user_id: user?.id,
            loo_id: props.loo_id,
            rating,
            review
        }
        if (props?.review) await updateReview.mutate({...newReview, id: props?.review?.id})
        else await addReview.mutate(newReview)
        props.toggle()
        props.submitCb ? props.submitCb() : null
    }

    return (
        <>
            <Cover show={true} onClick={props.toggle}/>
            <div className={'absolute w-full z-50 left-0 top-0 flex justify-center'}>
                <div
                    className={'absolute mx-auto bg-white w-full min-h-[36rem] rounded-lg px-10 pt-14 pb-10 shadow font-open-sans md:w-[38rem]'}>
                    <FontAwesomeIcon icon={faXmark} size={'xl'}
                                     className={'cursor-pointer absolute right-5 top-3.5 text-slate-500'}
                                     onClick={props.toggle}/>
                    <div className={'w-full mx-auto text-center'}>
                        <h4 className={'uppercase font-spartan text-3xl font-semibold mb-5'}>Leave a review</h4>
                        <div className={'h-[2px] bg-slate-300 mx-auto'}></div>
                    </div>
                    <form onSubmit={handleSubmit} className={'mx-auto flex flex-col gap-10 mt-10'}>
                        <div>
                            <h5 className={'font-bold mb-2.5'}>Some title for a thing</h5>
                            <p className={'text-sm'}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit
                                pretium
                                imperdiet. Nullam in tristique justo.
                            </p>
                        </div>
                        <div>
                            <h5 className={'font-bold mb-2.5'}>Rating</h5>
                            <div className={'w-full'}>
                                <Rating allowFraction={true} initialValue={rating} size={32} emptyStyle={{display: "flex"}}
                                        fillStyle={{display: "-webkit-inline-box"}} onClick={handleRating}/>
                            </div>
                        </div>
                        <div>
                            <div className={'flex gap-5'}>
                                <label htmlFor={'review'} className={'font-bold mb-2.5'}>Review</label>
                                {error && <p className={'font-open-sans mt-1 text-red-800 text-xs'}>*{error}</p>}
                            </div>
                            <textarea name={'review'} onChange={handleChange} value={review}
                                      className={'border-2 flex-grow border-slate-300 w-full min-h-[10rem] rounded-md overflow-y-scroll p-1'}/>
                        </div>
                        <Button className={'mx-auto'} size={'md'}>Submit Review</Button>
                    </form>
                </div>
            </div>
        </>
    )
}
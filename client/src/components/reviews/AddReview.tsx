import Cover from "../Cover.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import {Rating} from "react-simple-star-rating";
import {useLooQuery} from "../../lib/hooks/useLooQuery.ts";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import {Review} from "../../lib/types/types.ts";

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
    const loo = useLooQuery(props.loo_id)
    const user = useUserQuery()

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)

    const handleRating = (rate: number) => setRating(rate)

    const mutationOptions = {
        onSuccess: () => {
            props.toggle()
            props.submitCb ? props.submitCb() : null
        },
        onError: (error: unknown) => {
            error instanceof Error
                ? setError(error.message)
                : setError('Unknown error')

        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!review) {
            setError('Review must contain a body')
            return
        } else if (!rating) {
            setError('Review must contain a rating')
            return
        }

        const newReview: Review = {
            user_id: user?.data?.id,
            loo_id: props.loo_id,
            rating,
            review
        }

        if (props?.review) await loo.updateReview.mutate({...newReview, id: props?.review?.id}, mutationOptions)
        else await loo.addReview.mutate(newReview, mutationOptions)
    }

    // todo add placeholders
    return (
        <>
            <Cover show={true} onClick={props.toggle}/>
            <div className={'modal'}>
                <div
                    className={'modal-container'}>
                    <FontAwesomeIcon icon={faXmark} size={'xl'}
                                     className={'cursor-pointer absolute right-5 top-3.5 text-slate-500'}
                                     onClick={props.toggle}/>
                    <div className={'w-full mx-auto text-center'}>
                        <h4 className={`heading-four mb-2`}>Leave a review</h4>
                        <div className={'divider'}></div>
                    </div>
                    <form onSubmit={handleSubmit} className={`mx-auto flex-col-10 mt-10`}>
                        <div>
                            <h5 className={`font-bold mb-2.5`}>Some title for a thing</h5>
                            <p className={'paragraph'}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit
                                pretium
                                imperdiet. Nullam in tristique justo.
                            </p>
                        </div>
                        <div>
                            <h5 className={`bold-text mb-2.5`}>Rating</h5>
                            <div className={'w-full'}>
                                <Rating allowFraction={true} initialValue={rating} size={32}
                                        emptyStyle={{display: "flex"}}
                                        fillStyle={{display: "-webkit-inline-box"}} onClick={handleRating}/>
                            </div>
                        </div>
                        <div>
                            <div className={'flex gap-5'}>
                                <label htmlFor={'review'} className={`bold-text mb-2.5`}>Review</label>
                                {error && <p className={`error-message mt-1`}>*{error}</p>}
                            </div>
                            <textarea name={'review'} onChange={handleChange} value={review}
                                      className={` flex-grow  w-full min-h-[10rem] form-input overflow-y-scroll`}/>
                        </div>
                        <Button className={'mx-auto'} size={'md'}>Submit Review</Button>
                    </form>
                </div>
            </div>
        </>
    )
}
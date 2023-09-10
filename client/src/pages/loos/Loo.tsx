import {useParams} from "react-router-dom";
import Button from "../../components/Button.tsx";
import Map from "../../components/Map.tsx";
import ReviewCard from "../../components/reviews/ReviewCard.tsx";
import AddReview from "../../components/reviews/AddReview.tsx";
import ReviewThanks from "../../components/reviews/ReviewThanks.tsx";
import {useState} from "react";
import {useLooQuery} from "../../lib/hooks/useLooQuery.ts";
import {getMarkers} from "../../lib/geo-utils.ts";
import Loading from "../../components/Loading.tsx";
import Stars from "../../components/Stars.tsx";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import Alert from "../../components/Alert.tsx";
import NotFound from "../NotFound.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

export default function Loo() {
    const [showAddReview, setShowAddReview] = useState(false)
    const [showReviewThanks, setShowReviewThanks] = useState(false)
    const id: string | undefined = useParams().id
    const {data: looData, isLoading, isError} = useLooQuery(Number(id))
    const {data: user} = useUserQuery()

    if (isError) return <NotFound>
        {id
            ? <>
                <p>Loo {id} is not currently accessible or may be permanently removed!</p>
                <p>Please try again later.</p>
            </>
            : <p>Sorry, we can't find that page!</p>
        }
    </NotFound>

    if (isLoading || looData === undefined)
        return <Loading full={true}/>

    const {reviews, loo} = looData
    const averageRating = reviews.length ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length) : 0

    const marker = getMarkers([loo])
    const reviewElements = reviews?.map((review, i) =>
        <ReviewCard loo_id={Number(loo?.id)} key={review.id} review={review} isLast={i === (reviews.length - 1)}/>)

    const toggleAddReview = () => setShowAddReview(!showAddReview)

    const toggleReviewThanks = () => setShowReviewThanks(!showReviewThanks)

    return (
        <main className={'screen pt-40 pb-16'}>
            {showAddReview && user && <AddReview submitCb={() => setShowReviewThanks(true)} loo_id={Number(loo?.id)}
                                                 toggle={toggleAddReview}/>}
            {showAddReview && !user &&
                <Alert title={'Error'} buttonText={'Log in'} toggle={toggleAddReview} link={'/login'}>
                    Please login or register to write a review for {loo.name}
                </Alert>}
            {showReviewThanks && <ReviewThanks toggle={toggleReviewThanks}/>}
            <div className={'max-w-7xl mx-auto text-slate-900 min-h-[35rem]'}>
                <section
                    className={`flex-col-10 justify-between place-items-center max-h-[80%] mb-10 lg:flex-row lg:place-items-start`}>
                    <div className={'flex flex-col font-open-sans max-w-xl'}>
                        <div className={'flex place-items-center mb-5 justify-between'}>
                            <h1 className={`heading-three text-center lg:text-left`}>
                                {loo.name}
                            </h1>
                            {user && <FontAwesomeIcon className={`mb-2 transition-colors ${!!loo?.isSaved ? 'hover:text-slate-300 text-pink-600' : 'text-slate-300 hover:text-pink-600'}`} size={'xl'} icon={faHeart}/>}
                        </div>
                        <div
                            className={`justify-between mb-5 flex-col-10 sm:flex-row text-center md:text-left`}>
                            <address className={`not-italic flex-col-2`}>
                                <div className={'bold-text'}>
                                    <p>{loo.street}</p>
                                    <p>{loo.region}</p>
                                </div>
                                <p className={'paragraph text-slate-500'}>{loo.contact}</p>
                            </address>
                            <div>
                                <h2 className={`bold-text mb-2`}>Opening Hours</h2>
                                <div className={`flex-col-2 paragraph text-slate-500 text-right`}>
                                    <p>{loo.weekday} Mon-Fri</p>
                                    <p>{loo.weekend} Sat-Sun</p>
                                </div>
                            </div>
                        </div>
                        <div className={'text-center md:text-left'}>
                            <h2 className={`bold-text mb-2`}>About</h2>
                            <p className={'paragraph'}>
                                {loo.about}
                            </p>
                        </div>
                    </div>
                    <div className={'h-[20rem] shrink-0 w-full sm:w-[32rem]'}>
                        <Map center={[loo?.lat, loo?.long]} markers={marker}/>
                    </div>
                </section>
                <section>
                    <div className={`flex-col-2 place-items-center md:gap-5 mb-5 sm:flex-row justify-between`}>
                        <div className={`flex-col-2 place-items-center md:gap-5 mb-5 sm:flex-row sm:mb-0`}>
                            <h2 className={'heading-four'}>Reviews</h2>
                            <div className={'flex gap-0.5'}>
                                <Stars style={{marginTop: '-6px'}} rating={averageRating ?? 5} size={25}/>
                            </div>
                            <p className={'paragraph text-slate-500 mb-0.5'}>{reviews.length} Reviews</p>
                        </div>
                        <Button title={'Write a review'} size={'md'} onClick={toggleAddReview}>Write a review</Button>
                    </div>
                    <div
                        className={`border-card w-full min-h-[8rem] flex-col`}>
                        {reviews.length > 0
                            ? reviewElements
                            : <h3 className={`text-center subheading`}>No reviews
                                yet!</h3>
                        }
                    </div>

                </section>
            </div>
        </main>
    )
}
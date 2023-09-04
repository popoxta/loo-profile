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
import styles from '../../lib/style-presets.ts'
import NotFound from "../NotFound.tsx";

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
        return <div className={styles.screenContainer}><Loading/></div>

    const {reviews, loo} = looData
    const averageRating = reviews.length ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length) : 0

    const marker = getMarkers([loo])
    const reviewElements = reviews?.map((review, i) =>
        <ReviewCard loo_id={Number(loo?.id)} key={review.id} review={review} isLast={i === (reviews.length - 1)}/>)

    const toggleAddReview = () => setShowAddReview(!showAddReview)

    const toggleReviewThanks = () => setShowReviewThanks(!showReviewThanks)

    return (
        <main className={`${styles.screenContainer}`}>
            {showAddReview && user && <AddReview submitCb={() => setShowReviewThanks(true)} loo_id={Number(loo?.id)}
                                                 toggle={toggleAddReview}/>}
            {showAddReview && !user &&
                <Alert title={'Error'} buttonText={'Log in'} toggle={toggleAddReview} link={'/login'}>
                    Please login or register to write a review for {loo.name}
                </Alert>}
            {showReviewThanks && <ReviewThanks toggle={toggleReviewThanks}/>}
            <div className={'max-w-6xl mx-auto text-slate-900 min-h-[35rem]'}>
                <section
                    className={`${styles.flexCol10} justify-between place-items-center max-h-[80%] mb-10 lg:flex-row lg:place-items-start`}>
                    <div className={'flex flex-col font-open-sans max-w-xl'}>
                        <h1 className={`${styles.looHeading} mb-5 text-center lg:text-left`}>
                            {loo.name}
                        </h1>
                        <div
                            className={`justify-between mb-5 ${styles.flexCol5} sm:gap-0 sm:flex-row text-center md:text-left`}>
                            <address className={`not-italic ${styles.flexCol2}`}>
                                <div className={styles.subBold}>
                                    <p>{loo.street}</p>
                                    <p>{loo.region}</p>
                                </div>
                                <p className={styles.smallText}>{loo.contact}</p>
                            </address>
                            <div>
                                <h2 className={`${styles.subBold} mb-2`}>Opening Hours</h2>
                                <div className={`${styles.flexCol2} ${styles.smallText} text-right`}>
                                    <p>{loo.weekday} Mon-Fri</p>
                                    <p>{loo.weekend} Sat-Sun</p>
                                </div>
                            </div>
                        </div>
                        <div className={'text-center md:text-left'}>
                            <h2 className={`${styles.subBold} mb-2`}>About</h2>
                            <p className={styles.paragraphText}>
                                {loo.about}
                            </p>
                        </div>
                    </div>
                    <div className={'h-[20rem] shrink-0 w-full sm:w-[32rem]'}>
                        <Map center={[loo?.lat, loo?.long]} markers={marker}/>
                    </div>
                </section>
                <section>
                    <div className={`${styles.flexDirection} justify-between`}>
                        <div className={`${styles.flexDirection} sm:mb-0`}>
                            <h2 className={styles.headingFourBold}>Reviews</h2>
                            <div className={'flex gap-0.5'}>
                                <Stars style={{marginTop: '-6px'}} rating={averageRating ?? 5} size={25}/>
                            </div>
                            <p className={styles.smallText}>{reviews.length} Reviews</p>
                        </div>
                        <Button title={'Write a review'} size={'md'} onClick={toggleAddReview}>Write a review</Button>
                    </div>
                    <div
                        className={`${styles.borderSlate} w-full min-h-[8rem] flex-col flex justify-center overflow-y-scroll`}>
                        {reviews.length > 0
                            ? reviewElements
                            : <h3 className={`text-center text-slate-500 text-lg md:text-xl mb-0 md:mb-0`}>No reviews yet!</h3>
                        }
                    </div>

                </section>
            </div>
        </main>
    )
}
import {useParams} from "react-router-dom";
import Button from "../components/Button.tsx";
import Map from "../components/Map.tsx";
import ReviewCard from "../components/ReviewCard.tsx";
import AddReview from "../components/AddReview.tsx";
import ReviewThanks from "../components/ReviewThanks.tsx";
import {useState} from "react";
import {useLooQuery} from "../lib/hooks/useLooQuery.ts";
import {getMarkers} from "../lib/geo-utils.ts";
import Loading from "../components/Loading.tsx";
import Stars from "../components/Stars.tsx";
import {useUserQuery} from "../lib/hooks/useUserQuery.ts";
import Alert from "../components/Alert.tsx";
import styles from '../lib/style-presets.ts'

export default function Loo() {
    const [showAddReview, setShowAddReview] = useState(false)
    const [showReviewThanks, setShowReviewThanks] = useState(false)
    const id: string | undefined = useParams().id
    const {data: looData, isLoading} = useLooQuery(Number(id))
    const {data: user} = useUserQuery()

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
        <main className={styles.screenContainer}>
            {showAddReview && user && <AddReview submitCb={() => setShowReviewThanks(true)} loo_id={Number(loo?.id)} toggle={toggleAddReview}/>}
            {showAddReview && !user && <Alert title={'Error'} buttonText={'Log in'} toggle={toggleAddReview} link={'/login'}>
                Please login or register to write a review for {loo.name}
            </Alert>}
            {showReviewThanks && <ReviewThanks toggle={toggleReviewThanks}/>}
            <div className={'max-w-6xl mx-auto text-slate-900'}>
                <section
                    className={`${styles.flexCol10} justify-between place-items-center mb-10 lg:flex-row lg:place-items-start`}>
                    <div className={'flex flex-col font-open-sans max-w-xl'}>
                        <h2 className={`${styles.looHeading} mb-10 text-center lg:text-left`}>
                            {loo.name}
                        </h2>
                        <div className={`justify-between mb-5 ${styles.flexCol5} sm:gap-0 sm:flex-row text-center md:text-left`}>
                            <address className={`not-italic ${styles.flexCol2}`}>
                                <div className={styles.subBold}>
                                    <p>{loo.street}</p>
                                    <p>{loo.region}</p>
                                </div>
                                <p className={styles.smallText}>{loo.contact}</p>
                            </address>
                            <div>
                                <h3 className={`${styles.subBold} mb-2`}>Opening Hours</h3>
                                <div className={`${styles.flexCol2} ${styles.smallText}`}>
                                    <p>0900 - 1200 mon</p>
                                    <p>0900 - 1200 tue</p>
                                    <p>0900 - 1200 wed</p>
                                </div>
                            </div>
                        </div>
                        <div className={'text-center md:text-left'}>
                            <h3 className={`${styles.subBold} mb-2`}>About</h3>
                            <p className={styles.paragraphText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit
                                pretium
                                imperdiet. Nullam in tristique justo. In suscipit metus et nunc ornare, nec blandit eros
                                malesuada. Praesent aliquet elit at nisl porta, vel lobortis dolor auctor.
                            </p>
                        </div>
                    </div>
                    <div className={'h-[22rem] shrink-0 w-full sm:w-[32rem]'}>
                        <Map center={[loo?.lat, loo?.long]} markers={marker}/>
                    </div>
                </section>
                <section>
                    <div className={`${styles.flexDirection} justify-between`}>
                        <div className={`${styles.flexDirection} sm:mb-0`}>
                            <h4 className={styles.headingFourBold}>Reviews</h4>
                            <div className={'flex gap-0.5'}>
                                <Stars style={{marginTop: '-6px'}} rating={averageRating ?? 5} size={25}/>
                            </div>
                            <p className={styles.smallText}>{reviews.length} Reviews</p>
                        </div>
                        <Button title={'Write a review'} size={'md'} onClick={toggleAddReview}>Write a review</Button>
                    </div>
                    <div
                        className={`${styles.borderSlate} max-h-[20rem] flex-grow w-full min-h-[10rem] overflow-y-scroll`}>
                        {reviewElements}
                    </div>
                </section>
            </div>
        </main>
    )
}
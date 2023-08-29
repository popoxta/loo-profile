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

export default function Loo() {
    const [showAddReview, setShowAddReview] = useState(false)
    const [showReviewThanks, setShowReviewThanks] = useState(false)
    const id: string | undefined = useParams().id
    const {data: looData, isLoading} = useLooQuery(Number(id))
    const {data: user} = useUserQuery()

    if (isLoading || looData === undefined)
        return <div className={'min-h-full flex justify-center mt-24 md:mt-80'}>
            <Loading/>
        </div>

    const {reviews, loo} = looData
    const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length)

    const marker = getMarkers([loo])
    const reviewElements = reviews?.map((review, i) =>
        <ReviewCard key={crypto.randomUUID()} review={review} isLast={i === (reviews.length - 1)}/>)

    const toggleAddReview = () => {
        if (!user) return
        setShowAddReview(!showAddReview)
    }
    const toggleReviewThanks = () => setShowReviewThanks(!showReviewThanks)

    return (
        <main className={'relative mt-20 md:mt-24 px-5 mb-10'}>
            {showAddReview && <AddReview toggle={toggleAddReview}/>}
            {showReviewThanks && <ReviewThanks toggle={toggleReviewThanks}/>}
            <div className={'max-w-6xl mx-auto text-slate-900'}>
                <section
                    className={'flex flex-col gap-10 justify-between place-items-center mb-10 lg:flex-row lg:place-items-start'}>
                    <div className={'flex flex-col font-open-sans max-w-xl'}>
                        <h2 className={'text-4xl mb-10 font-semibold font-spartan uppercase text-center lg:text-left'}>
                            {loo.name}
                        </h2>
                        <div className={'flex justify-between mb-5 flex-col gap-5 sm:gap-0 sm:flex-row'}>
                            <address className={'not-italic flex flex-col gap-2'}>
                                <div className={'font-bold'}>
                                    <p>{loo.street}</p>
                                    <p>{loo.region}</p>
                                </div>
                                <p className={'text-slate-500 text-sm'}>{loo.contact}</p>
                            </address>
                            <div>
                                <h3 className={'font-bold mb-2'}>Opening Hours</h3>
                                <div className={'text-sm flex flex-col gap-2 text-slate-500'}>
                                    <p>0900 - 1200 mon</p>
                                    <p>0900 - 1200 tue</p>
                                    <p>0900 - 1200 wed</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className={'font-bold mb-2'}>About</h3>
                            <p className={'text-sm'}>
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
                    <div className={'flex place-items-center justify-between mb-5 flex-col sm:flex-row'}>
                        <div className={'flex place-items-center gap-5 flex-col mb-5 sm:flex-row sm:mb-0'}>
                            <h4 className={'text-3xl font-semibold font-spartan'}>Reviews</h4>
                            <div className={'flex gap-0.5'}>
                                <Stars rating={averageRating} size={'lg'}/>
                            </div>
                            <p className={'font-open-sans text-sm text-slate-500'}>{reviews.length} Reviews</p>
                        </div>
                        <Button title={'Write a review'} size={'md'} onClick={toggleAddReview}>Write a review</Button>
                    </div>
                    <div
                        className={'border-2 flex-grow border-slate-300 w-full min-h-[10rem] rounded-lg overflow-y-scroll'}>
                        {reviewElements}
                    </div>
                </section>
            </div>
        </main>
    )
}
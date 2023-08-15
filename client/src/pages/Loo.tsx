import {useParams} from "react-router-dom";
import {fakeLoos} from "../looData.ts";
import {Marker} from "../lib/types.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button.tsx";
import Map from "../components/Map.tsx";
import ReviewCard from "../components/ReviewCard.tsx";
import AddReview from "../components/AddReview.tsx";
import ReviewThanks from "../components/ReviewThanks.tsx";
import {useState} from "react";

export default function Loo() {
    const [showAddReview, setShowAddReview] = useState(false)
    const [showReviewThanks, setShowReviewThanks] = useState(false)
    const id: string | undefined = useParams().id

    const loo = fakeLoos[Number(id)]

    const fakeLooMarker: Marker[] = [{id: loo.id, coords: loo.coords, title: loo.name}]

    // @ts-ignore
    const fakeReviews = new Array(5).fill(0).map((el, i) => <ReviewCard key={i}/>)

    const toggleAddReview = () => setShowAddReview(!showAddReview)
    const toggleReviewThanks = () => setShowReviewThanks(!showReviewThanks)

    return (
        <main className={'relative mt-20 md:mt-24 px-5 mb-10'}>
            {showAddReview && <AddReview toggle={toggleAddReview}/>}
            {showReviewThanks && <ReviewThanks toggle={toggleReviewThanks}/>}
            <div className={'max-w-6xl mx-auto text-slate-900'}>
                <section className={'flex flex-col gap-10 justify-between place-items-center mb-10 lg:flex-row lg:place-items-start'}>
                    <div className={'flex flex-col font-open-sans max-w-xl'}>
                        <h2 className={'text-4xl mb-10 font-semibold font-spartan uppercase text-center lg:text-left'}>
                            Some title for a thing
                        </h2>
                        <div className={'flex justify-between mb-5 flex-col gap-5 sm:gap-0 sm:flex-row'}>
                            <address className={'not-italic flex flex-col gap-2'}>
                                <div className={'font-bold'}>
                                    <p>123 Something Ln, City</p>
                                    <p>Witty, TX, 82309</p>
                                </div>
                                <p className={'text-slate-500 text-sm'}>022 999 999</p>
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
                        <Map center={loo.coords} markers={fakeLooMarker}/>
                    </div>
                </section>
                <section >
                    <div className={'flex place-items-center justify-between mb-5 flex-col sm:flex-row'}>
                        <div className={'flex place-items-center gap-5 flex-col mb-5 sm:flex-row sm:mb-0'}>
                            <h4 className={'text-3xl font-semibold font-spartan'}>Reviews</h4>
                            <div className={'flex gap-0.5'}>
                                <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                                <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                                <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                                <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                                <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                            </div>
                            <p className={'font-open-sans text-sm text-slate-500'}>27 Reviews</p>
                        </div>
                        <Button size={'md'} onClick={toggleAddReview}>Write a review</Button>
                    </div>
                    <div className={'border-2 flex-grow border-slate-300 w-full min-h-[10rem] rounded-lg overflow-y-scroll'}>
                        {fakeReviews}
                    </div>
                </section>
            </div>
        </main>
    )
}
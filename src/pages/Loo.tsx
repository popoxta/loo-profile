import {useParams} from "react-router-dom";
import {fakeLoos} from "../looData.ts";
import {Loo as LooType, Marker} from "../lib/types.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button.tsx";
import Map from "../components/Map.tsx";

export default function Loo() {
    const id: string | undefined = useParams().id

    const loo: LooType = fakeLoos[Number(id)]

    const fakeLooMarker: Marker[] = [{id: loo.id, coords: loo.coords, title: loo.name}]

    return (
        <main className={'mt-20 md:mt-24 px-5'}>
            {/*main container for everything*/}
            <div className={'max-w-6xl mx-auto text-slate-900'}>
                {/*container for info and img*/}
                <section className={'flex flex-col gap-10 justify-between place-items-center lg:flex-row lg:place-items-start'}>
                    {/*info container*/}
                    <div className={'flex flex-col font-open-sans max-w-xl'}>
                        <h2 className={'text-4xl mb-10 font-semibold font-spartan uppercase text-center lg:text-left'}>
                            Some title for a thing
                        </h2>
                        {/*container for addr and ph*/}
                        <div className={'flex justify-between mb-5'}>
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
                    <div className={'h-[22rem] w-[32rem] shrink-0'}>
                        <Map center={loo.coords} markers={fakeLooMarker}/>
                    </div>
                </section>
                {/*reviews*/}
                <section>
                    {/*reviews header thing*/}
                    <div>
                        <div>
                            <h4>Reviews</h4>
                            <div>
                                <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                                <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                                <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                                <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                                <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                            </div>
                            <p>27 Reviews</p>
                        </div>
                        <Button link={''}>Write a review</Button>
                    </div>
                </section>
                <div>
                    {/*reviews here*/}
                </div>
            </div>
        </main>
    )
}
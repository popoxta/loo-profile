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
        <main>
            {/*main container for everything*/}
            <div>
                {/*container for info and img*/}
                <section>
                    {/*info container*/}
                    <div>
                        <h2>Some title for a thing</h2>
                        {/*container for addr and ph*/}
                        <address>
                            <div>
                                <p>123 Something Ln, City</p>
                                <p>123 Something Ln, City</p>
                            </div>
                            <p>022 999 999</p>
                        </address>
                        <div>
                            <h3>Opening Hours</h3>
                            <div>
                                <p>0900-1200 mon</p>
                                <p>0900-1200 tue</p>
                                <p>0900-1200 wed</p>
                            </div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit pretium
                            imperdiet. Nullam in tristique justo. In suscipit metus et nunc ornare, nec blandit eros
                            malesuada. Praesent aliquet elit at nisl porta, vel lobortis dolor auctor.
                        </p>
                    </div>
                    <div>
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
import Cover from "./Cover.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Form} from "react-router-dom";
import Button from "./Button.tsx";

export default function AddReview({toggle}: { toggle: () => void }) {
    return (
        <>
            <Cover show={true} onClick={toggle}/>
            <div className={'absolute w-full z-50 left-0 top-0 flex justify-center'}>
                <div
                    className={'absolute mx-auto bg-white w-full  min-h-[40rem] rounded-lg p-10 shadow font-open-sans md:w-[38rem]'}>
                    <FontAwesomeIcon icon={faXmark} size={'xl'}
                                     className={'cursor-pointer absolute right-5 top-3.5 text-slate-500'}
                                     onClick={toggle}/>
                    <div className={'w-full mx-auto text-center'}>
                        <h4 className={'uppercase font-spartan text-3xl font-semibold mb-2'}>Leave a review</h4>
                        <div className={'w-[80%] h-[2px] bg-slate-300 mx-auto'}></div>
                    </div>
                    <Form className={'mx-auto px-[10%] flex flex-col gap-10 mt-10'}>
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
                            <div className={'flex gap-0.5'}>
                                <div className={'hidden'}>
                                    <input type="radio" value={1} id={'star-1'} name={'star'}/>
                                    <input type="radio" value={2} id={'star-2'} name={'star'}/>
                                    <input type="radio" value={3} id={'star-3'} name={'star'}/>
                                    <input type="radio" value={4} id={'star-4'} name={'star'}/>
                                    <input type="radio" defaultChecked value={5} id={'star-5'} name={'star'}/>
                                </div>
                                <label htmlFor={'star-1'}>
                                    <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                                </label>
                                <label htmlFor={'star-2'}>
                                    <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                                </label>
                                <label htmlFor={'star-3'}>
                                    <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                                </label>
                                <label htmlFor={'star-4'}>
                                    <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                                </label>
                                <label htmlFor={'star-5'}>
                                    <FontAwesomeIcon size={'lg'} className={'text-slate-400'} icon={faStar}/>
                                </label>
                            </div>
                        </div>
                        <div>
                            <h5 className={'font-bold mb-2.5'}>Review</h5>
                            <textarea name={'review'}
                                      className={'border-2 flex-grow border-slate-300 w-full min-h-[10rem] rounded-md overflow-y-scroll p-1'}/>
                        </div>
                        <Button className={'mx-auto'} link={undefined} onClick={(): void => {}}>Submit Review</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
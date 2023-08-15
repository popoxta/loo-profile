import Cover from "./Cover.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button.tsx";

export default function ReviewThanks({toggle}: { toggle: () => void }) {
    return (
        <>
            <Cover show={true} onClick={toggle}/>
            <div className={'absolute w-full z-50 left-0 top-0 flex justify-center'}>
                <div
                    className={'absolute mx-auto bg-white w-full flex flex-col min-h-[15rem] rounded-lg p-10 shadow font-open-sans md:w-[38rem]'}>
                    <FontAwesomeIcon icon={faXmark} size={'xl'}
                                     className={'cursor-pointer absolute right-5 top-3.5 text-slate-500'}
                                     onClick={toggle}/>
                    <div className={'w-full mx-auto text-center'}>
                        <h4 className={'uppercase font-spartan text-3xl font-semibold mb-2'}>Thanks!</h4>
                        <div className={'w-[80%] h-[2px] bg-slate-300 mx-auto'}></div>
                    </div>
                    <div className={'mx-auto px-[10%] mt-5 mb-10'}>
                        <p className={'text-sm text-center'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit pretium
                            imperdiet. Nullam in tristique justo. Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed lacinia ante eu elit pretium imperdiet. Nullam in tristique justo.
                        </p>
                    </div>
                    <Button size={'md'} className={'mx-auto'} link={undefined} onClick={toggle}>Go back</Button>
                </div>
            </div>
        </>
    )
}
import Cover from "./Cover.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button.tsx";

interface Props {
    title: string
    children: string | string[]
    buttonText: string
    toggle: () => void
    buttonToggle?: () => void
    link?: string
    error?: string
}

export default function Alert(props: Props) {

    return (
        <>
            <Cover show={true} onClick={props.toggle}/>
            <div className={'absolute w-full z-50 left-0 top-0 flex justify-center'}>
                <div
                    className={'absolute mx-auto bg-white w-full flex flex-col min-h-[10rem] rounded-lg px-10 pt-14 pb-10 shadow font-open-sans md:w-[38rem]'}>
                    <FontAwesomeIcon icon={faXmark} size={'xl'}
                                     className={'cursor-pointer absolute right-5 top-3.5 text-slate-500'}
                                     onClick={props.toggle}
                    />
                    <div className={'w-full mx-auto text-center'}>
                        <h4 className={'uppercase font-spartan text-3xl font-semibold mb-2'}>{props.title}</h4>
                        <div className={'h-[2px] bg-slate-300 mx-auto'}></div>
                    </div>
                    <div className={'mx-auto px-[10%] mt-5 mb-10'}>
                        {props?.error && <p className={'font-open-sans mt-1 text-red-800 text-xs'}>*{props?.error}</p>}
                        <p className={'text-sm text-center'}>
                            {props.children}
                        </p>
                    </div>
                    <div className={'text-center mx-auto '}>
                        <Button size={'md'} link={props?.link} className={'w-[10rem]'}
                                onClick={props?.buttonToggle}>{props.buttonText}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
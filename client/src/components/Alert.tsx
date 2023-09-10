import Cover from "./Cover.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button.tsx";
import {useEffect, useRef} from "react";

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
    const alert = useRef(null)

    useEffect(() => {
        // @ts-ignore
        alert.current.focus()
    }, [])

    return (
        <>
            <Cover show={true} onClick={props.toggle}/>
            <div className={'modal'}>
                <div
                    className={'modal-container'}>
                    <FontAwesomeIcon icon={faXmark} size={'xl'}
                                     className={'cursor-pointer absolute right-5 top-3.5 text-slate-500'}
                                     onClick={props.toggle}
                    />
                    <div className={'w-full mx-auto text-center'}>
                        <h4 className={`heading-four mb-2`} ref={alert}>{props.title}</h4>
                        <div className={'divider'}></div>
                    </div>
                    <div className={'mx-auto px-[10%] mt-5 mb-10'}>
                        {props?.error && <p className={`error-message mt-1`}>*{props?.error}</p>}
                        <p className={'paragraph text-center'}>
                            {props.children}
                        </p>
                    </div>
                    <div className={'text-center mx-auto'}>
                        <Button size={'md'} link={props?.link} className={'w-[10rem]'}
                                onClick={props?.buttonToggle}>{props.buttonText}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
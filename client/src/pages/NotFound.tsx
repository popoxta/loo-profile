import Button from "../components/Button.tsx";
import {useNavigate} from "react-router-dom";
import {ReactElement} from "react";

interface Props {
    children?: string | ReactElement | ReactElement[]
}

export default function NotFound(props: Props) {
    const navigate = useNavigate()

    const handleGoBack = () => navigate('/')

    return (
        <main className={'screen pt-52 md:pt-80'}>
            <div className={`flex-col-10 place-items-center md:flex-row`}>
                <div className={'max-w-lg text-center flex flex-col place-items-center'}>
                    <h1 className={`heading-one font-bold normal-case`}>
                        Oops...
                    </h1>
                    <div className={'font-spartan text-slate-500'}>
                        {props?.children
                            ? props?.children
                            : <>
                                <p>Looks like what you're looking for isn't here or has been removed!</p>
                                <p>We apologize for any inconvenience</p>
                            </>
                        }
                    </div>
                    <Button size={'md'} className={'w-[10rem] mt-5'} onClick={handleGoBack}>Go Home</Button>
                </div>
            </div>
        </main>
    )
}
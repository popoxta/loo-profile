import Button from "../components/Button.tsx";
import {useNavigate} from "react-router-dom";
import styles from '../lib/style-presets.ts'
import {ReactElement} from "react";

interface Props {
    children?: string | ReactElement | ReactElement[]
}

export default function NotFound(props: Props) {
    const navigate = useNavigate()

    const handleGoBack = () => navigate('/')

    return (
        <main className={styles.screenContainer}>
            <div className={`${styles.flexCol10} place-items-center md:flex-row`}>
                <div className={'max-w-lg text-center flex flex-col place-items-center'}>
                    <h1 className={`${styles.headingOneBold} normal-case`}>
                        Oops...
                    </h1>
                    <div className={styles.subText}>
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
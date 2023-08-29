import Button from "../components/Button.tsx";
import {useNavigate} from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate()

    const handleGoBack = () => navigate('/')

    return (
        <main className={'flex justify-center px-5 h-full'}>
            <div className={'flex gap-10 place-items-center flex-col md:flex-row mt-40 md:mt-52'}>
                <div className={'max-w-lg text-center flex flex-col place-items-center'}>
                    <h1 className={'font-bold text-slate-900 mb-5 text-5xl md:text-7xl'}>
                        Oops...!
                    </h1>
                    <div className={'text-slate-600'}>
                    <p>Looks like what you're looking for isn't here or has been removed!</p>
                        <p>We apologize for any inconvenience</p>
                    </div>
                    <Button size={'md'} className={'w-[10rem] mt-5'} onClick={handleGoBack}>Go Home</Button>
                </div>
            </div>
        </main>
    )
}
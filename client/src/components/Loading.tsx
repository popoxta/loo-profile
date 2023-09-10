import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFan} from "@fortawesome/free-solid-svg-icons";

export default function Loading({full}: { full?: boolean | undefined }) {
    const loading = <div className={'h-full flex flex-col justify-center place-items-center'}>
        <FontAwesomeIcon className={'text-slate-200 animate-spin'} size={'5x'} icon={faFan}/>
        <p className={'mt-6 font-spartan text-2xl font-bold text-slate-300 text-center'}>
            Loading...
        </p>
    </div>
    return (
        full
            ? <main className={'flex justify-center place-items-center min-h-screen px-5'}>{loading}</main>
            : loading
    )
}
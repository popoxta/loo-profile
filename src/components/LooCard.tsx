import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToilet, faStar} from "@fortawesome/free-solid-svg-icons";
import SmallButton from "./SmallButton.tsx";

export default function LooCard() {
    return (
        <div className={'flex w-full place-items-center py-3 pr-5 border-b-2 border-slate-300 font-open-sans'}>
            <FontAwesomeIcon className={'mx-6 text-slate-400'} size={'2xl'} icon={faToilet}/>
            <div className={'flex flex-col w-full'}>
                <div className={'flex justify-between place-items-center'}>
                    <h3 className={'text-sm font-semibold'}>Some title</h3>
                    <div>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                    </div>
                </div>
                <p className={'text-xs'}>123 Something ln, City</p>
                <p className={'text-xs'}>Witty, TX, 82309</p>
                <div className={'flex place-items-center justify-between'}>
                    <p className={'text-xs'}>022 302 6406</p>
                    <SmallButton link={'.'}>View</SmallButton>
                </div>
            </div>
        </div>
    )
}
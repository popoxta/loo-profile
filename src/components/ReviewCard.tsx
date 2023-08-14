import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

export default function ReviewCard() {
    return (
        <div className={'w-full px-5 py-10 border-b-2 border-slate-200 text-slate-900 place-items-center font-open-sans flex gap-5'}>
            <div className={'w-12 h-12 bg-slate-500 rounded-full flex-shrink-0'}></div>
            <div>
                <div className={'flex place-items-center gap-2.5'}>
                    <p className={'font-bold'}>SOME PERSON</p>
                    <div className={'flex gap-0.5'}>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                    </div>
                </div>
                <p className={'text-sm mt-1 max-w-4xl'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit pretium imperdiet.
                    Nullam in tristique justo. In suscipit metus et nunc ornare, nec blandit eros malesuada. Praesent
                    aliquet elit at nisl porta, vel lobortis dolor auctor.
                </p>
            </div>
        </div>
    )
}
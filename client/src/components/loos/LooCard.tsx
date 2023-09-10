import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faToilet} from "@fortawesome/free-solid-svg-icons";
import {Loo} from "../../lib/types/types.ts";
import Button from "../Button.tsx";
import Stars from "../Stars.tsx";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";

interface Props {
    loo: Loo,
    isLast: boolean
    onClick?: () => void
}

export default function LooCard(props: Props) {
    const {loo, isLast} = props
    const {data: user} = useUserQuery()

    return (
        <div
            onClick={props?.onClick ? props.onClick : () => {
            }}
            className={`flex w-full place-items-center py-5 pr-5 ${isLast ? '' : 'border-b-2'} border-slate-200 h-32`}>
            <FontAwesomeIcon className={'mx-5 text-slate-400'} size={'2xl'} icon={faToilet}/>
            <div className={'flex flex-col w-full h-full justify-between'}>
                <div className={'flex justify-between place-items-center'}>
                    <div className={'flex gap-2 place-items-center'}>
                        <h3 className={'text-slate-900 font-open-sans text-sm font-semibold'}>{loo.name}</h3>
                        {user &&
                            <FontAwesomeIcon
                                className={`-mb-0.5 cursor-pointer transition-colors ${!!loo?.isSaved ? 'hover:text-slate-300 text-pink-600' : 'text-slate-300 hover:text-pink-600'}`}
                                size={'xs'} icon={faHeart}/>
                        }
                    </div>
                    <div className={'flex gap-[0.1rem] mb-1 '}>
                        <Stars rating={loo.avg_rating ?? 0} size={15}/>
                    </div>
                </div>
                <div className={'text-slate-900 font-open-sans text-xs'}>
                    <p>{loo.street}</p>
                    <p>{loo.region}</p>
                </div>
                <div className={'flex place-items-center justify-between'}>
                    <p className={'font-open-sans text-xs text-slate-500'}>{loo.contact}</p>
                    <Button size={'sm'} link={`/loos/${loo.id}`}>View</Button>
                </div>
            </div>
        </div>
    )
}
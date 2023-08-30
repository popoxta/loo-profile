import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToilet} from "@fortawesome/free-solid-svg-icons";
import {Loo} from "../lib/types/types.ts";
import Button from "./Button.tsx";
import Stars from "./Stars.tsx";

interface Props {
    loo: Loo,
    isLast: boolean
    onClick?: () => void
}

export default function LooCard(props: Props) {
    const {loo, isLast} = props

    return (
        <div
            onClick={props?.onClick ? props.onClick : () => {}}
            className={`flex w-full place-items-center py-5 pr-5 ${isLast ? '' : 'border-b-2' } border-slate-200 text-slate-900 h-32 font-open-sans`}>
            <FontAwesomeIcon className={'mx-6 text-slate-400'} size={'2xl'} icon={faToilet}/>
            <div className={'flex flex-col w-full h-full justify-between'}>
                <div className={'flex justify-between place-items-center'}>
                    <h3 className={'text-sm font-semibold'}>{loo.name}</h3>
                    <div className={'flex gap-[0.1rem]'}>
                        <Stars rating={loo.avg_rating} size={15}/>
                    </div>
                </div>
                <div>
                    <p className={'text-xs'}>{loo.street}</p>
                    <p className={'text-xs'}>{loo.region}</p>
                </div>
                <div className={'flex place-items-center justify-between'}>
                    <p className={'text-xs text-slate-500'}>{loo.contact}</p>
                    <Button size={'sm'} link={`/loos/${loo.id}`}>View</Button>
                </div>
            </div>
        </div>
    )
}
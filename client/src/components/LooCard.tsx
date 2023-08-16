import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToilet, faStar} from "@fortawesome/free-solid-svg-icons";
import {Loo} from "../lib/types.ts";
import Button from "./Button.tsx";

interface Props {
    loo: Loo,
    onClick?: () => void
}

export default function LooCard(props: Props) {
    const {loo} = props
    return (
        <div
            onClick={props?.onClick ? props.onClick : () => {}}
            className={'flex w-full place-items-center py-5 pr-5 border-b-2 border-slate-200 text-slate-900 h-32 font-open-sans'}>
            <FontAwesomeIcon className={'mx-6 text-slate-400'} size={'2xl'} icon={faToilet}/>
            <div className={'flex flex-col w-full h-full justify-between'}>
                <div className={'flex justify-between place-items-center'}>
                    <h3 className={'text-sm font-semibold'}>{loo.name}</h3>
                    <div className={'flex gap-[0.1rem]'}>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                        <FontAwesomeIcon size={'xs'} className={'text-slate-400'} icon={faStar}/>
                    </div>
                </div>
                <div>
                    <p className={'text-xs'}>{loo.street}</p>
                    <p className={'text-xs'}>{loo.area}</p>
                </div>
                <div className={'flex place-items-center justify-between'}>
                    <p className={'text-xs text-slate-500'}>{loo.phone}</p>
                    <Button size={'sm'} link={`/loos/${loo.id}`}>View</Button>
                </div>
            </div>
        </div>
    )
}
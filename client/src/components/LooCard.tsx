import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToilet} from "@fortawesome/free-solid-svg-icons";
import {Loo} from "../lib/types/types.ts";
import Button from "./Button.tsx";
import Stars from "./Stars.tsx";
import styles from '../lib/style-presets.ts'

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
            className={`flex w-full place-items-center py-5 pr-5 ${isLast ? '' : 'border-b-2' } border-slate-200 h-32`}>
            <FontAwesomeIcon className={'mx-6 text-slate-400'} size={'2xl'} icon={faToilet}/>
            <div className={'flex flex-col w-full h-full justify-between'}>
                <div className={'flex justify-between place-items-center'}>
                    <h3 className={styles.looCardTitle}>{loo.name}</h3>
                    <div className={'flex gap-[0.1rem]'}>
                        <Stars rating={loo.avg_rating ?? 0} size={15}/>
                    </div>
                </div>
                <div>
                    <p className={styles.looCardSubtext}>{loo.street}</p>
                    <p className={styles.looCardSubtext}>{loo.region}</p>
                </div>
                <div className={'flex place-items-center justify-between'}>
                    <p className={styles.looCardSmallText}>{loo.contact}</p>
                    <Button size={'sm'} link={`/loos/${loo.id}`}>View</Button>
                </div>
            </div>
        </div>
    )
}
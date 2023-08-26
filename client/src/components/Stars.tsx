import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

interface StarProps {
    size: SizeProp
    fill: 'full' | 'half' | 'empty'
}
interface Props {
    rating: number,
    size: SizeProp
}

export function Star(props: StarProps) {
    if(props.fill === 'full') return <FontAwesomeIcon size={props.size} className={'text-slate-400'} icon={faStar}/>
    if (props.fill === 'half') return <FontAwesomeIcon size={props.size} className={'text-slate-400'} icon={faStarHalf}/>
    else return <FontAwesomeIcon size={props.size} className={'text-slate-300'} icon={faStar}/>
}

export default function Stars(props: Props) {
    const {size, rating} = props

    const stars = Array.from({length: 5}).map(() => <Star key={crypto.randomUUID()} size={size} fill={'empty'}/>)
        .map((star, i) => i < Math.floor(rating) ? <Star key={crypto.randomUUID()} size={size} fill={'full'}/> : star)

    if (rating % 1 != 0) stars[Math.floor(rating)] = <Star key={crypto.randomUUID()} size={size} fill={'half'}/>

    return <>{stars}</>

}
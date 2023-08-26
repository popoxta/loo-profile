import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

interface Props {
    rating: number,
    size: SizeProp
}

export default function Stars(props: Props) {
    const {size, rating} = props

    const fullStar = <FontAwesomeIcon size={size} className={'text-slate-400'} icon={faStar}/>
    const emptyStar = <FontAwesomeIcon size={size} className={'text-slate-300'} icon={faStar}/>
    const halfStar = <FontAwesomeIcon size={size} className={'text-slate-400'} icon={faStarHalf}/>

    const stars = Array.from({length: 5}).fill(emptyStar).fill(fullStar, 0, Math.floor(rating));
    if (rating % 1 != 0) stars[Math.floor(rating)] = halfStar

    return <>{stars}</>

}
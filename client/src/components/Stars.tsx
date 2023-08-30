import {Rating} from "react-simple-star-rating";

interface Props {
    rating: number,
    size: number
    style?: { [e: string]: string }
}

export default function Stars(props: Props) {
    return <Rating size={props.size} style={props.style} emptyStyle={{ display: "flex" }} fillStyle={{ display: "-webkit-inline-box" }} readonly={true} initialValue={props.rating}/>

}
import {Link} from "react-router-dom";

interface Props {
    link?: string,
    children?: string
    size?: buttonSizes
    onClick?: () => void
    className?: string
}

type buttonSizes = ('sm' | 'md' | 'lg')

export default function Button(props: Props) {
    const sizingStyles=
        props.size === 'sm'
        ? 'py-0.5 px-6 text-xs font-semibold'
        : props.size === 'lg'
            ? 'py-3 px-6 font-bold uppercase'
            : `py-2 px-5 font-semibold text-sm`

    const buttonStyles = `${props.className} ${sizingStyles} bg-slate-200 font-spartan text-slate-900 rounded-lg hover:text-slate-800 hover:bg-slate-300 transition-all ease-in-out`

    return (
        <>
            {props.link
                ? <Link to={props.link}><button onClick={props.onClick} className={buttonStyles}>{props.children}</button></Link>
                : <button onClick={props.onClick} className={buttonStyles}>{props.children}</button>}
        </>
    )
}
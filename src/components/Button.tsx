interface Props {
    link?: string,
    children?: string
    onClick?: () => void
    className?: string
}

export default function Button(props: Props) {
    const buttonStyles: string = `${props.className} bg-slate-200 py-2 px-5 font-spartan font-semibold text-sm text-slate-900 rounded-lg hover:text-slate-800 hover:bg-slate-300 transition-all ease-in-out`

    return (
        <>
            {props.link
                ? <a href={props.link}><button onClick={props.onClick} className={buttonStyles}>{props.children}</button></a>
                : <button onClick={props.onClick} className={buttonStyles}>{props.children}</button>}
        </>
    )
}
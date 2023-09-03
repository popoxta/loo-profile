import {Link} from "react-router-dom";
import styles from '../lib/style-presets.ts'

interface Props {
    link?: string,
    children?: string
    size?: buttonSizes
    onClick?: (e?: any) => any
    className?: string
    title?: string
    disabled?: boolean
}

type buttonSizes = ('sm' | 'md' | 'lg')

export default function Button(props: Props) {
    const sizingStyles =
        props.size === 'sm'
            ? `py-0.5 px-6 ${styles.buttonTextSm}`
            : props.size === 'lg'
                ? `py-3 px-6 ${styles.buttonTextLg}`
                : `py-2 px-5 ${styles.buttonTextMd}`

    const buttonStyles = `${props.className} ${sizingStyles} bg-slate-200 font-spartan text-slate-900 rounded-lg hover:text-slate-800 hover:bg-slate-300 transition-all ease-in-out`

    return (
        <>
            {props.link
                ? <Link to={props.link}>
                    <button disabled={props?.disabled ?? false} onClick={props.onClick} title={props.title ? props.title : ''}
                            className={buttonStyles}>{props.children}</button>
                </Link>
                : <button disabled={props?.disabled ?? false} onClick={props.onClick} title={props.title ? props.title : ''}
                          className={buttonStyles}>{props.children}</button>}
        </>
    )
}
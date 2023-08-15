interface Props {
    show: boolean,
    onClick: () => void
}

export default function Cover(props: Props) {
    return (
        <div
            className={`${props.show ? 'opacity-30 visible' : 'opacity-0 invisible'} cursor-pointer duration-400 translate-all ease-in-out w-screen h-screen fixed bg-black top-0 left-0 z-10`}
            onClick={props.onClick}>
        </div>
    )
}
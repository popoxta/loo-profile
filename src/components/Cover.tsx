export default function Cover({show, onClick}: {show: boolean, onClick: () => void}) {
    return (
        <div
            className={`${show ? 'opacity-30 visible' : 'opacity-0 invisible'} cursor-pointer duration-400 translate-all ease-in-out w-screen h-screen fixed bg-black top-0 left-0 z-10`}
            onClick={onClick}></div>
    )
}
import Menu from "./Menu.tsx";

export default function Header() {
    return (
        <>
            <header
                className={'relative h-14 border-b-2 border-slate-300 shadow flex place-items-center justify-between px-5 sm:px-14 lg:px-32'}>
                <h1 className={'font-spartan text-xl font-bold text-slate-500 hover:text-sky-700 transition-colors ease-in-out'}>
                    <a href="/">LOO PROFILE</a>
                </h1>
            </header>
            <Menu/>
        </>
    )
}
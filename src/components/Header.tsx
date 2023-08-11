import Menu from "./Menu.tsx";
import {useState} from "react";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function Header() {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = (): void => setShowMenu(!showMenu)

    return (
        <>
            <header
                className={'relative h-14 border-b-2 border-slate-300 shadow flex place-items-center justify-between px-5 sm:px-12'}>
                <h1 className={'font-spartan text-xl font-bold text-slate-500 hover:text-sky-700 transition-colors ease-in-out'}>
                    <a href="/">LOO PROFILE</a>
                </h1>
                <FontAwesomeIcon icon={showMenu ? faXmark : faBars} size={showMenu ? '2xl' : 'xl'}
                                 className={'cursor-pointer absolute sm:right-12 right-5 z-50'} onClick={toggleMenu}/>
            </header>
            <Menu show={showMenu}/>
        </>
    )
}
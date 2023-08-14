import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

export default function Menu({show, toggle}: { show: boolean, toggle: () => void }) {

    return (
        <>
            <div
                className={`${show ? 'opacity-30 visible' : 'opacity-0 invisible'} cursor-pointer duration-400 translate-all ease-in-out w-screen h-screen fixed bg-black top-0 z-10`}
                onClick={toggle}></div>
            <nav
                className={`${show ? 'translate-x-0' : 'translate-x-full'} duration-200 transition-all ease-in-out fixed right-0 top-0 h-full w-full bg-white z-20 font-spartan min-w-[26rem] lg:w-1/4 py-5 px-8 md:w-1/2`}>
                <FontAwesomeIcon icon={faXmark} size={'2xl'}
                                 className={'cursor-pointer absolute top-3 right-5 sm:right-12'} onClick={toggle}/>
                <ul>
                    <li className={'flex gap-5 border-b-2 border-slate-300 py-5 px-2 mb-2'}>
                        <div className={'w-20 h-20 bg-slate-500 rounded-full'}></div>
                        <div className={'flex flex-col justify-center'}>
                            <p className={'font-bold text-2xl uppercase text-slate-900'}>Username</p>
                            <p className={'text-slate-500'}>123 reviews | 34 saved</p>
                        </div>
                    </li>
                    <li className={'border-b-2 text-slate-900 border-slate-200 py-8 px-2 mx-5 text-2xl font-medium text-center'}>
                        Dashboard
                    </li>
                    <li className={'border-b-2 text-slate-900 border-slate-200 py-8 px-2 mx-5 text-2xl font-medium text-center'}>
                        Locator
                    </li>
                    <li className={'border-b-2 text-slate-900 border-slate-200 py-8 px-2 mx-5 text-2xl font-medium text-center'}>
                        Saved
                    </li>
                    <li className={'text-slate-900 py-8 px-2 text-2xl font-medium mx-5 text-center'}>
                        Account
                    </li>
                </ul>
            </nav>
        </>
    )
}
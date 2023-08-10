export default function Menu() {
    return (
        <div>
            <div className={'w-screen h-screen absolute bg-black top-0 opacity-30'}></div>
            <nav className={'absolute top-0 right-0 h-full w-full bg-white font-spartan lg:w-1/4 py-5 px-8 md:w-1/2'}>
                <ul>
                    <li>
                        <div className={'flex gap-5 border-b-2 border-slate-300 py-5 px-2'}>
                            <div className={'w-20 h-20 bg-slate-500 rounded-full'}></div>
                            <div className={'flex flex-col justify-center'}>
                                <p className={'font-bold text-2xl uppercase'}>Username</p>
                                <p className={'text-slate-500'}>123 reviews | 34 saved</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
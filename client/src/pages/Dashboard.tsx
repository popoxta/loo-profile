import {useUserQuery} from "../lib/hooks/useUserQuery.ts";
import {Link, Navigate} from "react-router-dom";

export default function Dashboard() {
    const {data: user} = useUserQuery()
    if (!user) return <Navigate to={'/login'}/>

    return (
        <main className={'mt-20 md:mt-28 px-5 mb-10'}>
            <div className={'flex flex-col place-items-center mx-auto max-w-6xl gap-5 text-slate-900'}>
                <div className={'text-center'}>
                    <h2 className={'text-4xl font-semibold font-spartan uppercase'}>Welcome, {user.username}!</h2>
                    <div className={'h-[2px] bg-slate-300 mx-auto my-2.5'}></div>

                    <div className={'flex gap-5 px-5 font-spartan font-medium text-slate-900 sm:gap-10'}>
                        <Link to={'./loos'} className={'hover:text-slate-700 transition-colors'}>My Loos</Link>
                        <Link to={'./reviews'} className={'hover:text-slate-700 transition-colors'}>My Reviews</Link>
                        <Link to={'./saved'} className={'hover:text-slate-700 transition-colors'}>Saved Loos</Link>
                        <Link to={'./profile'} className={'hover:text-slate-700 transition-colors'}>Edit Profile</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
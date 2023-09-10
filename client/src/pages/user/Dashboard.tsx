import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import {Link, Navigate} from "react-router-dom";
import Loading from "../../components/Loading.tsx";

export default function Dashboard() {
    const {data: user, isLoading} = useUserQuery()
    if (!user && !isLoading) return <Navigate to={'/login'}/>

    return (
        <main className={'screen pt-32 md:pt-64'}>
            {isLoading
                ? <Loading/>
                : <div className={`flex-col-5 place-items-center mx-auto max-w-6xl min-h-[25rem]`}>
                    <div className={'text-center'}>
                        <h2 className={'heading-two'}>Welcome, {user?.username}!</h2>
                        <div className={'divider'}></div>
                        <div className={`flex px-5 font-spartan font-medium text-slate-900 justify-between`}>
                            <Link to={'./loos'} className={'hover:text-slate-700 transition-colors'}>My Loos</Link>
                            <Link to={'./reviews'} className={'hover:text-slate-700 transition-colors'}>My Reviews</Link>
                            <Link to={'./saved'} className={'hover:text-slate-700 transition-colors'}>Saved Loos</Link>
                            <Link to={'./profile'} className={'hover:text-slate-700 transition-colors'}>Edit Profile</Link>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}
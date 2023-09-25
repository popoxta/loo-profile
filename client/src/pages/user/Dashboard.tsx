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
                : <div className={`flex-col-10 place-items-center mx-auto max-w-6xl min-h-[25rem]`}>
                    <div className={'text-center'}>
                        <h2 className={'heading-two'}>Welcome, {user?.username}!</h2>
                        <div className={'divider'}></div>
                        <div className={`flex px-5 font-spartan font-medium text-slate-900 justify-between`}>
                            <Link to={'./loos'} className={'hover:text-slate-700 transition-colors'}>My Loos</Link>
                            <Link to={'./reviews'} className={'hover:text-slate-700 transition-colors'}>My
                                Reviews</Link>
                            <Link to={'./saved'} className={'hover:text-slate-700 transition-colors'}>Saved Loos</Link>
                            <Link to={'./profile'} className={'hover:text-slate-700 transition-colors'}>Edit
                                Profile</Link>
                        </div>
                    </div>
                    <div className={'border-card sm:h-72 h-96 w-full bg-slate-200 p-5 md:min-w-[36rem]'}>
                        <div className={'flex-col-5 h-full w-full sm:flex-row sm:gap-10'}>
                            <img className={'object-cover h-full w-full sm:w-52 rounded-lg'}
                                 src="https://images.unsplash.com/photo-1603568534543-29a3328479f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                                 alt="User loo"/>
                            <div className={'flex-col-2 place-items-center sm:place-items-start sm:gap-5 text-center sm:text-left'}>
                                <h3 className={'heading-four font-medium'}>{user?.username}</h3>
                                <div className={'subheading text-base leading-7'}>
                                    <p>{user?.loos} loos created</p>
                                    <p>{user?.saved} loos saved</p>
                                    <p>{user?.reviews} reviews written</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}
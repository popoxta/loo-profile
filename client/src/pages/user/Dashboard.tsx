import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import {Link, Navigate} from "react-router-dom";
import styles from '../../lib/style-presets.ts'
import Loading from "../../components/Loading.tsx";

export default function Dashboard() {
    const {data: user, isLoading} = useUserQuery()
    if (!user && !isLoading) return <Navigate to={'/login'}/>

    return (
        <main className={styles.screenContainer}>
            {isLoading
                ? <Loading/>
                : <div className={`${styles.flexCol5} place-items-center mx-auto max-w-6xl`}>
                    <div className={'text-center'}>
                        <h2 className={styles.headingTwo}>Welcome, {user.username}!</h2>
                        <div className={styles.divider}></div>
                        <div className={`flex px-5 ${styles.dashboardText} justify-between`}>
                            <Link to={'./loos'} className={styles.textHover}>My Loos</Link>
                            <Link to={'./reviews'} className={styles.textHover}>My Reviews</Link>
                            <Link to={'./saved'} className={styles.textHover}>Saved Loos</Link>
                            <Link to={'./profile'} className={styles.textHover}>Edit Profile</Link>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import {Navigate, useNavigate} from "react-router-dom";
import {useUserLooQuery} from "../../lib/hooks/useUserLoosQuery.ts";
import Loading from "../../components/Loading.tsx";
import styles from '../../lib/style-presets.ts'
import Button from "../../components/Button.tsx";

export default function UserLoos() {
    const navigate = useNavigate()
    const user = useUserQuery()
    if (!user) return <Navigate to={'/login'}/>
    const loos = useUserLooQuery(Number(user?.data?.id))

    if (loos.isLoading || user.isLoading) return <div className={styles.screenContainer}><Loading/></div>
    // todo render user's loos
    //
    // const looCards = loos.data
    //     ? loos?.data?.map((loo: Loo) => <div>{loo.name}</div>)
    //     : undefined

    return (
        <main className={styles.screenContainer}>
            <div className={`${styles.flexCol2} place-items-center `}>

                <h2 className={styles.looHeading}>
                    No Loos yet!
                </h2>
                <p className={`${styles.paragraphText} max-w-lg text-center`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit pretium imperdiet.
                </p>
                <Button size={'md'} className={'w-[10rem] mt-2.5 '} onClick={() => navigate('/new')}>Add a Loo</Button>
            </div>
        </main>
    )
}
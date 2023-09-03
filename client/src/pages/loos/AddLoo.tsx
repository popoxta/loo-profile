import LooForm from "../../components/loos/LooForm.tsx";
import styles from '../../lib/style-presets.ts'
import {Loo} from "../../lib/types/types.ts";
import {useAllLoosQuery} from "../../lib/hooks/useAllLoosQuery.ts";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import {Navigate, useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import Loading from "../../components/Loading.tsx";

export default function AddLoo() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const loos = useAllLoosQuery()
    const {data: user, isLoading} = useUserQuery()

    if (!user && !isLoading) return <Navigate to={'/login'}/>

    const handleSubmit = async (loo: Loo) => {
        const newLoo: Loo = {...loo, user_id: user?.id}
        await loos.addLoo.mutate(newLoo, {
            onSuccess: data => {
                queryClient.invalidateQueries(['loos'])
                navigate(`/loos/${data?.id}`)
            }
        })
    }

    return (
        <main className={`${styles.screenContainer} ${styles.flexCol2}`}>
            {isLoading
                ? <Loading/>
                : <>
                    <h1 className={styles.looHeading}>add loo</h1>
                    <LooForm submitFn={handleSubmit}/>
                </>
            }
        </main>
    )
}
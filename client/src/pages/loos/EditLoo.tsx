import LooForm from "../../components/loos/LooForm.tsx";
import styles from '../../lib/style-presets.ts'
import {Loo} from "../../lib/types/types.ts";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/Loading.tsx";
import {useLooQuery} from "../../lib/hooks/useLooQuery.ts";
import NotFound from "../NotFound.tsx";
import {useQueryClient} from "react-query";

export default function EditLoo() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const id: string | undefined = useParams().id
    const {data: loo, isLoading, isError, updateLoo, } = useLooQuery(Number(id))
    const {data: user, isLoading: isLoadingUser} = useUserQuery()

    if (!user && !isLoadingUser) return <Navigate to={'/login'}/>

    if (user?.id !== loo?.loo?.user_id) return <Navigate to={'/dashboard/loos'}/>

    if (isError) return <NotFound>
        {id
            ? <>
                <p>Loo {id} is not currently accessible or may be permanently removed!</p>
                <p>Please try again later.</p>
            </>
            : <p>Sorry, we can't find that page!</p>
        }
    </NotFound>

    if (isLoading || loo === undefined)
        return <div className={styles.screenContainer}><Loading/></div>

    const handleSubmit = async (loo: Loo) => {
        const newLoo: Loo = {...loo, user_id: user?.id}
        await updateLoo.mutate(newLoo, {
            onSuccess: () => {
               queryClient.invalidateQueries(['loos', loo.id])
                navigate(`/loos/${loo.id}`)
            }
        })
    }

    return (
        <main className={`${styles.screenContainer} ${styles.flexCol2}`}>
            {isLoading
                ? <Loading/>
                : <>
                    <h1 className={styles.looHeading}>add loo</h1>
                    <LooForm submitFn={handleSubmit} loo={loo?.loo}/>
                </>
            }
        </main>
    )
}
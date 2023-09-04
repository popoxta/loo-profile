import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import {Navigate, useNavigate} from "react-router-dom";
import {useUserLooQuery} from "../../lib/hooks/useUserLoosQuery.ts";
import Loading from "../../components/Loading.tsx";
import styles from '../../lib/style-presets.ts'
import Button from "../../components/Button.tsx";
import {Loo} from "../../lib/types/types.ts";
import LooCardLarge from "../../components/loos/LooCardLarge.tsx";

export default function UserLoos() {
    const navigate = useNavigate()
    const {data: user, isLoading: isLoadingUser} = useUserQuery()
    const {data: loos, isLoading} = useUserLooQuery(Number(user?.id))

    if (isLoading || isLoadingUser) return <div className={styles.screenContainer}><Loading/></div>
    if (!user && !isLoadingUser) return <Navigate to={'/login'}/>

    const looCards = loos
        // @ts-ignore
        ? loos?.map((loo: Loo, i: number) => <LooCardLarge user={user} isLast={i === loos.length - 1} key={loo.id} loo={loo}/>)
        : undefined

    // @ts-ignore
    const averageRating = Number((loos?.reduce((acc, curr) => acc + curr.avg_rating, 0) / loos?.length).toFixed(2))

    return (
        <main className={`${styles.screenContainer} w-full`}>
            {    // @ts-ignore
                loos?.length > 0
                    ?
                    <div className={`lg:w-[50rem] w-full md:w-[40rem] flex flex-col min-h-[25rem]`}>
                        <div className={'text-center mb-2.5'}>
                            <h1 className={`${styles.looHeading} mb-0.5`}>{user?.username}'s Loos</h1>
                            <div className={'flex gap-5 justify-center place-items-center'}>
                                {/* @ts-ignore */}
                                <h2 className={styles.paragraphText}>{loos?.length} Loo{loos?.length > 0 ? 's' : ''} Created</h2>
                                <p className={`text-slate-400`}>|</p>
                                <h2 className={`${styles.paragraphText}`}>Average
                                    Rating: {isNaN(averageRating) ? 0 : averageRating}</h2>
                            </div>
                        </div>
                        <div className={'place-self-end mb-2.5 mr-0.5'}>
                            <Button size={'sm'} link={'/loos/new'} className={'w-[6rem] py-1'}>New</Button>
                        </div>
                        <div
                            className={`${styles.borderSlate} min-h-[8rem] flex-col flex justify-center overflow-y-scroll`}>
                            {looCards}
                        </div>
                    </div>
                    : <div className={`${styles.flexCol2} place-items-center `}>
                        <h1 className={styles.looHeading}>
                            No Loos yet!
                        </h1>
                        <p className={`${styles.paragraphText} max-w-lg text-center`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit pretium
                            imperdiet.
                        </p>
                        <Button size={'md'} className={'w-[10rem] mt-2.5 '} onClick={() => navigate('/loos/new')}>Add a
                            Loo</Button>
                    </div>
            }
        </main>
    )
}
import {useUserSavedQuery} from "../../lib/hooks/useUserSavedQuery.ts";
import {Navigate, useNavigate} from "react-router-dom";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import Button from "../../components/Button.tsx";
import Loading from "../../components/Loading.tsx";
import {Loo} from "../../lib/types/types.ts";
import SavedLooCard from "../../components/loos/SavedLooCard.tsx";

export default function SavedLoos() {
    const navigate = useNavigate()
    const {data: user, isLoading: isLoadingUser} = useUserQuery()
    const {data: loos, isLoading} = useUserSavedQuery(Number(user?.id))

    if (isLoading || isLoadingUser) return <Loading full={true}/>
    if (!user && !isLoadingUser) return <Navigate to={'/login'}/>

    const looCards = loos
        ? loos?.map((loo: Loo, i: number) => <SavedLooCard isLast={i === loos.length - 1} key={loo.id} loo={loo}/>)
        : undefined

    return (
        <main className={`screen pt-40 md:pt-52`}>
            {loos?.length > 0
                ?
                <div className={`lg:w-[50rem] w-full flex flex-col min-h-[25rem]`}>
                    <div className={'text-center mb-5'}>
                        <h1 className={`heading-three mb-0.5`}>{user?.username}'s Saved Loos</h1>
                    </div>
                    <div
                        className={`border-card md:max-h-[31rem] overflow-y-scroll min-h-[8rem] flex-col flex`}>
                        {looCards}
                    </div>
                </div>
                : <div className={`flex-col-2 place-items-center `}>
                    <h1 className={'text-4xl font-semibold font-spartan uppercase'}>
                        No saved Loos yet!
                    </h1>
                    <p className={`paragraph max-w-lg text-center`}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit pretium
                        imperdiet.
                    </p>
                    <Button size={'md'} className={'w-[10rem] mt-2.5 '} onClick={() => navigate('/loos')}>
                        Discover Loos
                    </Button>
                </div>
            }
        </main>
    )
}
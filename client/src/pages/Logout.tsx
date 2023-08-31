import {getAuth, signOut} from "firebase/auth";
import {Navigate, useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import Button from "../components/Button.tsx";
import styles from '../lib/style-presets.ts'
import {useUserQuery} from "../lib/hooks/useUserQuery.ts";
import {useState} from "react";
import Loading from "../components/Loading.tsx";

export default function Logout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {data: user} = useUserQuery()
    const [isLoading, setIsLoading] = useState(false)
    if (!user) return <Navigate to={'/login'}/>

    const handleGoBack = () => navigate('/')

    async function handleLogout() {
        setIsLoading(true)
        const auth = getAuth()
        await signOut(auth)
        await queryClient.invalidateQueries(['user'])
        setIsLoading(false)
        navigate('/')
    }

    return (
        <main className={styles.screenContainer}>
            <div className={'flex place-items-center flex-col'}>
                {isLoading
                    ? <Loading/>
                    : <>
                        <h2 className={styles.looHeading}>
                            Are you sure you want to log out?
                        </h2>
                        <div className={'flex gap-10'}>
                            <Button size={'md'} className={'w-[10rem]'} onClick={handleLogout}>Logout</Button>
                            <Button size={'md'} className={'w-[10rem]'} onClick={handleGoBack}>Wait, take me
                                back!</Button>
                        </div>
                    </>
                }
            </div>
        </main>
    )
}
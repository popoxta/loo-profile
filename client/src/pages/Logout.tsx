import {getAuth, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import Button from "../components/Button.tsx";

export default function Logout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const handleGoBack = () => navigate('/')

    async function handleLogout() {
        const auth = getAuth()
        await signOut(auth)
        await queryClient.invalidateQueries(['user'])
        navigate('/')
    }

    return (
        <main className={'flex justify-center px-5 h-full'}>
            <div className={'flex place-items-center flex-col mt-40 md:mt-52 gap-5'}>
                <h1 className={'font-bold text-slate-900 mb-5 text-2xl md:text-3xl'}>
                    Are you sure you want to log out?
                </h1>
                <div className={'flex gap-10'}>
                    <Button size={'md'} className={'w-[10rem]'} onClick={handleLogout}>Logout</Button>
                    <Button size={'md'} className={'w-[10rem]'} onClick={handleGoBack}>Wait, take me back!</Button>
                </div>
            </div>
        </main>
    )
}
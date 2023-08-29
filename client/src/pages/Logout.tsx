import {getAuth, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";

export default function Logout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    async function handleLogout() {
        const auth = getAuth()
        await signOut(auth)
        await queryClient.invalidateQueries(['user'])
        navigate('/')
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
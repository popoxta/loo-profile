import {getAuth, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate()

    async function handleLogout() {
        const auth = getAuth()
       await signOut(auth)
        navigate('/')
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
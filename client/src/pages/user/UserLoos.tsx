import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import {Navigate} from "react-router-dom";

export default function UserLoos() {
    const user = useUserQuery()
    if (!user) return <Navigate to={'/login'}/>

    // const loos = useUserLooQuery(Number(2))

    return <h1> loos </h1>
}
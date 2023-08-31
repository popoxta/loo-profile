import {getAuth, onAuthStateChanged} from "firebase/auth";
import {User} from "firebase/auth";

const getFirebaseUser = async (): Promise<User | null> => {
    const auth = getAuth()

    return new Promise<User | null>((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user)
        })
    })
}

const getAccessToken = async (): Promise<string | undefined> => {
    const user = await getFirebaseUser()
    // @ts-ignore
    return user?.accessToken as string | undefined
}

const getFormattedDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const day = date.toLocaleDateString("en-US")
    const hour = date.toLocaleTimeString("en-NZ", {hour: 'numeric', hour12: true}).split(' ').join('')
    return {day, hour}
}

export {getFirebaseUser, getAccessToken, getFormattedDate}
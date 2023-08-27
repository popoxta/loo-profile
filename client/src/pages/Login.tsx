import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {Form} from "react-router-dom";

export async function action({request}) {
    const data = await request.formData()
    const email = data.get('email')
    const password = data.get('password')

    const auth = getAuth()
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    localStorage.setItem('token', credentials.user.accessToken)
    console.log(auth.currentUser)
    return null
}

export default function Login() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {

            console.log(user)
            // ...
        } else {

        }})

        return (
        <Form method={'POST'}>
            <label>
                Email:
                <input type="text" name={'email'} placeholder={'Username'}/>
            </label>
            <label>
                Password:
                <input type="text" name={'password'} placeholder={'Password'}/>
            </label>
            <button type={'submit'}>Log in</button>
        </Form>
    )
}
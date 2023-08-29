import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Form, Navigate, redirect} from "react-router-dom";
import {useUserQuery} from "../lib/hooks/useUserQuery.ts";

export async function action({request}: { request: Request }) {
    try {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        if (!email || email.length < 6) return {error: 'Invalid email address'}
        if (!password) return {error: 'Invalid password'}

        const auth = getAuth()
        const credentials = await signInWithEmailAndPassword(auth, String(email), String(password))
        if (credentials) return redirect('/dashboard')

        else return {error: 'Login error, please try again later'}

    } catch (e) {
        return {error: 'Login error, please try again later'}
    }
}

export default function Login() {
    const {data: user} = useUserQuery()
    if (user) return <Navigate to={'/dashboard'}/>

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
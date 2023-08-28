import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {Form, redirect, useActionData} from "react-router-dom";
import {getAllUsernames, register} from "../lib/api-client.ts";

export async function action({request}: { request: Request }) {
    try {
        const allUsernames = await getAllUsernames()

        const data = await request.formData()
        const email = data.get('email')
        const username = data.get('username')
        const password = data.get('password')
        const passwordConfirm = data.get('confirmPassword')

        if (!email || email.length < 6) return {error: 'Invalid email address'}
        if (!username || email.length < 4) return {error: 'Invalid username'}
        if (!password || !passwordConfirm || password !== passwordConfirm) return {error: 'Passwords must match'}

        if (allUsernames.find(user => user.username === username))
            return {error: 'Username is taken'}

        const auth = getAuth()
        const credentials = await createUserWithEmailAndPassword(auth, String(email), String(password))
        const newUser = {
            email: String(email),
            username: String(username),
            firebase_uid: credentials.user.uid
        }
        if (credentials) {
            await register(newUser)
            return redirect('/dashboard')
        }

        else return {error: 'Registration error, please try again later'}

    } catch (e) {
        return {error: 'Registration error, please try again later'}
    }
}

export default function Register() {
    const action = useActionData()

    return (
        <>
            { // @ts-ignore
                action?.error && <p>{action?.error}</p>}
            <Form method={'POST'}>
                <label>
                    Username:
                    <input type="text" name={'username'} placeholder={'Username'}/>
                </label>
                <label>
                    Email:
                    <input type="text" name={'email'} placeholder={'Email'}/>
                </label>
                <label>
                    Password:
                    <input type="password" name={'password'} placeholder={'Password'}/>
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name={'confirmPassword'} placeholder={'Confirm Password'}/>
                </label>
                <button type={'submit'}>Register</button>
            </Form>
        </>
    )
}
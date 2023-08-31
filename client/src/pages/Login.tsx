import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Form, Link, Navigate, redirect, useActionData} from "react-router-dom";
import {useUserQuery} from "../lib/hooks/useUserQuery.ts";
import Button from "../components/Button.tsx";
import styles from '../lib/style-presets.ts'

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
    const action = useActionData()
    const {data: user} = useUserQuery()
    if (user) return <Navigate to={'/dashboard'}/>

    return (
        <main className={styles.screenContainer}>
            <div className={`${styles.flexCol5} place-items-center`}>
                <div className={'text-center'}>
                    <h1 className={`${styles.looHeading} mb-2`}>
                        Log In
                    </h1>
                    <p className={styles.subText}>Welcome back, we are happy to see you
                        again!</p>
                </div>
                { // @ts-ignore
                    action?.error && <p className={styles.errorText}>{action?.error}</p>}
                <Form method={'POST'}
                      className={`${styles.flexCol5} w-[26rem] ${styles.formBorder}`}>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Email:
                        <input className={styles.inputField} type="text" required
                               name={'email'} placeholder={'Email'}/>
                    </label>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Password:
                        <input className={styles.inputField} type="text" required
                               name={'password'} placeholder={'Password'}/>
                    </label>
                    <Button className={'mt-3'}>Log In</Button>
                </Form>
                <div className={`${styles.tinyText} self-end text-right`}>
                    <p>New? <span className={'text-cyan-600 font-medium'}><Link
                        to={'/register'}>Create an account</Link></span></p>
                </div>

            </div>
        </main>
    )
}
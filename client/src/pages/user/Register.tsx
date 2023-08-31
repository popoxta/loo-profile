import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {Form, Link, Navigate, redirect, useActionData} from "react-router-dom";
import {getAllUsernames, register} from "../../lib/api-client.ts";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import Button from "../../components/Button.tsx";
import styles from '../../lib/style-presets.ts'

export async function action({request}: { request: Request }) {
    try {
        const allUsernames = await getAllUsernames()

        const data = await request.formData()
        const email = data.get('email')
        const username = data.get('username')
        const password = data.get('password')
        const passwordConfirm = data.get('confirmPassword')

        if (!email || email.length < 6) return {error: 'Invalid email address'}
        if (!username || username.length < 4) return {error: 'Invalid username'}
        if (username.length > 16) return {error: 'User must be less than 16 characters'}
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
        } else return {error: 'Registration error, please try again later'}

    } catch (e) {
        return {error: 'Registration error, please try again later'}
    }
}

export default function Register() {
    const action = useActionData()
    const {data: user} = useUserQuery()

    // todo check w alex for a better way to do this w/o errors
    if (user) return <Navigate to={'/dashboard'}/>

    return (
        <main className={styles.screenContainer}>
            <div className={`place-items-center ${styles.flexCol5}`}>
                <div className={'text-center'}>
                    <h1 className={`${styles.looHeading} mb-2`}>
                        Register
                    </h1>
                    <p className={styles.subText}>Join us to gain access to 100's of loos near you!</p>
                </div>
                { // @ts-ignore
                    action?.error && <p className={styles.errorText}>{action?.error}</p>}
                <Form method={'POST'} className={`${styles.flexCol5} w-[26rem] ${styles.formBorder}`}>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Username:
                        <input type="text" className={styles.inputField} required name={'username'} placeholder={'Username'}/>
                    </label>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Email:
                        <input type="text" className={styles.inputField} required name={'email'} placeholder={'Email'}/>
                    </label>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Password:
                        <input type="password" className={styles.inputField} required name={'password'} placeholder={'Password'}/>
                    </label>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Confirm Password:
                        <input type="password" className={styles.inputField} required name={'confirmPassword'} placeholder={'Confirm Password'}/>
                    </label>
                    <Button className={'mt-3'} >Register</Button>
                </Form>
                <div className={`${styles.tinyText} self-end text-right`}>
                    <p>Already have an account?</p>
                    <p className={'text-cyan-600 font-medium'}><Link to={'/login'}>Log in</Link></p>
                </div>
            </div>
        </main>
    )
}
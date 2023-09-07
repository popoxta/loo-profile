import {Link, Navigate, redirect} from "react-router-dom";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import Button from "../../components/Button.tsx";
import styles from '../../lib/style-presets.ts'
import {ChangeEvent, FormEvent, useState} from "react";
import Loading from "../../components/Loading.tsx";

export default function Login() {
    const [loginData, setLoginData] = useState({email: '', password: ''})
    const [errorMessage, setErrorMessage] = useState('')

    const {data: user, login} = useUserQuery()
    const {isError, error, isLoading} = login

    // todo check w alex for a better way to do this w/o errors
    if (user) return <Navigate to={'/dashboard'}/>
    if (isLoading) return <main className={styles.screenContainer}><Loading/></main>

    const loginUser = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const {email, password} = loginData

            let errorMsg = ''
            if (!email || email.length < 6) errorMsg = 'Invalid email address'
            if (!password) errorMsg = 'Invalid password'

            setErrorMessage(errorMsg)
            if (errorMessage) return

            else await login.mutate(loginData)
            if (!isError || !errorMessage) return redirect('/dashboard')

        } catch (e) {
            setErrorMessage('Log in error, please try again later')
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setLoginData(
        prev => ({...prev, [e.target.name]: e.target.value}))

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
                {(errorMessage || isError) && <p className={styles.errorText}>{errorMessage || String(error)}</p>}
                <form onSubmit={loginUser}
                    className={`${styles.flexCol5} w-[26rem] ${styles.formBorder}`}>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Email:
                        <input onChange={handleInputChange} value={loginData.email} className={styles.inputField}
                               type="text" required
                               name={'email'} placeholder={'Email'}/>
                    </label>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Password:
                        <input onChange={handleInputChange} value={loginData.password} className={styles.inputField}
                               type="password" required
                               name={'password'} placeholder={'Password'}/>
                    </label>
                    <Button className={'mt-3'}>Log In</Button>
                </form>
                <div className={`${styles.tinyText} self-end text-right`}>
                    <p>New? <span className={'text-cyan-600 font-medium'}><Link
                        to={'/register'}>Create an account</Link></span></p>
                </div>

            </div>
        </main>
    )
}
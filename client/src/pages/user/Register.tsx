import {Link, Navigate, redirect} from "react-router-dom";
import {getAllUserInfo} from "../../lib/api-client.ts";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import Button from "../../components/Button.tsx";
import styles from '../../lib/style-presets.ts'
import {ChangeEvent, FormEvent, useState} from "react";
import Loading from "../../components/Loading.tsx";

export default function Register() {
    const [userData, setUserData] = useState({email: '', username: '', password: '', confirmPassword: ''})
    const [errorMessage, setErrorMessage] = useState('')

    const {data: user, register} = useUserQuery()
    const {isError, error, isLoading} = register

    // todo check w alex for a better way to do this w/o errors
    if (user) return <Navigate to={'/dashboard'}/>
    if (isLoading) return <main className={styles.screenContainer}><Loading/></main>

    const createUser = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const {email, username, password, confirmPassword} = userData
            const allCredentials = await getAllUserInfo()
            let errorMsg = ''

            if (!email || email.length < 6) errorMsg = 'Invalid email address'
            if (allCredentials.find(user => user.email === email)) errorMsg = 'Email is taken'
            if (!username || username.length < 4) errorMsg = 'Invalid username'
            if (username.length > 16) errorMsg = 'User must be less than 16 characters'
            if (password.length < 6) errorMsg = 'Password must be at least 6 characters'
            if (!password || !confirmPassword || password !== confirmPassword) errorMsg = 'Passwords must match'
            if (allCredentials.find(user => user.username === username)) errorMsg = 'Username is taken'

            setErrorMessage(errorMsg)
            if (errorMessage) return

            else await register.mutate(userData)
            if (!isError || !errorMessage) return redirect('/dashboard')

        } catch (e) {
            setErrorMessage('Registration error, please try again later')
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }))

    return (
        <main className={styles.screenContainer}>
            <div className={`place-items-center ${styles.flexCol5}`}>
                <div className={'text-center'}>
                    <h1 className={`${styles.looHeading} mb-2`}>
                        Register
                    </h1>
                    <p className={styles.subText}>Join us to gain access to 100's of loos near you!</p>
                </div>
                {(errorMessage || isError) && <p className={styles.errorText}>{errorMessage || String(error)}</p>}
                <form onSubmit={createUser} className={`${styles.flexCol5} w-[26rem] ${styles.formBorder}`}>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Username:
                        <input onChange={handleInputChange} value={userData.username} type="text"
                               className={styles.inputField} required name={'username'}
                               placeholder={'Username'}/>
                    </label>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Email:
                        <input onChange={handleInputChange} value={userData.email} type="text"
                               className={styles.inputField} required name={'email'} placeholder={'Email'}/>
                    </label>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Password:
                        <input onChange={handleInputChange} value={userData.password} type="password"
                               className={styles.inputField} required name={'password'}
                               placeholder={'Password'}/>
                    </label>
                    <label className={`${styles.flexCol2} ${styles.labelText}`}>
                        Confirm Password:
                        <input onChange={handleInputChange} value={userData.confirmPassword} type="password"
                               className={styles.inputField} required name={'confirmPassword'}
                               placeholder={'Confirm Password'}/>
                    </label>
                    <Button className={'mt-3'}>Register</Button>
                </form>
                <div className={`${styles.tinyText} self-end text-right`}>
                    <p>Already have an account?</p>
                    <p className={'text-cyan-600 font-medium'}><Link to={'/login'}>Log in</Link></p>
                </div>
            </div>
        </main>
    )
}
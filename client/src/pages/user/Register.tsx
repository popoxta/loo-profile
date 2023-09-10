import {Link, Navigate, redirect} from "react-router-dom";
import {getAllUserInfo} from "../../lib/api-client.ts";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import Button from "../../components/Button.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import Loading from "../../components/Loading.tsx";

export default function Register() {
    const [userData, setUserData] = useState({email: '', username: '', password: '', confirmPassword: ''})
    const [errorMessage, setErrorMessage] = useState('')

    const {data: user, register} = useUserQuery()
    const {isError, error, isLoading} = register

    // todo check w alex for a better way to do this w/o errors
    if (user) return <Navigate to={'/dashboard'}/>
    if (isLoading) return <Loading full={true}/>

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
            if (errorMessage) {
                console.log('lol')
                return
            }
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
        <main className={'screen pt-24 md:pt-40 md:mx-auto mx-0 pb-16'}>
            <div className={`place-items-center flex-col-5`}>
                <div className={'text-center'}>
                    <h1 className={`heading-three mb-2`}>
                        Register
                    </h1>
                    <p className={'paragraph text-slate-500'}>Join us to gain access to 100's of loos near you!</p>
                </div>
                {(errorMessage || isError) && <p className={'error-message'}>{errorMessage || String(error)}</p>}
                <form onSubmit={createUser} className={`flex-col-5 md:w-[26rem] w-full border-form`}>
                    <label className={`flex-col-2 form-text`}>
                        Username:
                        <input onChange={handleInputChange} value={userData.username} type="text"
                               className={'form-input'} required name={'username'}
                               placeholder={'Username'}/>
                    </label>
                    <label className={`flex-col-2 form-text`}>
                        Email:
                        <input onChange={handleInputChange} value={userData.email} type="text"
                               className={'form-input'} required name={'email'} placeholder={'Email'}/>
                    </label>
                    <label className={'flex-col-2 form-text'}>
                        Password:
                        <input onChange={handleInputChange} value={userData.password} type="password"
                               className={'form-input'} required name={'password'}
                               placeholder={'Password'}/>
                    </label>
                    <label className={`flex-col-2 form-text`}>
                        Confirm Password:
                        <input onChange={handleInputChange} value={userData.confirmPassword} type="password"
                               className={'form-input'} required name={'confirmPassword'}
                               placeholder={'Confirm Password'}/>
                    </label>
                    <Button className={'mt-3'}>Register</Button>
                </form>
                <div className={`font-open-sans text-xs text-slate-900 self-end text-right`}>
                    <p>Already have an account?</p>
                    <p className={'text-cyan-600 font-medium'}><Link to={'/login'}>Log in</Link></p>
                </div>
            </div>
        </main>
    )
}
import {Link, Navigate, redirect} from "react-router-dom";
import {useUserQuery} from "../../lib/hooks/useUserQuery.ts";
import Button from "../../components/Button.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import Loading from "../../components/Loading.tsx";

export default function Login() {
    const [loginData, setLoginData] = useState({email: '', password: ''})
    const [errorMessage, setErrorMessage] = useState('')

    const {data: user, login} = useUserQuery()
    const {isError, error, isLoading} = login

    // todo check w alex for a better way to do this w/o errors
    if (user) return <Navigate to={'/dashboard'}/>
    if (isLoading) return <Loading full={true}/>

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
        <main className={'screen pt-32 md:pt-52 pb-16 sm:mx-auto mx-0'}>
            <div className={`flex-col-5 place-items-center `}>
                <div className={'text-center'}>
                    <h1 className={`heading-three mb-2`}>
                        Log In
                    </h1>
                    <p className={'paragraph text-slate-500'}>Welcome back, we are happy to see you
                        again!</p>
                </div>
                {(errorMessage || isError) && <p className={'error-message'}>{errorMessage || String(error)}</p>}
                <form onSubmit={loginUser}
                    className={`flex-col-5 sm:w-[26rem] w-full border-form`}>
                    <label className={`flex-col-2 form-text`}>
                        Email:
                        <input onChange={handleInputChange} value={loginData.email} className={'form-input'}
                               type="text" required
                               name={'email'} placeholder={'Email'}/>
                    </label>
                    <label className={`flex-col-2 form-text`}>
                        Password:
                        <input onChange={handleInputChange} value={loginData.password} className={'form-input'}
                               type="password" required
                               name={'password'} placeholder={'Password'}/>
                    </label>
                    <Button className={'mt-3'}>Log In</Button>
                </form>
                <div className={`font-open-sans text-xs text-slate-900 self-end text-right`}>
                    <p>New? <span className={'text-cyan-600 font-medium'}><Link
                        to={'/register'}>Create an account</Link></span></p>
                </div>

            </div>
        </main>
    )
}
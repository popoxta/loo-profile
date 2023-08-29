import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Form, Link, Navigate, redirect, useActionData} from "react-router-dom";
import {useUserQuery} from "../lib/hooks/useUserQuery.ts";
import Button from "../components/Button.tsx";

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
        <main className={'flex justify-center px-5 h-full'}>
            <div className={'flex place-items-center flex-col mt-20 lg:mt-32 gap-5'}>
                <div className={'text-center'}>
                    <h1 className={'font-bold font-spartan uppercase text-slate-900 mb-2 text-4xl'}>
                        Log In
                    </h1>
                    <p className={'font-spartan text-slate-500'}>Welcome back, we are happy to see you again!</p>
                </div>
                { // @ts-ignore
                    action?.error && <p className={'font-open-sans text-red-800 text-xs'}>{action?.error}</p>}
                <Form method={'POST'} className={'flex flex-col gap-5 w-[26rem] bg-slate-100 p-10 rounded-lg border'}>
                    <label className={'flex flex-col gap-2 font-open-sans text-slate-900'}>
                        Email:
                        <input className={'bg-white h-[2.2rem] rounded-md px-2.5 border'} type="text" required name={'email'} placeholder={'Email'}/>
                    </label>
                    <label className={'flex flex-col gap-2 font-open-sans text-slate-900'}>
                        Password:
                        <input className={'bg-white h-[2.2rem] rounded-md px-2.5 border'} type="text" required name={'password'} placeholder={'Password'}/>
                    </label>
                    <Button className={'mt-3'} >Log In</Button>
                </Form>
                <div className={'font-open-sans text-xs self-end text-right'}>
                    <p>New? <span className={'text-cyan-600 font-medium'}><Link to={'/register'}>Create an account</Link></span></p>
                </div>
            </div>
        </main>
    )
}
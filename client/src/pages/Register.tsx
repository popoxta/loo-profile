import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {Form, Link, Navigate, redirect, useActionData} from "react-router-dom";
import {getAllUsernames, register} from "../lib/api-client.ts";
import {useUserQuery} from "../lib/hooks/useUserQuery.ts";
import Button from "../components/Button.tsx";

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
        } else return {error: 'Registration error, please try again later'}

    } catch (e) {
        return {error: 'Registration error, please try again later'}
    }
}

export default function Register() {
    const action = useActionData()
    const {data: user} = useUserQuery()
    if (user) return <Navigate to={'/dashboard'}/>

    return (
        <main className={'flex justify-center px-5 h-full'}>
            <div className={'flex place-items-center flex-col mt-20 lg:mt-32 gap-5'}>
                <div className={'text-center'}>
                    <h1 className={'font-bold font-spartan uppercase text-slate-900 mb-2 text-4xl'}>
                        Register
                    </h1>
                    <p className={'font-spartan text-slate-500'}>Join us to gain access to 100's of loos near you!</p>
                </div>
                { // @ts-ignore
                    action?.error && <p className={'font-open-sans text-red-800 text-xs'}>{action?.error}</p>}
                <Form method={'POST'} className={'flex flex-col gap-5 w-[26rem] bg-slate-100 p-10 rounded-lg border'}>
                    <label className={'flex flex-col gap-2 font-open-sans text-slate-900'}>
                        Username:
                        <input type="text" className={'bg-white h-[2.2rem] rounded-md px-2.5 border'} name={'username'} placeholder={'Username'}/>
                    </label>
                    <label className={'flex flex-col font-open-sans text-slate-900'}>
                        Email:
                        <input type="text" className={'bg-white h-[2.2rem] rounded-md px-2.5 border'} name={'email'} placeholder={'Email'}/>
                    </label>
                    <label className={'flex flex-col font-open-sans text-slate-900'}>
                        Password:
                        <input type="password" className={'bg-white h-[2.2rem] rounded-md px-2.5 border'} name={'password'} placeholder={'Password'}/>
                    </label>
                    <label className={'flex flex-col font-open-sans text-slate-900'}>
                        Confirm Password:
                        <input type="password" className={'bg-white h-[2.2rem] rounded-md px-2.5 border'} name={'confirmPassword'} placeholder={'Confirm Password'}/>
                    </label>
                    <Button className={'mt-3'} >Register</Button>
                </Form>
                <div className={'font-open-sans text-xs self-end text-right'}>
                    <p>Already have an account?</p>
                    <p className={'text-cyan-600 font-medium'}><Link to={'/login'}>Log in</Link></p>
                </div>
            </div>
        </main>
    )
}
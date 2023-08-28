import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {Form} from "react-router-dom";


// todo set this to hit firebase and on success HIT api /signup route, then on success redirect to dashboard
// signup -> get token -> hit api /sign-up with token -> on success, redirect (already logged in)
// log any errors to user, check inputs
export async function action({request}: {request: Request}) {
    const data = await request.formData()
    const email = data.get('email')
    const password = data.get('password')

    //todo try catch and check inputs
    const auth = getAuth()
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    return credentials
}

export default function Register() {

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
            <button type={'submit'}>Register</button>
        </Form>
    )
}
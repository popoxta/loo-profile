import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {Form} from "react-router-dom";

export async function action({request}) {
    const data = await request.formData()
    const email = data.get('email')
    const password = data.get('password')

    const auth = getAuth()
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    console.log(credentials)
    return null
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
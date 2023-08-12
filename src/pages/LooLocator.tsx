import {Form} from "react-router-dom";

export default function LooLocator() {
    return (
        <main>
            <h2>LOCATOR</h2>
            <Form>
                <label>
                    Enter a location
                    <input type={'text'} name={'location'}/>
                </label>
                <label>
                    Distance
                    <select name={'distance'}>
                        <option>{'1km'}</option>
                        <option>{'5km'}</option>
                        <option>{'10km'}</option>
                        <option>{'25km'}</option>
                    </select>
                </label>
            </Form>
            <div>
                <h1>MAP</h1>
                <div>

                </div>
            </div>
        </main>
    )
}
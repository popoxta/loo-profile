import {Form} from "react-router-dom";
import Map from "../components/Map.tsx";

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
                <div className={'w-40 h-40'}>
                    <Map center={[51.505, -0.09]} markers={undefined}/>
                </div>
                <div>

                </div>
            </div>
        </main>
    )
}
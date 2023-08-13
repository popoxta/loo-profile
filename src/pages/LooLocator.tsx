import {Form} from "react-router-dom";
import Map from "../components/Map.tsx";

const fakeLoos = [
    {
        id: 1,
        stars: 5,
        name: 'Some loo name',
        street: '123 Something Ln',
        area: 'Witty, TX, 82309',
        phone: '02323232',
        coords: [41, 175]
    },
    {
        id: 2,
        stars: 4.5,
        name: 'Some loo name',
        street: '123 Something Ln',
        area: 'Witty, TX, 82309',
        phone: '02323232',
        coords: [38, 170]
    },
    {
        id: 3,
        stars: 3,
        name: 'Some loo name',
        street: '123 Something Ln',
        area: 'Witty, TX, 82309',
        phone: '02323232',
        coords: [43, 185]
    },
]

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
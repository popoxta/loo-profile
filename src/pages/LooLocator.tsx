import {Form} from "react-router-dom";
import Map from "../components/Map.tsx";
import {Loo, Marker} from "../lib/types.ts";

const fakeLoos: Loo[] = [
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

const looMarkers: Marker[] = fakeLoos.map((loo: Loo) => ({id: loo.id, msg: loo.name, coords: loo.coords}))

export default function LooLocator() {
    return (
        <main className={'mt-20 md:mt-24 px-5'}>
            <div className={'flex flex-col mx-auto max-w-6xl gap-5'}>
                <h2 className={'text-5xl font-semibold font-spartan uppercase'}>Loocator</h2>
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
                <div className={'flex gap-10'}>
                    <div className={'w-[70%] h-[30rem]'}>
                        <Map center={[51.505, -0.09]} markers={looMarkers}/>
                    </div>
                    <div className={'border-2 flex-grow border-slate-300 w-20 rounded-lg'}>

                    </div>
                </div>
            </div>
        </main>
    )
}
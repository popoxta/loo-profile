import {Coordinates, Loo} from "../../lib/types/types.ts";
import {ChangeEvent, useState} from "react";
import Map from "../Map.tsx";
import {getLocation} from "../../lib/api-client.ts";
import Loading from "../Loading.tsx";
import styles from '../../lib/style-presets.ts'

const DEFAULT_COORDS: Coordinates = [-36.848461, 174.763336]

interface Props {
    loo?: Loo
    loo_id?: number
    submitFn: <T>(a: T) => Loo
}

const defaultValues = {
    name: '',
    street: '',
    region: '',
    contact: '',
    lat: DEFAULT_COORDS[0],
    long: DEFAULT_COORDS[1],
    weekday: '',
    weekend: '',
    fee: '',
}

export default function LooForm(props: Props) {
    const [looData, setLooData] = useState<Loo>(props?.loo ?? defaultValues)
    const [locationQuery, setLocationQuery] = useState('')
    const [location, setLocation] = useState<Coordinates>([looData.lat, looData.long])
    const [mapIsLoading, setMapIsLoading] = useState(false)
    const [page, setPage] = useState(1)

    const handleLocationInput = (e: ChangeEvent<HTMLInputElement>) => setLocationQuery(e.target.value)

    async function setNewLocation() {
        if (!locationQuery) return
        setMapIsLoading(true)
        const {coordinates, street, region} = await getLocation(locationQuery)
        setLooData(prev => ({...prev, lat: coordinates[0], long: coordinates[0], street, region}))
        setLocation(coordinates)
        setMapIsLoading(false)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLooData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <div>
            <form>
                {page === 1
                    ? <div>
                        <h3>Loo Details</h3>
                        <div>
                            <label>
                                Name
                                <input onChange={handleChange} type="text" name={'name'} placeholder={'Loo name'}/>
                            </label>
                            <label>
                                Contact
                                <input onChange={handleChange} type="text" name={'contact'}
                                       placeholder={'Contact details'}/>
                            </label>
                            <label>
                                Opening Hours, Mon-Fri
                                <input onChange={handleChange} type="text" name={'weekday'}
                                       placeholder={'E.g 09.00am - 2.00pm'}/>
                            </label>
                            <label>
                                Opening Hours, Sat-Sun
                                <input onChange={handleChange} type="text" name={'weekend'}
                                       placeholder={'E.g 09.00am - 2.00pm'}/>
                            </label>
                            <label>
                                Usage Fees
                                <input onChange={handleChange} type="text" name={'fee'} placeholder={'Fee'}/>
                            </label>
                        </div>
                    </div>
                : <div>
                    <h3>Loo Location</h3>
                    <label>
                        Search Location
                        <input onChange={handleLocationInput} type="text" name={'location'}
                               placeholder={'Location search'}/>
                    </label>
                    <button type={'button'} onClick={setNewLocation}>Search</button>
                    <div className={`w-96 h-80`}>

                        {/* todo add click functionality to map */}
                        {mapIsLoading
                            ? <Loading/>
                            : <Map center={location}
                                   markers={[{
                                id: 0,
                                coords: location,
                                title: `
                                ${looData?.street ? looData.street + ', ' : ''}
                                ${looData?.region ? looData.region + '.' : ''}`
                            }]}/>}
                    </div>
                    <div>

                    </div>
                </div>
                }
            </form>
        </div>
    )
}
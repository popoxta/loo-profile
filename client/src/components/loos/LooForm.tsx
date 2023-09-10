import {Coordinates, Loo} from "../../lib/types/types.ts";
import {ChangeEvent, useState} from "react";
import Map from "../Map.tsx";
import {getLocation} from "../../lib/api-client.ts";
import Loading from "../Loading.tsx";
import Button from "../Button.tsx";
import {useAllLoosQuery} from "../../lib/hooks/useAllLoosQuery.ts";

const DEFAULT_COORDS: Coordinates = [-36.848461, 174.763336]

interface Props {
    loo?: Loo
    loo_id?: number
    submitFn: (a: Loo) => any
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
    about: '',
}

export default function LooForm(props: Props) {
    const [looData, setLooData] = useState<Loo>(props?.loo ?? defaultValues)
    const [locationQuery, setLocationQuery] = useState('')
    const [location, setLocation] = useState<Coordinates>([looData.lat, looData.long])
    const [mapIsLoading, setMapIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const {data: loos} = useAllLoosQuery()

    async function setNewLocation(e: SubmitEvent) {
        e.preventDefault()
        setError('')
        try {
            setMapIsLoading(true)
            const {coordinates, street, region} = await getLocation(locationQuery)
            if (loos?.find(loo => loo.lat === coordinates[0] && loo.long === coordinates[1])) {
                setError('Loo already exists for the selected location.')
                return
            }
            setLooData(prev => ({...prev, lat: coordinates[0], long: coordinates[1], street, region}))
            setLocation(coordinates)
        } catch (error) {
            if (error instanceof Error) {
                setError(String(error.message))
            } else setError(String(error))
        } finally {
            setMapIsLoading(false)
        }
    }

    const handleLocationInput = (e: ChangeEvent<HTMLInputElement>) => setLocationQuery(e.target.value)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLooData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const changePage = (e: SubmitEvent) => {
        e.preventDefault()
        setPage(page === 1 ? 2 : 1)
    }

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()
        if (error) return
        if (Object.keys(defaultValues).some(val => {
            const currentVal = looData[val as keyof Loo]
            if (val === 'lat') return currentVal === DEFAULT_COORDS[0]
            else if (val === 'long') return currentVal === DEFAULT_COORDS[1]
            return looData[val as keyof Loo] === ''
        })) setError('All fields must be filled out')
        else await props.submitFn(looData)
    }

    return (
        <form  className={'md:w-[32rem] w-full mb-16 flex-grow'}>
            {page === 1
                ? <>
                    <h3 className={'bold-text mb-2.5'}>Loo Details</h3>
                    <div className={`border-form flex-col-5`}>
                        {error && <p className={'error-message'}>{error}</p>}
                        <label className={`flex-col-2 form-text`}>
                            Name
                            <input className={'form-input'} value={looData.name} onChange={handleChange}
                                   type="text" name={'name'}
                                   placeholder={'Loo name'}/>
                        </label>
                        <label className={'form-text flex-col-2'}>
                            Contact
                            <input className={'form-input'} value={looData.contact} onChange={handleChange}
                                   type="text" name={'contact'}
                                   placeholder={'Contact details'}/>
                        </label>
                        <label className={'form-text flex-col-2'}>
                            Opening Hours, Mon-Fri
                            <input className={'form-input'} value={looData.weekday} onChange={handleChange}
                                   type="text" name={'weekday'}
                                   placeholder={'E.g 09.00am - 2.00pm'}/>
                        </label>
                        <label className={'form-text flex-col-2'}>
                            Opening Hours, Sat-Sun
                            <input className={'form-input'} value={looData.weekend} onChange={handleChange}
                                   type="text" name={'weekend'}
                                   placeholder={'E.g 09.00am - 2.00pm'}/>
                        </label>
                        <label className={'form-text flex-col-2'}>
                            Usage Fees
                            <input className={'form-input'} value={looData.fee} onChange={handleChange} type="text"
                                   name={'fee'}
                                   placeholder={'Fee'}/>
                        </label>
                        <label className={'form-text flex-col-2'}>
                            About
                            <textarea className={`min-h-[5rem] form-input`} value={looData.about}
                                      onChange={handleChange} name={'about'}
                                      placeholder={'Description of your Loo'}/>
                        </label>
                        <Button className={'mt-3'} onClick={changePage}>Next</Button>
                    </div>
                </>
                : <>
                    <h3 className={'bold-text'}>Loo Location</h3>
                    <div className={`border-form flex-col-5`}>
                        {error && <p className={`error-message text-center`}>{error}</p>}
                        <label className={'form-text flex-col-2'}>
                            Search Location
                            <div className={'flex'}>
                                <input className={`form-input flex-grow`} value={locationQuery}
                                       onChange={handleLocationInput}
                                       type="text"
                                       name={'location'}
                                       placeholder={'Location search'}/>
                                <Button className={'py-[7px] ml-1 sm:ml-5'} onClick={setNewLocation}>Search</Button>
                            </div>
                        </label>
                        <div className={`w-full h-72`}>
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
                        {(looData?.street || looData?.region) &&
                            <div className={'text-center'}>
                                <p className={'paragraph'}>{looData.street}</p>
                                <p className={'paragraph'}>{looData.region}</p>
                            </div>
                        }
                        <div className={'flex gap-5 mt-3'}>
                            <Button onClick={changePage} className={'flex-grow'}>Back</Button>
                            <Button onClick={handleSubmit} className={'flex-grow'}>Submit</Button>
                        </div>
                    </div>
                </>
            }
        </form>
    )
}
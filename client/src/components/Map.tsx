import {MapContainer, Marker, TileLayer, Popup, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {Coordinates, Marker as MarkerType} from "../lib/types.ts";
import {ReactElement, useEffect} from "react";



const RecenterAutomatically = ({coords, zoom = 13}: { coords: Coordinates, zoom: number }): null => {
    const map = useMap();

    useEffect(() => {
        map.setView(coords, zoom);
    }, coords)

    return null
}

interface Props {
    center: Coordinates,
    markers?: MarkerType[]
}

export default function Map(props: Props) {
    const markerElements = props?.markers?.map((marker: MarkerType): ReactElement => {
        return (
            <Marker key={String(marker.coords)} position={marker.coords}>
                <Popup>
                    {marker.title}
                    {marker.coords && <><br/><a target={'_blank'} href={`https://www.google.com/maps/place/${marker.coords}`}>Get
                        directions</a></>}
                </Popup>
            </Marker>
        )
    })

    return (
        <MapContainer center={props.center} zoom={13} className={'w-80 z-0'}>
            <TileLayer
                attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            <RecenterAutomatically coords={props.center} zoom={13}/>
            {markerElements && markerElements}
        </MapContainer>
    )
}
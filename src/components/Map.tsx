import {MapContainer, Marker, TileLayer, Popup, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {coord, Marker as MarkerType} from "../lib/types.ts";
import {ReactElement, useEffect} from "react";

const RecenterAutomatically = ({coords, zoom = 13}: { coords: coord, zoom: number }): null => {
    const map = useMap();

    useEffect(() => {
        map.setView(coords, zoom);
    }, coords)

    return null
}

export default function Map({center, markers}: { center: [number, number], markers: MarkerType[] | undefined }) {
    const markerElements: ReactElement[] | undefined = markers?.map((marker: MarkerType): ReactElement => {
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
        <MapContainer center={center} zoom={13} className={'w-80'}>
            <TileLayer
                attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            <RecenterAutomatically coords={center} zoom={13}/>
            {markerElements && markerElements}
        </MapContainer>
    )
}
import {MapContainer, Marker, TileLayer, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {Marker as MarkerType} from "../types/marker.ts";
import {ReactElement} from "react";

export default function Map({center, markers}: { center: [number, number], markers: MarkerType[] | undefined }) {
    const markerElements: ReactElement[] | undefined = markers?.map((marker: MarkerType): ReactElement => {
        return (
            <Marker position={marker.coords}>
                <Popup>
                    {marker.msg}
                </Popup>
            </Marker>
        )
    })

    return (
        <MapContainer center={center} zoom={10} className={'w-80'}>
            <TileLayer
                attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            {markerElements && markerElements}
        </MapContainer>
    )
}
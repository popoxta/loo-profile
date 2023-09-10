import {Loo} from "../../lib/types/types.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToilet} from "@fortawesome/free-solid-svg-icons";
import Stars from "../Stars.tsx";
import Button from "../Button.tsx";
import {User} from "firebase/auth";
import {useLooQuery} from "../../lib/hooks/useLooQuery.ts";
import {useState} from "react";
import Alert from "../Alert.tsx";
import {useNavigate} from "react-router-dom";

interface Props {
    loo: Loo
    isLast: boolean
    user: User
}

export default function LooCardLarge(props: Props) {
    const navigate = useNavigate()
    const {loo, isLast} = props
    const {deleteLoo} = useLooQuery(Number(loo.id))
    const [showAlert, setShowAlert] = useState(false)

    const toggleAlert = () => setShowAlert(!showAlert)

    const handleDelete = async () => {
        await deleteLoo.mutate(Number(loo.id))
        navigate('/dashboard/loos')
    }

    return (
        <>
            {showAlert && <Alert title={`Delete ${loo.name}`} buttonText={'Confirm Deletion'} buttonToggle={handleDelete} toggle={toggleAlert}>dasd</Alert>}
            <div
                className={`flex w-full place-items-center py-5 pr-5 pl-5 sm:pl-0 ${isLast ? '' : 'border-b-2'} border-slate-200 `}>
                <FontAwesomeIcon className={'mx-6 text-slate-400 hidden sm:inline-block'} size={'2xl'} icon={faToilet}/>
                <div className={'flex flex-col w-full h-full justify-between'}>
                    <div className={'flex justify-between place-items-center'}>
                        <h3 className={'text-slate-900 font-open-sans text-sm font-semibold'}>{loo.name}</h3>
                        <div className={'flex gap-[0.1rem]'}>
                            <Stars rating={loo.avg_rating ?? 0} size={20}/>
                        </div>
                    </div>
                    <div className={'text-slate-900 font-open-sans text-xs'}>
                        <p>{loo.street}</p>
                        <p>{loo.region}</p>
                    </div>
                    <div className={'flex sm:place-items-center justify-between flex-col sm:flex-row'}>
                        <p className={`py-2.5 font-open-sans text-xs text-slate-500`}>{loo.contact}</p>
                        <div className={'flex sm:gap-5 gap-2.5 flex-wrap'}>
                            <Button size={'sm'} link={`/loos/${loo.id}`} className={'w-[6rem] py-1'}>View</Button>
                            <Button size={'sm'} link={`/loos/${loo.id}/edit`}
                                    className={'w-[6rem] py-1'}>Manage</Button>
                            <Button size={'sm'} onClick={toggleAlert} className={'w-[6rem] py-1'}>Remove</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
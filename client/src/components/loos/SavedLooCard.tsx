import {Loo} from "../../lib/types/types.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faToilet} from "@fortawesome/free-solid-svg-icons";
import Stars from "../Stars.tsx";
import {useLooQuery} from "../../lib/hooks/useLooQuery.ts";
import {useQueryClient} from "react-query";
import Button from "../Button.tsx";

interface Props {
    loo: Loo
    isLast: boolean
}

export default function SavedLooCard(props: Props) {
    const {loo, isLast} = props
    const {removeSavedLoo} = useLooQuery(Number(loo?.id))
    const queryClient = useQueryClient()

    return (
        <div
            className={`flex w-full place-items-center py-5 pr-5 pl-5 sm:pl-0 ${isLast ? '' : 'border-b-2'} border-slate-200 `}>
            <FontAwesomeIcon className={'mx-6 text-slate-400 hidden sm:inline-block'} size={'2xl'} icon={faToilet}/>
            <div className={'flex flex-col w-full h-full justify-between'}>
                <div className={'flex justify-between place-items-center'}>
                    <div className={'flex gap-2 place-items-center'}>
                        <h3 className={'text-slate-900 font-open-sans text-sm font-semibold'}>{loo.name}</h3>
                            <FontAwesomeIcon
                                className={`-mb-0.5 cursor-pointer transition-colors hover:text-slate-300 text-pink-600`}
                                onClick={ () => removeSavedLoo.mutate(Number(loo?.id), {onSuccess: () => queryClient.invalidateQueries()})}
                                size={'xs'} icon={faHeart}/>
                    </div>
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
                    <Button title={`Visit Loo ${loo.id}`} size={'sm'} link={`/loos/${loo.id}`}>View</Button>
                </div>
            </div>
        </div>
    )
}
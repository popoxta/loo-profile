export default function BigButton({link, children}: { link: string | undefined, children: string | undefined }) {
    const buttonStyles: string = 'bg-slate-200 py-3 px-6 font-spartan font-bold text-slate-900 rounded-lg uppercase hover:text-slate-800 hover:bg-slate-300 transition-all ease-in-out'

    return (
        <>
            {link ? <a href={link}><button className={buttonStyles}>{children}</button></a> : <button className={buttonStyles}>{children}</button>}
        </>
    )
}
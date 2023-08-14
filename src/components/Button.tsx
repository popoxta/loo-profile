export default function Button({link, children}: { link: string | undefined, children: string | undefined }) {
    const buttonStyles: string = 'bg-slate-200 py-2 px-5 font-spartan font-semibold text-sm text-slate-900 rounded-lg hover:text-slate-800 hover:bg-slate-300 transition-all ease-in-out'

    return (
        <>
            {link ? <a href={link}><button className={buttonStyles}>{children}</button></a> : <button className={buttonStyles}>{children}</button>}
        </>
    )
}
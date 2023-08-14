import BigButton from "../components/BigButton.tsx";

export default function Home() {
    return (
        <main className={'flex justify-center px-5'}>
            <div className={'flex gap-10 place-items-center flex-col md:flex-row mt-20 mb-60 md:mt-52 md:mb-96'}>
                <img
                    src="https://images.unsplash.com/photo-1603568534543-29a3328479f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="A very nice toilet on the outskirts of a town"
                    className={'w-[22rem] h-[22rem] rounded-2xl object-cover '}
                />
                <div className={'max-w-lg text-center md:text-left'}>
                    <h1 className={'font-bold uppercase text-slate-900 mb-5 text-5xl md:text-7xl'}>Loo Profile</h1>
                    <p className={'text-slate-500 mb-8 text-xl'}>Slightly less witty subtitle that describes what this is, probably.</p>
                    <BigButton link={'.'}>Get started</BigButton>
                </div>
            </div>
        </main>
    )
}
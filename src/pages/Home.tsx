import Button from "../components/Button.tsx";

export default function Home() {
    return (
        <main className={'flex-grow flex justify-center font-spartan'}>
            <div className={'flex place-items-center h-fit mt-[10%] gap-8 flex-col sm:flex-row'}>
                <img
                    src="https://images.unsplash.com/photo-1603568534543-29a3328479f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="A very nice toilet on the outskirts of a town"
                    className={'w-80 h-80 rounded-2xl object-cover '}
                />
                <div className={'flex flex-col gap-2 flex-grow justify-center max-w-md text-center sm:text-left'}>
                    <h1 className={'font-bold uppercase text-7xl text-slate-900'}>Loo Profile</h1>
                    <p className={'text-xl text-slate-500 mb-3'}>Slightly less witty subtitle that describes what this is, probably.</p>
                    <Button link={'.'}>Get started</Button>
                </div>
            </div>
        </main>
    )
}
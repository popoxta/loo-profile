import Button from "../components/Button.tsx";

export default function Home() {
    return (
        <main className={`screen md:pt-52 pt-32`}>
            <div className={'flex-col-5 md:gap-10 md:flex-row place-items-center min-h-[30rem]'}>
                <img
                    src="https://images.unsplash.com/photo-1603568534543-29a3328479f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="A very nice toilet on the outskirts of a town"
                    className={'w-[22rem] h-[22rem] rounded-2xl object-cover'}
                />
                <div className={'max-w-lg flex-text'}>
                    <h1 data-testid={'home-title'} className={`heading-one mb-2.5 md:mb-5`}>Loo Profile</h1>
                    <p className={`subheading mb-5 md:mb-8`}>Slightly less witty subtitle that describes what this is,
                        probably.</p>
                    <Button size={'lg'} link={'/loos'}>Get started</Button>
                </div>
            </div>
        </main>
    )
}
import Button from "../components/Button.tsx";
import styles from '../lib/style-presets.ts'

export default function Home() {
    return (
        <main className={styles.screenContainer}>
            <div className={'flex gap-5 md:gap-10 flex-col md:flex-row place-items-center min-h-[30rem]'}>
                <img
                    src="https://images.unsplash.com/photo-1603568534543-29a3328479f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="A very nice toilet on the outskirts of a town"
                    className={'w-[22rem] h-[22rem] rounded-2xl object-cover '}
                />
                <div className={'max-w-lg text-center md:text-left'}>
                    <h1 className={styles.headingOneBold}>Loo Profile</h1>
                    <p className={styles.subHeading}>Slightly less witty subtitle that describes what this is,
                        probably.</p>
                    <Button size={'lg'} link={'/loos'}>Get started</Button>
                </div>
            </div>
        </main>
    )
}
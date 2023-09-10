export default function About() {
    return (
        <article className={`mx-auto pb-16 md:pb-60 px-5`}>
            <div className={'flex-col-5 max-w-5xl flex-text min-h-[30rem]'}>
                <div className={'flex gap-5 flex-col-reverse place-items-center md:place-items-start md:flex-row'}>
                    <div className={`flex-col-5`}>
                        <h2 className={'heading-two'}>Why this cool witty thing?</h2>
                        <div className={'flex-col-5'}>
                            <p className={'text-slate-500'}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit
                                pretium
                                imperdiet. Nullam in tristique justo. In suscipit metus et nunc ornare, nec blandit eros
                                malesuada. Praesent aliquet elit at nisl porta, vel lobortis dolor auctor.
                            </p>
                            <p className={'text-slate-500'}>
                                Nam vitae nulla nec ligula tincidunt iaculis eget et diam. Nam id nibh in tortor dapibus
                                aliquam. Ut sed odio nisi. Nam in pulvinar lacus. Fusce libero risus, semper eu justo
                                id,
                                mollis volutpat risus. Aenean a euismod sem, a suscipit dolor.
                                Morbi fermentum tellus sed ullamcorper sodales. Mauris auctor consectetur pulvinar.
                                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                                egestas. Vivamus eget laoreet enim, ac mattis dui.
                            </p>
                            <p className={'text-slate-500'}>
                                Pellentesque pretium.
                            </p>
                        </div>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1603568534543-29a3328479f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                        alt="A very nice toilet on the outskirts of a town"
                        className={'w-[24rem] h-[24rem] object-cover rounded-2xl'}
                    />
                </div>
                <h2 className={`heading-two text-right`}>A witty line, trust me, it's great</h2>
            </div>
        </article>
    )
}
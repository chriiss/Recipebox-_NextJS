import Image from "next/image"

const HeroZone = ({ query, setQuery, styles, dataFront }) => {
    return (
        <>
            <article className={styles.herozone_bg}>
                <div className={styles.herozone_bg_overlay}></div>
                <div className={styles.herozone_bg_content}>
                    <h1>{dataFront.heroZone.title}</h1>
                    <div className={styles.searchBox}>
                        <Image src={dataFront.heroZone.searchBox.icon} alt="search icon" className={styles.searchBox_icon} width={20} height={20} />
                        <input type="search" placeholder={dataFront.heroZone.searchBox.placeholder} className={styles.searchBox_search} value={query} onChange={(e) => setQuery(e.target.value)} />
                    </div>
                    <h2 className={styles.subtitleSize}>{dataFront.heroZone.subtitle}</h2>
                </div>
            </article>
        </>
    )
}

export default HeroZone
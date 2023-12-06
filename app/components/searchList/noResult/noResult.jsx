import Image from "next/image"
import "../../../styles/globals.scss"
import styles from "../../../styles/page.module.scss"

const NoResults = ({ dataFront }) => {
    return (
        <div className={styles.results}>
            <h3>{dataFront.searchList.noResults.name}</h3>
            <Image src="/no_result.jpg" alt="no result" width={2000} height={2000} className={`img_responsive ${styles.results_img}`} />
            <h3>Try</h3>
            <div className={styles.categories}>
                <div className={styles.categories_flex}>
                    {dataFront.searchList.noResults.recommandation.map((data) => (
                        <div key={data.id} className={styles.categories_flex_card}>
                            <Image src={data.img} alt={data.img} width={300} height={200} className="img_responsive" />
                            <p>{data.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NoResults;
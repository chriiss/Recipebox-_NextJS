import Image from "next/image";
import "../../styles/globals.scss";
import MealDetails from "../mealDetails/mealDetails";
import NoResults from "./noResult/noResult";
import FavoriteButton from "../favoriteButton/favoriteButton";


const SearchList = ({ searchPerformed, searchList, styles, dataFront }) => {
    return (
        <>
            {searchPerformed && searchList && searchList.length > 0 ? (
                <>
                    <p>{searchList.length} {searchList.length !== 1 ? `${dataFront.searchList.results}` : `${dataFront.searchList.result}`}</p>
                    <article className={styles.categories_flex}>
                        {searchList.map((results) => (
                            <div key={results.idMeal} className={styles.categories_flex_card}>
                                <Image src={results.strMealThumb} alt={results.strMeal} width={300} height={200} className="img_responsive" />
                                <p>{results.strMeal}</p>
                                <div className={styles.categories_flex_card_buttons}>
                                    <MealDetails mealId={results.idMeal} dataFront={dataFront} />
                                    <FavoriteButton item={{ id: results.idMeal, name: results.strMeal, image: results.strMealThumb }} />
                                </div>
                            </div>
                        ))}
                    </article>
                </>
            ) : (
                <article>{searchPerformed ? <NoResults dataFront={dataFront} /> : ""}</article>
            )}
        </>
    )
}

export default SearchList
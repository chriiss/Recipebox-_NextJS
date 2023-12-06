import { getRandomFood } from "@/app/api/api"
import Image from "next/image"
import MealDetails from "../mealDetails/mealDetails"
import FavoriteButton from "../favoriteButton/favoriteButton"
import { FavoritesProvider } from "@/app/providers/favoriteProvider"
import { useState } from "react"

const DayIngredient = ({ styles, dataFront, useState, useEffect }) => {
    const [dayFood, setDayFood] = useState([])

    useEffect(() => {
        const fetchRandomFood = async () => {
            const fetchedRandomFood = await getRandomFood()
            setDayFood(fetchedRandomFood)
        }
        fetchRandomFood()
    }, [])

    return (
        <article className={styles.imgBg_bg}>
            <div className={styles.imgBg_bg_overlay}></div>
            <div className={styles.imgBg_bg_content}>
                <h2>{dataFront.dayIngredient.title}</h2>
                {dayFood.map((dayFood) => (
                    <div key={dayFood.idMeal} className={styles.ingredientDayCard}>
                        <Image src={dayFood.strMealThumb} alt={dayFood.strMeal} width={300} height={200} className="img_responsive" />
                        <p>{dayFood.strMeal}</p>
                        <div className={styles.categories_flex_card_buttons}>
                            <MealDetails mealId={dayFood.idMeal} dataFront={dataFront} />
                            <FavoriteButton item={{ id: dayFood.idMeal, name: dayFood.strMeal, image: dayFood.strMealThumb }} />
                        </div>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default DayIngredient
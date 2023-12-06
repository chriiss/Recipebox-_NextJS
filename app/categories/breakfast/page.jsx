"use client"
import { useState, useEffect } from "react"
import { getMealList } from "@/app/api/api"
import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/page.module.scss"
import "../../styles/globals.scss"
import MealDetails from "@/app/components/mealDetails/mealDetails"
import dataFront from "../../data/dataFront"
import Navbar from "@/app/components/navbar/navbar"
import Footer from "@/app/components/footer/footer"
import FavoriteButton from "@/app/components/favoriteButton/favoriteButton"
import { FavoritesProvider } from "@/app/providers/favoriteProvider"

const Breakfast = () => {
    const [breakfast, setBreakfast] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMealList = async () => {
            const fetchedMealList = await getMealList("Breakfast")
            setBreakfast(fetchedMealList)
            setLoading(false)
        }
        fetchMealList()
    }, []);

    return (
        <>
            <header>
                <Navbar styles={styles} dataFront={dataFront} />
            </header>
            <main>
                {loading ? (
                    <div className={styles.loading}>
                        <div className={styles.loading_ball}></div>
                        <div className={styles.loading_ball}></div>
                        <div className={styles.loading_ball}></div>
                        <p>Loading ...</p>
                    </div>
                ) : (
                    <>
                        <section className={styles.herozone}>
                            <article className={styles.herozone_bgBreakfast}>
                                <div className={styles.herozone_bgBreakfast_overlay}></div>
                                <div className={styles.herozone_bgBreakfast_content}>
                                    <h1>{dataFront.category.breakfast}</h1>
                                </div>
                            </article>
                        </section>
                        <section className={styles.categories}>
                            <Link href="/categories" className="back">&larr; {dataFront.category.back}</Link>
                            <article className={styles.categories_flex}>
                                {breakfast.map((breakfast) => (
                                    <div key={breakfast.idMeal} className={styles.categories_flex_card}>
                                        <Image src={breakfast.strMealThumb} alt={breakfast.strMeal} width={300} height={200} className="img_responsive" />
                                        <p>{breakfast.strMeal}</p>
                                        <div className={styles.categories_flex_card_buttons}>
                                            <MealDetails mealId={breakfast.idMeal} dataFront={dataFront} />
                                            <FavoriteButton item={{ id: breakfast.idMeal, name: breakfast.strMeal, image: breakfast.strMealThumb }} />
                                        </div>
                                    </div>
                                ))}
                            </article>
                        </section>
                    </>
                )}
            </main>
            <footer className={styles.footer}>
                <Footer dataFront={dataFront} />
            </footer>
        </>
    )
}

const BreakfastBis = () => {
    return (
        <FavoritesProvider>
            <Breakfast />
        </FavoritesProvider>
    )
}

export default BreakfastBis
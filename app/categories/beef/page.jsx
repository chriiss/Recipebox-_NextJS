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

const Beef = () => {
    const [beef, setBeef] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMealList = async () => {
            const fetchedMealList = await getMealList("Beef")
            setBeef(fetchedMealList)
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
                            <article className={styles.herozone_bgBeef}>
                                <div className={styles.herozone_bgBeef_overlay}></div>
                                <div className={styles.herozone_bgBeef_content}>
                                    <h1>{dataFront.category.beef}</h1>
                                </div>
                            </article>
                        </section>
                        <section className={styles.categories}>
                            <Link href="/categories" className="back">&larr; {dataFront.category.back}</Link>
                            <article className={styles.categories_flex}>
                                {beef.map((beef) => (
                                    <div key={beef.idMeal} className={styles.categories_flex_card}>
                                        <Image src={beef.strMealThumb} alt={beef.strMeal} width={300} height={200} className="img_responsive" />
                                        <p>{beef.strMeal}</p>
                                        <div className={styles.categories_flex_card_buttons}>
                                            <MealDetails mealId={beef.idMeal} dataFront={dataFront} />
                                            <FavoriteButton item={{ id: beef.idMeal, name: beef.strMeal, image: beef.strMealThumb }} />
                                        </div>
                                    </div>
                                ))}
                            </article>
                        </section>
                        <section>
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

const BeefBis = () => {
    return (
        <FavoritesProvider>
            <Beef />
        </FavoritesProvider>
    )
}
export default BeefBis
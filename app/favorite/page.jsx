"use client"
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import styles from "../styles/page.module.scss"
import dataFront from "../data/dataFront"
import Image from 'next/image';
import MealDetails from '../components/mealDetails/mealDetails';
import { FavoritesProvider } from '../providers/favoriteProvider';
import { useFavorites } from '../providers/favoriteProvider';
import { useState, useEffect } from 'react';


const Favorite = () => {
    const { favorites, setFavorites } = useFavorites();
    const [loading, setLoading] = useState(true)

    const removeFavorite = (item) => {
        setFavorites((prevFavorites) => {
            const removeFavorite = prevFavorites.filter((fav) => fav.id !== item)
            localStorage.setItem('favorites', JSON.stringify(removeFavorite));
            return removeFavorite;
        });
    };

    useEffect(() => {
        setLoading(false)
    }, [setLoading])

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
                            <article className={styles.herozone_bgFavorite}>
                                <div className={styles.herozone_bgFavorite_overlay}></div>
                                <div className={styles.herozone_bgFavorite_content}>
                                    <h1>{dataFront.favorite.title}</h1>
                                </div>
                            </article>
                        </section>
                        <section className={styles.categories}>
                            <article className={styles.categories_flex}>
                                {favorites && favorites.map((favorite) => (
                                    <div key={favorite.id} className={styles.categories_flex_card}>
                                        <Image src={favorite.image} alt={favorite.name} width={300} height={300} className="img_responsive" />
                                        {favorite.name}
                                        <div className={styles.categories_flex_card_buttons}>
                                            <MealDetails mealId={favorite.id} dataFront={dataFront} />
                                            <button className="buttons" onClick={() => removeFavorite(favorite.id)}>
                                                <Image src="/trash.svg" alt="trash" width={20} height={20} />
                                            </button>
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
    );
}

const FavoriteBis = () => {
    return (
        <FavoritesProvider>
            <Favorite />
        </FavoritesProvider>
    )
}

export default FavoriteBis;
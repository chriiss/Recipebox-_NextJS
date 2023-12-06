"use client"
import styles from '../styles/page.module.scss'
import "../styles/globals.scss"
import { useState, useEffect } from 'react'
import { getMealCategory } from '@/app/api/api'
import CategoryList from '../components/categoryList/categoryList'
import dataFront from "../data/dataFront"
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMealCategory = async () => {
            const fetchedMealCategory = await getMealCategory()
            setCategories(fetchedMealCategory)
            setLoading(false);
        }
        fetchMealCategory()
    }, [])

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
                            <article className={styles.herozone_bgCategories}>
                                <div className={styles.herozone_bgCategories_overlay}></div>
                                <div className={styles.herozone_bgCategories_content}>
                                    <h1>{dataFront.categoryList.title}</h1>
                                </div>
                            </article>
                        </section>
                        <section className={styles.categories}>
                            <CategoryList categories={categories} styles={styles} dataFront={dataFront} />
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

export default Categories;
"use client"
import styles from './styles/page.module.scss'
import "./styles/globals.scss"
import { useState, useEffect } from 'react'
import { getSearchMealList, getMealCategory } from '@/app/api/api'
import SearchList from './components/searchList/searchList'
import HeroZone from './components/heroZone/heroZone'
import Link from 'next/link'
import DayIngredient from './components/dayIngredient/dayIngredient'
import dataFront from "./data/dataFront"
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import CategoryList from './components/categoryList/categoryList'
import { FavoritesProvider } from '@/app/providers/favoriteProvider';

const Home = () => {
  const [query, setQuery] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMealCategory = async () => {
      const fetchedMealCategory = await getMealCategory();
      setCategories(fetchedMealCategory);
      setLoading(false);
    };
    fetchMealCategory();
  }, []);

  useEffect(() => {
    const fetchSearchMealList = async () => {
      setLoading(true);
      const fetchedSearchMealList = await getSearchMealList(query);
      setSearchList(fetchedSearchMealList);
      setSearchPerformed(true);
      setLoading(false);
    };

    fetchSearchMealList();
  }, [query]);

  return (
    <FavoritesProvider>
      <>
        <header>
          <Navbar styles={styles} dataFront={dataFront} />
        </header>
        <main>
          {(loading && !query) ? (
            <div className={styles.loading}>
              <div className={styles.loading_ball}></div>
              <div className={styles.loading_ball}></div>
              <div className={styles.loading_ball}></div>
              <p>Loading ...</p>
            </div>
          ) : (
            <>
              <section className={styles.herozone}>
                <HeroZone styles={styles} query={query} setQuery={setQuery} dataFront={dataFront} />
              </section>
              <section className={styles.categories}>
                <h2>{dataFront.searchList.title}</h2>
                <SearchList
                  searchPerformed={searchPerformed}
                  searchList={searchList}
                  styles={styles}
                  dataFront={dataFront}
                />
                <Link href="/" className="homeButton">
                  {dataFront.searchList.searchHome}&nbsp;&rarr;
                </Link>
              </section>
              <section className={styles.categories}>
                <h2>{dataFront.categoryList.title}</h2>
                <CategoryList
                  categories={categories.slice(0, 5)}
                  styles={styles}
                  dataFront={dataFront}
                />
                <Link href="/categories" className="homeButton">
                  {dataFront.categoryList.categoriesHome}&nbsp;&rarr;
                </Link>
              </section>
              <section className={styles.imgBg}>
                <DayIngredient
                  styles={styles}
                  Link={Link}
                  useState={useState}
                  useEffect={useEffect}
                  dataFront={dataFront}
                />
              </section>
            </>
          )}
        </main>
        <footer className={styles.footer}>
          <Footer dataFront={dataFront} />
        </footer>
      </>
    </FavoritesProvider>
  );
};

export default Home;
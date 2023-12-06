export const getMealCategory = async () => {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php"
    const response = await fetch(url)
    const data = await response.json()
    return data.categories
}

export const getMealList = async (meal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
    const response = await fetch(url)
    const data = await response.json()
    return data.meals
}


export const getMealDetails = async (mealId) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    const data = await response.json()
    return data.meals[0]
}


export const getSearchMealList = async (searchMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`
    const response = await fetch(url)
    const data = await response.json()
    return data.meals
}

export const getRandomFood = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/random.php`
    const response = await fetch(url)
    const data = await response.json()
    return data.meals
}
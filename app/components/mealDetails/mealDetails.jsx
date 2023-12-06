import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMealDetails } from "@/app/api/api";
import styles from "../../styles/page.module.scss";
import "../../styles/globals.scss";
import YouTubePreview from "./youtubePreview/youtubePreview";


const MealDetails = ({ mealId, dataFront }) => {
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [speaking, setSpeaking] = useState(false);

    const fetchMealDetails = async () => {
        const mealDetails = await getMealDetails(mealId);
        setSelectedMeal(mealDetails);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        stopSpeaking();
        setDialogOpen(false);
    };

    const renderIngredients = (meal) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;
            const ingredient = meal[ingredientKey];
            const measure = meal[measureKey];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${measure ? `${measure} ` : ""}${ingredient}`);
            }
        }
        return ingredients;
    };

     const stopSpeaking = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setSpeaking(false);
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            stopSpeaking();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            stopSpeaking();
        };
    }, []);

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    return (
        <article>
            <button onClick={fetchMealDetails} className="buttons">{dataFront.details.button}</button>

            {isDialogOpen && selectedMeal && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.modal_content_close} onClick={closeDialog}>
                            &times;
                        </span>
                        <div className={styles.modal_content_elements}>
                            <div className={styles.modal_content_elements_flex}>
                                <h2>{selectedMeal.strMeal}</h2>
                                <button onClick={() => speak(`${selectedMeal.strMeal} ingredients are: ${renderIngredients(selectedMeal).join(", ")}. Preparation: ${selectedMeal.strInstructions}`)} className="buttons"><Image src="/voice.svg" alt="voice icon" width={30} height={30} /></button>
                            </div>
                            <div className={styles.modal_content_elements_flex}>
                                <Image src={dataFront.mealDetails.flag} alt={dataFront.mealDetails.flag} width={20} height={20} className={styles.icon} />
                                <p>{selectedMeal.strArea}</p> |
                                <Image src={dataFront.mealDetails.fork} alt={dataFront.mealDetails.fork} width={20} height={20} className={styles.icon} />
                                <Link href={`/categories/${encodeURIComponent(selectedMeal.strCategory.toLowerCase())}`} className={styles.modal_content_elements_flex_categoryDetail}>{selectedMeal.strCategory}</Link>
                            </div>
                            <Image src={selectedMeal.strMealThumb} alt={selectedMeal.strMealThumb} width={350} height={300} />


                            {selectedMeal.strIngredient1 ? (
                                <>
                                    <div className={styles.titleModal}>
                                        <h3>{dataFront.mealDetails.ingredients}</h3>
                                        <Image src={dataFront.mealDetails.ing} alt={dataFront.mealDetails.ing} width={30} height={30} className={styles.iconBis} />
                                    </div>
                                    <ul className={styles.list_ingredients}>
                                        {renderIngredients(selectedMeal).map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </>

                            ) : (
                                <h3>{dataFront.mealDetails.noIngredient}</h3>
                            )}
                        </div>
                        <div className={styles.instructions}>
                            <div className={styles.titleModal}>
                                <h3>{dataFront.mealDetails.preparation}</h3>
                                <Image src={dataFront.mealDetails.prep} alt={dataFront.mealDetails.prep} width={30} height={30} className={styles.iconBis} />
                            </div>
                            <p>{selectedMeal.strInstructions}</p>
                        </div>
                        {selectedMeal.strYoutube && (
                            <YouTubePreview
                                videoId={selectedMeal.strYoutube.split("v=")[1]}
                            />
                        )}
                    </div>
                </div>
            )}
        </article>
    );
};

export default MealDetails;

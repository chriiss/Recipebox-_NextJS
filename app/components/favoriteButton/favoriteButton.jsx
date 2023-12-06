import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useFavorites } from '@/app/providers/favoriteProvider';

import { useState } from 'react';

const FavoriteButton = ({ item }) => {
    const { favorites, setFavorites } = useFavorites();
    const router = useRouter();

    const isAlreadyAdded = favorites.some((fav) => fav.id === item.id);
    const [isFavorite, setIsFavorite] = useState(isAlreadyAdded);

    const toggleFavorite = () => {
        if (!isFavorite) {
            setFavorites((prevFavorites) => {
                const newFavorite = [...prevFavorites, item];
                localStorage.setItem('favorites', JSON.stringify(newFavorite));
                return newFavorite;
            });
        } else {
            setFavorites((prevFavorites) => {
                const updatedFavorites = prevFavorites.filter((fav) => fav.id !== item.id);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                return updatedFavorites;
            });
        }

        setIsFavorite(!isFavorite);
        router.push("/favorite", undefined, { shallow: true });
    };

    return (
        <article>
            <button className="buttons" onClick={toggleFavorite} disabled={isFavorite}>
                <Image src={isFavorite ? "/heartFull.svg" : "/heart.svg"} alt="heart" width={20} height={20} />
            </button>
        </article>
    );
};

export default FavoriteButton;

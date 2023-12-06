import Image from "next/image";
import Link from "next/link";
import "../../styles/globals.scss";

const CategoryList = ({ categories, styles, dataFront }) => {
  return(
    <article className={styles.categories_flex}>
        {categories.map((category) => (
          <div key={category.idCategory} className={styles.categories_flex_card}>
            <Image src={category.strCategoryThumb} alt={category.strCategory} width={322} height={200} className="img_responsive" />
            <p>{category.strCategory}</p>
            <Link href={`/categories/${encodeURIComponent(category.strCategory.toLowerCase())}`} className="buttons">{dataFront.details.button}</Link>
          </div>
        ))}
    </article>
  )

}

export default CategoryList;
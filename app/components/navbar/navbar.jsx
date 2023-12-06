import Image from "next/image"
import Link from "next/link"

const Navbar = ({ styles, dataFront }) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <Image src={dataFront.navbar.logo} alt={dataFront.navbar.logo} width={50} height={50} />
            </div>
            <ul className={styles.navbar_list}>
                {dataFront.navbar.list.map((data) => (
                    <li key={data.id}><Link href={data.link} className={styles.navbarLink}>{data.name}</Link></li>
                ))
                }
            </ul>
        </nav>
    )
}

export default Navbar;
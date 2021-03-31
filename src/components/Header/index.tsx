import styles from './styles.module.scss'
import Link from "next/link";
import { useRouter } from "next/router";


export function Header() {

    const router = useRouter();

    console.log(router.pathname)


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <ul>
                    <li className={router.pathname == "/" ? "active" : ""}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={router.pathname == "/xbox" ? "active" : ""}>
                        <Link href="/xbox">Xbox</Link>
                    </li>
                    <li className={router.pathname == "/playstation" ? "active" : ""}>
                        <Link href="/playstation">Playstation</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
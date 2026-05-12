// local
import styles from "./pagesContainer.module.css"
import NavBar from "../components/nav-Bar/navBar"
import Footer from "../components/footer/footer"

// component
export default function PagesContainer({ children }) {
    return (
        <div className={styles.layout}>
            <NavBar />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}
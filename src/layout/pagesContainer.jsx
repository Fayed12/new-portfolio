// local
import styles from "./pagesContainer.module.css"

// component
export default function PagesContainer({ children }) {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}
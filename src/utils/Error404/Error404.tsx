import styles from './error.module.css'
import errorPage from "./../../assets/images/errorPage.jpg";

export const Error404 = () => {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={errorPage} alt="not_found_404"/>
            </div>
        </div>
    )
}
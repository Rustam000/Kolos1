import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'; 

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.textMain}>
                <div className={styles.main}>
                    <span className={styles.upsText}>Упс...!</span>
                    <h1 className={styles.errorText}>Ошибка 404</h1>
                </div>
                <p className={styles.description}>
                    Эта страница не найдена, мы уже работаем, чтобы ее восстановить!
                </p>
            </div>
            <Link to="/" className={styles.buttonLink}>
                <div className={styles.buttonError}>
                    Вернуться на главную
                </div>
            </Link>
        </div>
    );
}
